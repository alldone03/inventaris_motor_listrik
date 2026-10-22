<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Inertia\Inertia;

class DashboardFrontController extends Controller
{
    public function index()
    {
        $motor = Motor::all();
        // dd($motor);

        return Inertia::render('Dashboard_Front', [
            'motor' => $motor,
            'nama' => 'Safania Putri ',  // ini nanti kasih variabel dari database
        ]);
    }
}
