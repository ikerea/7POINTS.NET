<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Zereginak;
use Illuminate\Support\Facades\Auth; // <--- Necesitas importar esto

class DashboadController extends Controller
{
    public function index()
    {
        // 1. Intentamos coger el ID de la sesión (Igual que en Zereginak)
        $pisuaId = session('pisua_id');

        // 2. RECUPERACIÓN INTELIGENTE (Esto es lo nuevo)
        // Si no hay sesión, miramos si el usuario tiene el piso guardado en su base de datos
        if (!$pisuaId && Auth::user()->pisua_id) {
            $pisuaId = Auth::user()->pisua_id;
            session(['pisua_id' => $pisuaId]); // Lo guardamos en sesión para que ZereginakController funcione luego
        }

        // 3. PROTECCIÓN (Igual que en ZereginakController)
        // Si después de intentarlo sigue sin haber ID, redirigimos a seleccionar piso
        if (!$pisuaId) {
            return redirect()->route('pisua.show');
        }

        // 4. Ahora seguro que tenemos ID, hacemos las consultas
        $zereginakEgiteko = Zereginak::where('pisua_id', $pisuaId)
            ->where('egoera', 'egiteko')
            ->with('erabiltzaileak')
            ->get();

        $zereginakEgiten = Zereginak::where('pisua_id', $pisuaId)
            ->where('egoera', 'egiten')
            ->with('erabiltzaileak')
            ->get();

        return Inertia::render('dashboard', [
            'zereginakEgiteko' => $zereginakEgiteko,
            'zereginakEgiten' => $zereginakEgiten
        ]);
    }
}

