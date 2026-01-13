<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Zereginak;
use App\Models\Piso;

class ZereginakController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Traemos todas las tareas y también la info del piso asociado (eager loading)
        // Usamos 'pisua' porque así llamaste a la relación en el modelo Zereginak
        $zereginak = Zereginak::with('pisua')->get();

        // Retornamos la vista (que crearemos ahora) pasándole los datos
        return Inertia::render('Zereginak/Index', [
            'zereginak' => $zereginak
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
{
        // 1. Buscamos todos los pisos para poder elegirlos en el formulario
        $pisuak = Piso::all();

        return Inertia::render('Zereginak/Create', [
            'pisuak' => $pisuak
        ]);
}

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validamos los datos que vienen del formulario
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskripzioa' => 'nullable|string', // Puede estar vacío
            'pisua_id' => 'required|exists:pisua,id', // Tiene que existir en la tabla 'pisua'
        ]);

        // 2. Creamos la tarea en la base de datos
        // Como tienes el $fillable bien puesto en el modelo, esto funciona directo
        Zereginak::create($validated);

        // 3. Redirigimos al listado principal
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
        // 1. Buscamos los pisos para el desplegable (Recuerda: PISO, no Pisua)
        $pisuak = Piso::all();

        // 2. Renderizamos la vista 'Edit' pasando la tarea a editar y los pisos
        return Inertia::render('Zereginak/Edit', [
            'zereginak' => $zeregina,
            'pisuak' => $pisuak
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Zereginak $zeregina)
    {
        // 1. Validamos (Igual que en store)
        $validated = $request->validate([
            'izena' => 'required|string|max:255',
            'deskripzioa' => 'nullable|string',
            'pisua_id' => 'required|exists:pisua,id',
        ]);

        // 2. Actualizamos la tarea existente
        $zeregina->update($validated);

        // 3. Volvemos al listado
        return redirect()->route('zereginak.index');
    }

    /**
     * Remove the specified resource from storage.
     */
   public function destroy(Zereginak $zeregina)
    {
        // 1. Borramos la tarea
        $zeregina->delete();

        // 2. Volvemos al listado (automáticamente se refrescará la tabla)
        return redirect()->route('zereginak.index');
    }
}
