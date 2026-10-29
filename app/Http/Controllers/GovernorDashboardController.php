<?php

namespace App\Http\Controllers;

use App\Models\Governor;
use Inertia\Inertia;

class GovernorDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total' => Governor::count(),

            'governor_1a' => Governor::where('pabrik', '1A')->count(),

            'governor_1b' => Governor::where('pabrik', '1B')->count(),
        ];

        return Inertia::render(
            'Instrument/Governor/GovernorDashboard',
            [
                'stats' => $stats,
            ]
        );
    }
}
