<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
use Inertia\Inertia;
use App\Models\User;

class GastoController extends Controller {
    
    public function index() {

        //$gastos = Gasto::with('usuario')->where('IdPiso', 1)->get(); // Ejemplo simplificado
    
        // IMPORTANTE: El nombre 'gastos' aquí debe coincidir con el de React
        //return Inertia::render('Gastuak/GastuakPage', [
        //    'gastos' => $gastos 
        //]);
        // 1. Obtienes los datos de la BD
        $gastos = Gasto::all(); 
        
        // 2. Renderizas la vista y LE PASAS los datos
            return Inertia::render('Gastuak/GastuakPage', [ 
                'gastos' => $gastos 
            ]);
    }

    public function addGasto(Request $request){

        $datosProcesados = $request->validate([
        'Nombre' => 'required|string|max:255',    
        'Cantidad' => 'required|numeric|min:0',  
        'Fecha'  => 'required|date',            
        'IdUsuario' => 'required|numeric',                 
        ]);

        $datosProcesados['IdPiso'] = 1;

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

        $datosProcesados['IdPiso'] = 1;
        
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
        $usuarios = User::all(); 

        return Inertia::render('Gastuak/EditGastoForm', [
            'gasto' => $gasto,
            'usuarios' => $usuarios, // <--- Aquí pasamos la lista completa
            'flash' => [
            'message' => session('message')
        ]
        ]);
    }

    public function gastuakGehituCargar() {

        $todosLosUsuarios = User::all();
        return Inertia::render('Gastuak/AddGastoForm', [
            'usuarios' => $todosLosUsuarios // Pasamos los usuarios como prop
        ]);
    }
}
