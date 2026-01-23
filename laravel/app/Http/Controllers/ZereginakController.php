<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
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
        // 1. Recuperamos el ID del piso desde la sesión
        $pisuaId = session('pisua_id');

        // 2. Si no hay piso seleccionado, redirigimos a la lista de pisos
        if (!$pisuaId) {
            return redirect()->route('pisua.show');
        }

        // 3. Filtramos las tareas: SOLO las que tengan el pisua_id de la sesión
        $zereginak = Zereginak::where('pisua_id', $pisuaId)
            ->with(['erabiltzaileak']) // Ya no necesitamos cargar 'pisua' si no lo vas a mostrar en la tabla
            ->get();

        return Inertia::render('Zereginak/Index', [
            'zereginak' => $zereginak,
            'pisuaIzena' => session('pisua_izena') // Opcional: para ponerlo en el título
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // 1: Guardamos el ID en la variable $pisuaId
        $pisuaId = session('pisua_id');

        // 2. Verificamos si existe (usando la variable)
        if (!$pisuaId) {
            return redirect()->route('pisua.show');
        }

        // 3. Ahora ya podemos usar $pisuaId aquí sin errores
        $pisua = Piso::with('inquilinos')->findOrFail($pisuaId);

        return Inertia::render('Zereginak/Create', [
            'kideak' => $pisua->inquilinos
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $pisuaId = session('pisua_id');

        // Seguridad extra: si caducó la sesión
        if (!$pisuaId) {
             return redirect()->route('pisua.show');
        }

        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskripzioa' => 'nullable|string',
            'erabiltzailea_id' => 'required|exists:users,id',
            'hasiera_data' => 'required|date',
        ]);

        $zeregina = Zereginak::create([
            'izena' => $validated['izena'],
            'deskripzioa' => $validated['deskripzioa'],
            'pisua_id' => $pisuaId, // <--- Aquí inyectamos el ID de la sesión automáticamente
        ]);

        $zeregina->erabiltzaileak()->attach($validated['erabiltzailea_id'], [
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
    public function edit(Zereginak $zeregina)
    {
        // Opcional: Verificar que la tarea pertenece al piso actual para evitar que editen tareas de otros pisos por URL
        if ($zeregina->pisua_id != session('pisua_id')) {
             abort(403, 'Ez duzu baimenik zeregin hau editatzeko.');
        }

        $zeregina->load('erabiltzaileak');

        $pisuaId = session('pisua_id');
        $pisua = Piso::with('inquilinos')->findOrFail($pisuaId);

        // Tampoco enviamos 'pisuak' aquí, no se debe cambiar una tarea de piso
       return Inertia::render('Zereginak/Edit', [
            'zereginak' => $zeregina,
            'kideak' => $pisua->inquilinos
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
            'egoera' => 'required|in:egiteko,egiten,eginda',
            'hasiera_data' => 'required|date',
            'erabiltzailea_id' => 'required|exists:users,id',
        ]);

        // Actualizamos la tarea (Sin cambiar el pisua_id)
        $zeregina->update([
            'izena' => $request->izena,
            'deskripzioa' => $request->deskripzioa,
            'egoera' => $request->egoera,
        ]);

        $zeregina->erabiltzaileak()->sync([
            $request->erabiltzailea_id => ['hasiera_data' => $request->hasiera_data]
        ]);

        return redirect()->route('zereginak.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Zereginak $zeregina)
    {
        // Seguridad: verificar que pertenece al piso actual
        if ($zeregina->pisua_id != session('pisua_id')) {
             abort(403);
        }

        $zeregina->delete();
        return redirect()->route('zereginak.index');
    }
}
