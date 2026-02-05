<?php

use App\Http\Controllers\PisoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ZereginakController;
use App\Http\Controllers\GastoController;
use App\Http\Controllers\DashboadController;
use Illuminate\Support\Facades\Log;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboadController::class, 'index'])->name('dashboard');
    Route::post('/pisua/{id}/aukeratu', [PisoController::class, 'selectPisua'])->name('pisua.select');

    Route::get('/pisua/aukeratu', [PisoController::class, 'showSelection'])->name('pisua.selection');
    Route::post('/pisua/batu', [PisoController::class, 'join'])->name('pisua.join');
    Route::get('/pisua/sortu', [PisoController::class, 'create'])->name('pisua.create');
    Route::post('/pisua', [PisoController::class, 'store'])->name('pisua.store');
    Route::get('/pisua/erakutsi', [PisoController::class, 'index'])->name('pisua.show');
    Route::get('/pisua/{pisua}/edit', [PisoController::class, 'edit'])->name('pisua.edit');
    Route::put('/pisua/{pisua}', [PisoController::class, 'update'])->name('pisua.update');
    Route::delete('/pisua/{pisua}', [PisoController::class, 'destroy'])->name('pisua.destroy');

    Route::get('/pisua/kideak', [PisoController::class, 'showMembers'])->name('pisua.kideak');

    Route::put('/pisua/{pisuaId}/kidea/{memberId}/promote', [PisoController::class, 'promoteMember']);
    Route::delete('/pisua/{pisuaId}/kidea/{memberId}/remove', [PisoController::class, 'removeMember']);
    Route::delete('/pisua/{pisua}/atera', [PisoController::class, 'atera'])->name('pisua.atera');


    Route::get('/zereginak', [ZereginakController::class, 'index'])
        ->name('zereginak.index');

    Route::get('/zereginak/sortu', [ZereginakController::class, 'create'])
        ->name('zereginak.create');

    Route::post('/zereginak', [ZereginakController::class, 'store'])
        ->name('zereginak.store');

    Route::get('/zereginak/{zeregina}/editatu', [ZereginakController::class, 'edit'])
        ->name('zereginak.edit');

    Route::put('/zereginak/{zeregina}', [ZereginakController::class, 'update'])
        ->name('zereginak.update');

    Route::delete('/zereginak/{zeregina}', [ZereginakController::class, 'destroy'])
        ->name('zereginak.destroy');

    //Gastos rutas
    Route::get('/gastuak', [GastoController::class, 'index']);
    Route::get('/gastuak/ikusi', [GastoController::class, 'gastuakGehituCargar']);
    Route::post('/gastuak/addGastua', [GastoController::class, 'addGasto'])->name('gastuak.gehitu');
    Route::get('/gastos/{idPisua}/{idErabiltzailea}', [GastoController::class, 'index'])->name('gastuak.ikusi');

    Route::delete('/gastos/deleteGasto/{id}', [GastoController::class, 'eliminarGasto'])->name('gastuak.kendu');
    Route::get('/gastuak/{idGasto}/edit', [GastoController::class, 'cargarPaginaEditar'])->name('gastuak.cargaEdit');
    Route::put('/gastuak/editar/{id}', [GastoController::class, 'editGasto'])->name('gastuak.editar');
    Route::post('/pagos/saldar', [GastoController::class, 'saldarDeuda'])->name('pagos.saldar');
});

require __DIR__ . '/settings.php';
