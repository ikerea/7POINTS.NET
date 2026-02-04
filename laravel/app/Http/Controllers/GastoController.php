<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Models\Piso;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Ordainketa;
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

            // --- CORRECCIÓN DEL FILTRO ---
            if ($fechaFiltro) {
                // Separamos "2025-01" en Año y Mes
                $partes = explode('-', $fechaFiltro);

                if (count($partes) === 2) {
                    $year = $partes[0];
                    $month = $partes[1];

                    // Usamos whereYear y whereMonth
                    // IMPORTANTE: Asegúrate de que tu columna en la base de datos se llama 'Fecha'.
                    // Si usas la fecha de creación automática, cambia 'Fecha' por 'created_at'
                    $query->whereYear('Fecha', $year)
                          ->whereMonth('Fecha', $month);
                }
            }

            // Ordenar
            $query->orderBy('Fecha', 'desc');
        },
        'gastos.usuario',
        'ordainketak'
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


        Gasto::create($datosProcesados);

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


    public function saldarDeuda(Request $request) {
        // 1. Validamos que los datos sean correctos
        $validated = $request->validate([
            'deudor_id' => 'required|exists:users,id',
            'acreedor_id' => 'required|exists:users,id',
            'cantidad' => 'required|numeric|min:0.01',
        ]);

        // 2. Guardamos el pago en la base de datos
        Ordainketa::create([
            'piso_id' => session('pisua_id'), // Usamos el piso de la sesión
            'deudor_id' => $validated['deudor_id'],
            'acreedor_id' => $validated['acreedor_id'],
            'cantidad' => $validated['cantidad'],
        ]);

        // 3. Volvemos atrás para que se actualice la página
        return redirect()->back();
    }
}

