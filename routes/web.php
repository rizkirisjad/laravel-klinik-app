<?php

use App\Http\Controllers\DiagnosaController;
use App\Http\Controllers\PasienController;
use App\Http\Controllers\RekamMedisController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('auth/login', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::prefix('data-pasien')->controller(PasienController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
        Route::get('/{pasien_id}/show', 'show');
        Route::put('/{pasien_id}', 'update');
        Route::delete('/{pasien_id}', 'destroy');
        Route::get('/get-json', 'getDataPasienJson');
        Route::get('/{pasien_id}/rekam-medis', 'getRekamMedis');
    });

    Route::prefix('diagnosa')->controller(DiagnosaController::class)->group(function () {
        Route::get('/', 'index');
        Route::post('/', 'store');
    });

    Route::prefix('rekam-medis')->controller(RekamMedisController::class)->group(function() {
        Route::get('/', 'index');
    });
});

require __DIR__.'/settings.php';
