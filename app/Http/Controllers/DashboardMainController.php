<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Inertia\Inertia;

class DashboardMainController extends Controller
{
    public function index()
    {
        
        return Inertia::render('DashboardMain');
    }
}
