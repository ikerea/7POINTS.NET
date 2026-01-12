<?php

use App\Http\Controllers\PisoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

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

Route::get('/gastos/{idPisua}/{idErabiltzailea}', [GastoController::class, 'index'])->name('gastuak.ikusi');

require __DIR__ . '/settings.php';
