<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
// IMPORTANTE: Usamos el nombre exacto de tu modelo (Plural según tus imports)
use App\Models\Zereginak;
use App\Models\Piso;
use Illuminate\Support\Facades\Auth;

class ZereginakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $zereginak = Zereginak::with(['pisua', 'erabiltzaileak'])->get();

        return Inertia::render('Zereginak/Index', [
            'zereginak' => $zereginak
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $pisuak = Piso::all();

        return Inertia::render('Zereginak/Create', [
            'pisuak' => $pisuak // Ojo: lo enviamos como 'pisuak' para ser coherentes con el frontend
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskripzioa' => 'nullable|string',
            'pisua_id' => 'required|exists:pisua,id', // Tabla 'pisua' correcta
            'hasiera_data' => 'required|date',
        ]);

        $zeregina = Zereginak::create([
            'izena' => $validated['izena'],
            'deskripzioa' => $validated['deskripzioa'],
            'pisua_id' => $validated['pisua_id'],
        ]);

        $zeregina->erabiltzaileak()->attach(Auth::id(), [
            'hasiera_data' => $validated['hasiera_data']
        ]);

        return redirect()->route('zereginak.index');
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
    // AQUÍ ESTABA EL ERROR: Asegúrate de usar 'Zereginak' (el modelo importado)
    public function edit(Zereginak $zeregina)
    {
        // Cargamos la relación para que no falle el frontend al buscar la fecha
        $zeregina->load('erabiltzaileak');

        $pisuak = Piso::all();

        return Inertia::render('Zereginak/Edit', [
            'zereginak' => $zeregina,
            'pisuak' => $pisuak // Lo enviamos como 'pisuak' (plural) al frontend
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zereginak $zeregina)
    {
        // Validamos
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskripzioa' => 'nullable|string',
            // CORRECCIÓN IMPORTANTE: Cambiado 'pisuak' por 'pisua' para coincidir con tu tabla
            'pisua_id' => 'required|exists:pisua,id',
            'egoera' => 'required|in:egiteko,egiten,eginda',
            'hasiera_data' => 'required|date',
        ]);

        // Actualizamos la tarea
        $zeregina->update([
            'izena' => $request->izena,
            'deskripzioa' => $request->deskripzioa,
            'pisua_id' => $request->pisua_id,
            'egoera' => $request->egoera,
        ]);

        // Actualizamos la fecha en la tabla pivote
        $zeregina->erabiltzaileak()->sync([
            auth()->id() => ['hasiera_data' => $request->hasiera_data]
        ]);

        return redirect()->route('zereginak.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zereginak $zeregina)
    {
        $zeregina->delete();
        return redirect()->route('zereginak.index');
    }
}
