<?php

namespace App\Http\Controllers;

use App\Models\AlatBerat;
use Inertia\Inertia;

class AlatBeratDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total' => AlatBerat::count(),

            'siap_operasi' => AlatBerat::where(
                'status', 'Siap Operasi'
            )->count(),

            'dalam_perbaikan' => AlatBerat::where(
                'status', 'Dalam Perbaikan'
            )->count(),

            'rusak' => AlatBerat::where(
                'status', 'Rusak'
            )->count(),
        ];

        return Inertia::render(
            'AlatBerat/AlatBeratDashboard',
            [
                'stats' => $stats,
                // Mengambil seluruh data alat berat dari database
                'alatBerats' => AlatBerat::all(),
            ]
        );
    }
}
