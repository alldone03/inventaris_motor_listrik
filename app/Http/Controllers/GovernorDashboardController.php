<?php

namespace App\Http\Controllers;

use App\Models\Governor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GovernorDashboardController extends Controller
{
    public function index()
    {
        $governors = Governor::all();
        return Inertia::render(
            'Instrument/Governor/GovernorDashboard',
            [
                'governors' => $governors,
            ]
        );
    }
}
