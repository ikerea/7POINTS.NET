<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Zereginak;

class DashboadController extends Controller
{
    public function index()
    {
        $pisuaId = session('pisua_id');
        $zereginakEgiteko = [];
        $zereginakEgiten = [];


        if($pisuaId) {
            $zereginakEgiteko = Zereginak::where('pisua_id', $pisuaId)
                ->where('egoera', 'egiteko')
                ->with('erabiltzaileak') //Importante para ver quién hace la tarea
                ->get();


            $zereginakEgiten = Zereginak::where('pisua_id', $pisuaId)
                ->where('egoera', 'egiten')
                ->with('erabiltzaileak')
                ->get();
        }

        //3. Enviamos los datos a la vista
        return Inertia::render('dashboard', [
            'zereginakEgiteko' => $zereginakEgiteko,
            'zereginakEgiten' => $zereginakEgiten
        ]);
    }
}
