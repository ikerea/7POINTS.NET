<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Gasto;
use Inertia\Inertia;

class GastoController extends Controller {
    
    public function index(int $idPisua, int $idErabiltzailea) {

        $gastos = Gasto::with('usuario') 
                    ->where('IdPiso', $idPisua)
                    ->get();
        
        return Inertia::render('gastos', compact("gastos"));
    }

    public function addGasto(Request $request){

        $datosProcesados = $request->validate([
        'nombre' => 'required|string|max:255',    
        'dinero' => 'required|numeric|min:0',  
        'fecha'  => 'required|date',            
        'pagado' => 'boolean',                 
    ]);

    Gasto::create($datosProcesados);

    return redirect()->back();
    }

    public function editGasto(Request $request, Gasto $gasto) {

        $datosProcesados = $request->validate([
            'nombre' => 'required|string|max:255',    
            'dinero' => 'required|numeric|min:0',  
            'fecha'  => 'required|date',            
            'pagado' => 'boolean',                 
        ]);
        
        $gasto->update($datosProcesados);

        return redirect()->route('gastos.index')
        ->with('message', 'Gasto actualizado correctamente');
    }

    public function eliminarGasto(Gasto $gasto) {

        $gasto->delete();

        return redirect()->route('gastos.index');
    }


}
