<?php

namespace App\Http\Controllers;

use App\Jobs\SyncDeletePisoFrom;
use App\Jobs\SyncEditPisoToOdoo;
use App\Jobs\SyncInquilinoToOdoo;
use App\Jobs\SyncUserToOdoo;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Piso;
use App\Jobs\SyncPisoToOdoo;
use App\Services\OdooService;
use Illuminate\Support\Facades\Bus;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;

class PisoController extends Controller
{
    public function showSelection(Request $request)
    {
        $hasPisos = $request->user()->pisuak()->exists();
        return Inertia::render('pisua/aukeratu', [
            'hasPisos' => $hasPisos
        ]);
    }

    public function join(Request $request)
    {
        $validated = $request->validate([
            'kodigoa' => 'required|string|exists:pisua,kodigoa',
        ], [
            'kodigoa.exists' => 'Kode hori ez da existitzen. (El código no existe)',
        ]);

        $piso = Piso::where('kodigoa', $validated['kodigoa'])->first();

        //El 'syncWithoutDetaching' evita duplicados (si ya estaba, no lo mete dos veces)
        //Añadimos el usuario a ese piso
        $request->user()->pisuak()->syncWithoutDetaching([
            $piso->id => ['mota' => 'normala']
        ]);

        SyncInquilinoToOdoo::dispatch($request->user(), $piso);

        session(['pisua_id' => $piso->id]);
        session(['pisua_izena' => $piso->izena]);

        return redirect()->route('dashboard');
    }

