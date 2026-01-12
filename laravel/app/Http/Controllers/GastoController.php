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
}
