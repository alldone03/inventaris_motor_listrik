<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use App\Models\MotorChecklist;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $totalMotors = Motor::count();
        $totalChecklists = MotorChecklist::count();
        $selesaiChecklists = MotorChecklist::where('status_perbaikan', 'Selesai')->count();
        $prosesChecklists = MotorChecklist::where('status_perbaikan', '!=', 'Selesai')->count();

        $recentChecklists = MotorChecklist::with('motor')
            ->latest()
            ->take(5)
            ->get();

        $recentMotors = Motor::withCount('checklists')
            ->latest()
            ->take(5)
            ->get();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalMotors' => $totalMotors,
                'totalChecklists' => $totalChecklists,
                'selesaiChecklists' => $selesaiChecklists,
                'prosesChecklists' => $prosesChecklists,
            ],
            'recentChecklists' => $recentChecklists,
            'recentMotors' => $recentMotors,
        ]);
    }
}