   public function index()
    {
        // 1. Obtenemos los pisos del usuario actual
        $pisuak = auth()->user()->pisuak;

        // 2. Para cada piso, buscamos explícitamente quién tiene el rol de 'koordinatzailea'
        foreach ($pisuak as $piso) {
            $coordinador = $piso->inquilinos()
                                ->wherePivot('mota', 'koordinatzailea')
                                ->first();

            // Asignamos ese usuario a la propiedad 'user' que espera tu React
            $piso->user = $coordinador;
        }

        // 3. Enviamos los datos a la vista
        return Inertia::render('pisua/erakutsi', [
            'pisuak' => $pisuak
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pisua/sortu');
    }

    public function store(Request $request)
    {
        // 1. Quitamos la validación del codigo, porque ya no lo introduce el usuario
        $validate = $request->validate([
            'pisuaren_izena' => 'required|string|max:255',
        ]);

        $user = $request->user();

        $kodigoa = null;
        do {
            $posibleKodigoa = str_pad(rand(0, 99999), 5, '0', STR_PAD_LEFT);

            if (!Piso::where('kodigoa', $posibleKodigoa)->exists()) {
                $kodigoa = $posibleKodigoa;
            }
        } while (!$kodigoa);

        $pisua = Piso::create([
            'izena' => $validate['pisuaren_izena'],
            'kodigoa' => $kodigoa,
            'odoo_id' => null,
            'user_id' => $user->id,
        ]);

        $pisua->inquilinos()->attach($user->id, ['mota' => 'koordinatzailea']);

        Bus::chain([
            new SyncUserToOdoo($user),
            new SyncPisoToOdoo($pisua),
            new SyncInquilinoToOdoo($user, $pisua)
        ])->dispatch();

        session(['pisua_id' => $pisua->id]);
        session(['pisua_izena' => $pisua->izena]);

        return redirect()->route('dashboard');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(Piso $pisua)
    {
        Gate::authorize('update', $pisua);
        return Inertia::render('pisua/edit', compact('pisua'));
    }

    public function update(Request $request, Piso $pisua)
    {
        Gate::authorize('update', $pisua);
        $validate = $request->validate([
            'pisuaren_izena' => 'required|string|max:255',
            'pisuaren_kodigoa' => 'required|string|max:50',
        ]);

        $pisua->update([
            'izena' => $validate['pisuaren_izena'],
            'kodigoa' => $validate['pisuaren_kodigoa'],
            'synced' => false
        ]);

        SyncEditPisoToOdoo::dispatch($pisua);

        session(['pisua_id' => $pisua->id]);
        session(['pisua_izena' => $pisua->izena]);


      return redirect('/pisua/kideak');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Piso $pisua)
    {
        Gate::authorize('delete', $pisua);
        $odooId = $pisua->odoo_id;

        //Borramos el biso de SQLite
        $pisua->delete();

        //Si el piso estaba sincornizado con Odoo (Tiene ID), lanzamos el Job
        if ($odooId) {
            SyncDeletePisoFrom::dispatch((int) $odooId);
        }

        return redirect()->route('pisua.show');
    }

    public function selectPisua(Request $request, $id)
    {
        // 1. Buscar el piso
        $pisua = Piso::findOrFail($id);

        // Verificar que el usuario logueado pertenece realmente a ese piso.
        $pertenece = $request->user()->pisuak()->where('pisua.id', $id)->exists();

        if (!$pertenece) {
            return back()->withErrors(['message' => 'Ez zara pisu honetako kidea (No eres miembro de este piso).']);
        }

        // 3. Guardar en sesión
        session(['pisua_id' => $pisua->id]);
        session(['pisua_izena' => $pisua->izena]); // Guardamos el nombre por si quieres mostrarlo en el header

        // 4. Redirigir a la lista de tareas (Zereginak)
        return redirect()->route('zereginak.index');
    }

   public function showMembers()
    {
        // 1. Recuperar ID de sesión
        $pisuaId = session('pisua_id');

        // 2. Si no hay piso seleccionado, mandar a seleccionar uno
        if (!$pisuaId) {
            return redirect()->route('pisua.show');
        }

        // 3. Buscar el piso y cargar la relación 'inquilinos'
        $pisua = Piso::with('inquilinos')->findOrFail($pisuaId);

        // --- ALDAKETA HEMEN ---
        // Bilatu uneko erabiltzailea inquilinos zerrendan eta ikusi bere 'mota'
        $currentUser = $pisua->inquilinos->find(auth()->id());
        $isCurrentUserAdmin = $currentUser && $currentUser->pivot->mota === 'koordinatzailea';

        return Inertia::render('pisuaIkusi/pisua_ikusi', [
            'pisua' => $pisua,
            'kideak' => $pisua->inquilinos,
            'isCurrentUserAdmin' => $isCurrentUserAdmin, // <--- HAU GEHITU DUGU
        ]);
    }

    public function promoteMember(Request $request, $pisuaId, $memberId)
    {
        $pisua = Piso::findOrFail($pisuaId);

        // SEGURIDAD: Solo el coordinador actual puede nombrar a otro coordinador.
        // Usamos la misma policy 'update' que creamos antes, ya que verifica si es coordinador.
        Gate::authorize('update', $pisua);

        return DB::transaction(function () use ($request, $pisua, $memberId) {
            $currentUserId = $request->user()->id;

            // 1. Quitar rol al actual
            $pisua->inquilinos()->updateExistingPivot($currentUserId, ['mota' => 'normala']);

            // 2. Dar rol al nuevo
            $pisua->inquilinos()->updateExistingPivot($memberId, ['mota' => 'koordinatzailea']);

            return back();
        });
    }

    public function removeMember($pisuaId, $memberId)
    {
        $pisua = Piso::findOrFail($pisuaId);

        if ($memberId != auth()->id()) {
        Gate::authorize('update', $pisua);
    }

        // Quitamos la relación (detach)
        $pisua->inquilinos()->detach($memberId);

        if ($memberId == auth()->id() && session('pisua_id') == $pisuaId) {
            session()->forget('pisua_id');
            session()->forget('pisua_izena');
            return redirect()->route('dashboard'); // Redirigir fuera porque ya no tienes acceso
        }

        return back();


    }

    public function atera(Piso $pisua)
    {
        $user = auth()->user();

        // 1. Obtener los datos del usuario en este piso (para ver si es coordinador)
        $miembro = $pisua->inquilinos()->where('users.id', $user->id)->first();

        if (!$miembro) {
            abort(403, 'Ez zara pisu honetako kidea.');
        }

        // Guardamos si era el jefe antes de borrarlo
        $eraCoordinador = $miembro->pivot->mota === 'koordinatzailea';

        // 2. Sacar al usuario del piso (Detach)
        $pisua->inquilinos()->detach($user->id);

        // 3. Si el que se ha ido era Coordinador, nombrar al heredero
        if ($eraCoordinador) {
            // Buscamos el inquilino más antiguo que quede (el pivot created_at más viejo)
            $nuevoJefe = $pisua->inquilinos()
                             ->wherePivotNotNull('created_at') // Por seguridad
                             ->orderByPivot('created_at', 'asc') // Ascendente = el más antiguo primero
                             ->first();

            // Si queda alguien en el piso, lo ascendemos
            if ($nuevoJefe) {
                $pisua->inquilinos()->updateExistingPivot($nuevoJefe->id, ['mota' => 'koordinatzailea']);
            }
        }

        if (session('pisua_id') == $pisua->id) {
            session()->forget('pisua_id');
            session()->forget('pisua_izena');
        }

        return redirect()->route('dashboard')->with('message', 'Pisutik ondo atera zara.');
    }


}
