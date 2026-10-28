<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class GovernorDashboardController extends Controller
{
    //
    public function index(){
        return Inertia::render('Instrument/Governor/GovernorDashboard');
    }
}
