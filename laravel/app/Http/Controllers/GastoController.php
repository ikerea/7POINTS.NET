<?php

namespace App\Http\Controllers;

use App\Jobs\SyncGastoToOdoo;
use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Models\Piso;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\PisoController;

class GastoController extends Controller {

public function index(Request $request) { // <--- Inyectamos Request
    $pisuaId = session('pisua_id');

    if (!$pisuaId) {
        return redirect()->route('pisua.show');
    }

    // Recogemos la fecha del filtro (si existe)
    $fechaFiltro = $request->input('fecha');

    // Cargamos el piso y filtramos la relación 'gastos' si hay fecha
    $piso = Piso::with([
        'inquilinos',
        'gastos' => function ($query) use ($fechaFiltro) {
            // Si hay fecha, filtramos por el campo 'Fecha'
            if ($fechaFiltro) {
                $query->whereDate('Fecha', $fechaFiltro);
            }
            // Opcional: Ordenar por fecha descendente
            $query->orderBy('Fecha', 'desc');
        },
        'gastos.usuario'
    ])->find($pisuaId);

    return Inertia::render('Gastuak/GastuakPage', [
        'piso' => $piso,
        // Pasamos el filtro actual a la vista para que el calendario no se resetee
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
        return redirect("/gastuak");
    }

    public function eliminarGasto($id) {

        $gasto = Gasto::where('IdGasto', $id)->firstOrFail();
        $gasto->delete();
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
