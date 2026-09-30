<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MotorChecklistController;
use App\Http\Controllers\MotorController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Motor CRUD
    Route::resource('motors', MotorController::class);

    // Motor Checklists
    Route::get('/motors/{motor}/checklists/create', [MotorChecklistController::class, 'create'])->name('motors.checklists.create');
    Route::post('/motors/{motor}/checklists', [MotorChecklistController::class, 'store'])->name('motors.checklists.store');
    Route::get('/checklists/{checklist}', [MotorChecklistController::class, 'show'])->name('checklists.show');
    Route::get('/checklists/{checklist}/edit', [MotorChecklistController::class, 'edit'])->name('checklists.edit');
    Route::put('/checklists/{checklist}', [MotorChecklistController::class, 'update'])->name('checklists.update');
    Route::delete('/checklists/{checklist}', [MotorChecklistController::class, 'destroy'])->name('checklists.destroy');

    // Profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
