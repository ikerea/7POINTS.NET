<?php

namespace App\Http\Controllers;

use App\Jobs\SyncDeleteGastoFromOdoo;
use App\Jobs\SyncGastoToOdoo;
use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Models\Piso;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\PisoController;

class GastoController extends Controller {

public function index(Request $request) {
    $pisuaId = session('pisua_id');

    if (!$pisuaId) {
        return redirect()->route('pisua.show');
    }

    $fechaFiltro = $request->input('fecha'); // Ejemplo: "2025-01"

    $piso = Piso::with([
        'inquilinos',
        'gastos' => function ($query) use ($fechaFiltro) {
            // 1. Ordenar siempre (primero lo más reciente)
            $query->orderBy('Fecha', 'desc');

            // 2. Filtrar solo si hay fecha
            if ($fechaFiltro) {
                // Intentamos separar Año y Mes (formato YYYY-MM)
                $partes = explode('-', $fechaFiltro);

                if (count($partes) === 2) {
                    // Si viene "2026-02", filtramos por año y mes
                    $query->whereYear('Fecha', $partes[0])
                          ->whereMonth('Fecha', $partes[1]);
                } else {
                    // Por si acaso viene una fecha completa "2026-02-15", usamos whereDate
                    $query->whereDate('Fecha', $fechaFiltro);
                }
            }
        },
        'gastos.usuario'
    ])->find($pisuaId);

    return Inertia::render('Gastuak/GastuakPage', [
        'piso' => $piso,
        'filters' => [
            'fecha' => $fechaFiltro
        ]
    ]);
}

    public function addGasto(Request $request){

        $datosProcesados = $request->validate([
        'Nombre' => 'required|string|max:255',
        'Cantidad' => 'required|numeric|min:0',
        'Fecha'  => 'required|date',
        'IdUsuario' => 'required|numeric',
        ]);

        $pisuaId = session('pisua_id');
        $datosProcesados['IdPiso'] = $pisuaId;

        //Guardamos el gasto creado en el local
        $gasto = Gasto::create($datosProcesados);

        SyncGastoToOdoo::dispatch($gasto);

        return redirect('/gastuak');
    }

    public function editGasto(Request $request, $id) {

        $gasto = Gasto::where('IdGasto', $id)->firstOrFail();

        $datosProcesados = $request->validate([
        'Nombre' => 'required|string|max:255',
        'Cantidad' => 'required|numeric|min:0',
        'Fecha'  => 'required|date',
        'IdUsuario' => 'required|exists:users,id',
        ]);

        $pisuaId = session('pisua_id');
        $datosProcesados['IdPiso'] = $pisuaId;

        $gasto->update($datosProcesados);
        //dd($gasto);
        //VOLVEMOS A EJECUTAR EL SyncGastosToOdoo para 
        SyncGastoToOdoo::dispatch($gasto);

        return redirect("/gastuak");
    }

    public function eliminarGasto($id) {

        $gasto = Gasto::where('IdGasto', $id)->firstOrFail();

        $odooId = $gasto->odoo_id;

        $gasto->delete();

        if($odooId){
            SyncDeleteGastoFromOdoo::dispatch((int) $odooId);
        }
        return redirect("/gastuak");
    }

    public function cargarPaginaEditar(int $gastoId) {

        $gasto = Gasto::findOrFail($gastoId);

        // 2. Cargar TODOS los usuarios para el desplegable
        // (Si tienes lógica de pisos, filtra por el piso, ej: User::where('piso_id', $pisoId)->get())
        $pisuaId = session('pisua_id');

        // Opción A: Buscar el piso y sacar sus inquilinos (Recomendada)
        // Asumimos que la relación en el modelo Piso se llama 'inquilinos' o 'users'
        $piso = Piso::with('inquilinos')->find($pisuaId);

        // Verificamos que el piso exista para evitar errores
        $usuariosDelPiso = $piso ? $piso->inquilinos : [];

        return Inertia::render('Gastuak/EditGastoForm', [
            'gasto' => $gasto,
            'usuarios' => $usuariosDelPiso, // <--- Aquí pasamos la lista completa
            'flash' => [
            'message' => session('message')
        ]
        ]);
    }

    public function gastuakGehituCargar() {

    $pisuaId = session('pisua_id');

    // Opción A: Buscar el piso y sacar sus inquilinos (Recomendada)
    // Asumimos que la relación en el modelo Piso se llama 'inquilinos' o 'users'
    $piso = Piso::with('inquilinos')->find($pisuaId);

    // Verificamos que el piso exista para evitar errores
    $usuariosDelPiso = $piso ? $piso->inquilinos : [];

    return Inertia::render('Gastuak/AddGastoForm', [
        'usuarios' => $usuariosDelPiso
    ]);
    }
}
