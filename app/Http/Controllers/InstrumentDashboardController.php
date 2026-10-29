<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class InstrumentDashboardController extends Controller
{
    //
    public function index(){
        return Inertia::render('Instrument/InstrumentDashboard');
    }
}
