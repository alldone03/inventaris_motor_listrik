<?php

use App\Http\Controllers\AlatBeratDashboardController;
use App\Http\Controllers\ApproverController;
use App\Http\Controllers\DashboardMainController;
use App\Http\Controllers\GovernorDashboardController;
use App\Http\Controllers\InstrumentDashboardController;
use App\Http\Controllers\ListrikDashboardController;
use App\Http\Controllers\MotorChecklistController;
use App\Http\Controllers\MotorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {

    // Dashboard
    Route::get('/dashboard', [DashboardMainController::class, 'index'])->name('dashboard');
    // route group /listrik
    Route::prefix('listrik')->middleware(['CheckAccess:VP|DeptHarListrikInstrumentAlatBerat,AVP|WLI,SPV|BengkelListrik,Staff|BengkelListrik,user|user'])->group(function () {
        Route::get('/dashboard', [ListrikDashboardController::class, 'index'])->name('listrik_dashboard');

        // Motor Nameplate Bulk Print
        Route::get('/motors/print-nameplates', [MotorController::class, 'printNameplates'])->name('motors.print-nameplates');

        // Motor CRUD
        Route::resource('motors', MotorController::class);

        // Motor Checklists
        Route::get('/motors/{motor}/checklists/create', [MotorChecklistController::class, 'create'])->name('motors.checklists.create');
        Route::post('/motors/{motor}/checklists', [MotorChecklistController::class, 'store'])->name('motors.checklists.store');
        Route::get('/checklists/{checklist}', [MotorChecklistController::class, 'show'])->name('checklists.show');
        Route::get('/checklists/{checklist}/edit', [MotorChecklistController::class, 'edit'])->name('checklists.edit');
        Route::put('/checklists/{checklist}', [MotorChecklistController::class, 'update'])->name('checklists.update');
        Route::delete('/checklists/{checklist}', [MotorChecklistController::class, 'destroy'])->name('checklists.destroy');
        // Approvers
        Route::resource('approvers', ApproverController::class)->except(['create', 'show', 'edit']);
    });
    // instrument

    // instrument
    Route::prefix('instrument')->middleware(['CheckAccess:VP|DeptHarListrikInstrumentAlatBerat,AVP|WLI,AVP|BengkelInstrumen,SPV|BengkelInstrumen,Staff|BengkelInstrumen,user|user'])->group(function () {
        Route::get('/dashboard', [InstrumentDashboardController::class, 'index'])
            ->name('instrument_dashboard');

        // Dashboard Governor
        Route::get('/governor', [GovernorDashboardController::class, 'index'])
            ->name('governor.dashboard');
    });

    Route::prefix('alat_berat')
        ->middleware([
            'CheckAccess:VP|DeptHarListrikInstrumentAlatBerat,AVP|BengkelListrik,AVP|WLI',
            'auth',
            'verified',
        ])
        ->group(function () {
            Route::get('/dashboard', [AlatBeratDashboardController::class, 'index'])
                ->name('alatberat_dashboard');
        });

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

});

require __DIR__.'/auth.php';
