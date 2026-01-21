<?php

use App\Http\Controllers\PisoController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\ZereginakController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/pisua/aukeratu', [PisoController::class, 'showSelection'])->name('pisua.selection');
    Route::post('/pisua/batu', [PisoController::class, 'join'])->name('pisua.join');
    Route::get('/pisua/sortu', [PisoController::class, 'create'])->name('pisua.create');
    Route::post('/pisua', [PisoController::class, 'store'])->name('pisua.store');
    Route::get('/pisua/erakutsi', [PisoController::class, 'index'])->name('pisua.show');
    Route::get('/pisua/{pisua}/edit', [PisoController::class, 'edit'])->name('pisua.edit');
    Route::put('/pisua/{pisua}', [PisoController::class, 'update'])->name('pisua.update');
    Route::delete('/pisua/{pisua}', [PisoController::class, 'destroy'])->name('pisua.destroy');
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');


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

});

require __DIR__ . '/settings.php';
