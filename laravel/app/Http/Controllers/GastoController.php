<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
use App\Models\Piso;
use Inertia\Inertia;
use App\Models\User;
use App\Http\Controllers\PisoController;

class GastoController extends Controller {
    
public function index() {
    $pisuaId = session('pisua_id');

    if (!$pisuaId) {
        return redirect()->route('pisua.show');
    }

    // Cargamos el piso con sus relaciones correctas
    $piso = Piso::with([
        'inquilinos',      // <--- AQUÍ estaba el error (antes ponía 'usuarios')
        'gastos.usuario'   // <--- Esto requiere que exista la función gastos() en el modelo Piso
    ])->find($pisuaId);
    
    // Solo pasamos 'piso', ya que dentro lleva los gastos y los inquilinos
    return Inertia::render('Gastuak/GastuakPage', [ 
        'piso' => $piso,
        // Inertia suele inyectar 'auth' automáticamente, no necesitas pasarlo manual si usas el Middleware por defecto
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
}
