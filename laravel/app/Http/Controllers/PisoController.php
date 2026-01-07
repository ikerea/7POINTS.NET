<?php

namespace App\Http\Controllers;

use App\Jobs\SyncEditPisoToOdoo;
use Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Piso;
use App\Jobs\SyncPisoToOdoo;
use App\Services\OdooService;
class PisoController extends Controller
{
    public function index(OdooService $odoo)
    {
        $pisuak = $odoo->search('pisua', zutabe: ['name', 'code']);
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

        $pisua = Piso::create([
            'izena' => $validate['pisuaren_izena'],
            'kodigoa' => $validate['pisuaren_kodigoa'],
            'odoo_id' => null,
            'user_id' => Auth::id(), //RECORDEMOS este Auth busca la sesion que esta autentificada 
        ]);

        SyncPisoToOdoo::dispatch($pisua);


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
    public function update(Request $request, Piso $piso)
    {
        $validate = $request->validate([
            'pisuaren_izena' => 'required|string|max:255',
            'pisuaren_kodigoa' => 'required|string|max:50',
        ]);

        $piso->update([
            'izena' => $validate['pisuaren_izena'],
            'kodigoa' => $validate['pisuaren_kodigoa'],
            'synced' => false
        ]);

        SyncEditPisoToOdoo::dispatch($piso);

        return redirect()->route('pisua.show');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
