<?php

namespace App\Http\Controllers;

use App\Models\AlatBerat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlatBeratController extends Controller
{
    public function index()
    {
        $alatBerat = AlatBerat::all();

        return Inertia::render(
            'AlatBerat/Index',
            [
                'alatBerat' => $alatBerat,
            ]
        );
    }
    public function create()
{
    return Inertia::render('AlatBerat/Create');
}
}