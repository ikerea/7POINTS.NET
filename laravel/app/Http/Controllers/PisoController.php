<?php

namespace App\Http\Controllers;

use App\Jobs\SyncDeletePisoFrom;
use App\Jobs\SyncEditPisoToOdoo;
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
    public function showSelection()
    {
        return Inertia::render('pisua/aukeratu');
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

        return redirect()->route('dashboard');
    }
    public function index()
    {
        $pisuak = Piso::with('user')->get();

        return Inertia::render('pisua/erakutsi', ['pisuak' => $pisuak]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('pisua/sortu');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate = $request->validate([
            'pisuaren_izena' => 'required|string|max:255',
            'pisuaren_kodigoa' => 'required|string|max:50',
        ]);

        $user = $request->user();

        $pisua = Piso::create([
            'izena' => $validate['pisuaren_izena'],
            'kodigoa' => $validate['pisuaren_kodigoa'],
            'odoo_id' => null,
            'user_id' => $user->id, //RECORDEMOS este Auth busca la sesion que esta autentificada
        ]);

        $pisua->inquilinos()->attach($user->id, ['mota' => 'koordinatzailea']);

        //ESTO COMPROBARA SI EL USUARIO YA ES COORDINADOR EN LA BD Y SI NO LO CREARA
        //Usamos bus chain para que primero mande el usuario a odoo y luego el piso
        Bus::chain([
            new SyncUserToOdoo($user),
            new SyncPisoToOdoo($pisua),
        ])->dispatch();

        return redirect()->route('pisua.show');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Piso $pisua)
    {
        return Inertia::render('pisua/edit', compact('pisua'));
    }

    /**
     * Update the specified resource in storage.
     */
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
}
