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
    public function index(Request $request)
    {
        $pisuak = $request->user()->pisuak()->with('user')->get();

        return Inertia::render('pisua/erakutsi', ['pisuak' => $pisuak]);
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
        return Inertia::render('pisua/edit', compact('pisua'));
    }

    public function update(Request $request, Piso $pisua)
    {
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

        return redirect()->route('pisua.show');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Piso $pisua)
    {
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
}
