<?php

use App\Http\Controllers\PisoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\GastoController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/pisua/sortu', [PisoController::class, 'create'])->name('pisua.create');
    Route::post('/pisua', [PisoController::class, 'store'])->name('pisua.store');
    Route::get('/pisua/erakutsi', [PisoController::class, 'index'])->name('pisua.show');
    Route::get('/pisua/{pisua}/edit', [PisoController::class, 'edit'])->name('pisua.edit');
    Route::put('/pisua/{pisua}', [PisoController::class, 'update'])->name('pisua.update');
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

});

Route::get('/gastuak', [GastoController::class, 'index']);
Route::get('/gastuak/ikusi', [GastoController::class, 'gastuakGehituCargar']);
Route::post('/gastuak/addGastua', [GastoController::class, 'addGasto'])->name('gastuak.gehitu');
Route::get('/gastos/{idPisua}/{idErabiltzailea}', [GastoController::class, 'index'])->name('gastuak.ikusi');
Route::delete('/gastos/deleteGasto/{id}', [GastoController::class, 'eliminarGasto'])->name('gastuak.kendu');
Route::get('/gastuak/{idGasto}/edit', [GastoController::class, 'cargarPaginaEditar'])->name('gastuak.cargaEdit');
Route::put('/gastuak/editar/{id}', [GastoController::class, 'editGasto'])->name('gastuak.editar');

require __DIR__ . '/settings.php';
