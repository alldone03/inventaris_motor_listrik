<?php

namespace App\Http\Controllers;

use App\Models\AlatBerat;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AlatBeratDashboardController extends Controller
{
    public function index()
    {
        // Statistik alat berat
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

        $today = Carbon::today();

        // Mengambil seluruh data dan menghitung masa berlaku SILO
        $alatBerats = AlatBerat::all()->map(function ($alat) use ($today) {

            $tanggalMulai = $alat->tanggal_surat_keluar;
            $tanggalHabis = $alat->tanggal_habis_berlaku;

            // Jika tanggal belum lengkap
            if (! $tanggalMulai || ! $tanggalHabis) {
                $alat->silo_countdown = [
                    'configured' => false,
                    'remaining' => null,
                    'progress' => 0,
                    'status' => 'Belum Diatur',
                    'color' => 'gray',
                ];

                return $alat;
            }

            $mulai = Carbon::parse($tanggalMulai)->startOfDay();
            $habis = Carbon::parse($tanggalHabis)->startOfDay();

            // Menghitung total masa berlaku dan sisa hari
            $totalHari = $mulai->diffInDays($habis, false);
            $sisaHari = $today->diffInDays($habis, false);

            // Progress menunjukkan sisa masa berlaku
            $progress = $totalHari > 0
                ? round(($sisaHari / $totalHari) * 100)
                : 0;

            $progress = max(0, min(100, $progress));

            // Menentukan status dan warna otomatis
            if ($sisaHari <= 0) {
                $status = 'Kedaluwarsa';
                $color = 'red';
            } elseif ($sisaHari <= 30) {
                $status = 'Segera Habis';
                $color = 'red';
            } elseif ($sisaHari <= 90) {
                $status = 'Perlu Perhatian';
                $color = 'yellow';
            } else {
                $status = 'Aman';
                $color = 'green';
            }

            // Data countdown untuk React
            $alat->silo_countdown = [
                'configured' => true,
                'remaining' => $sisaHari,
                'progress' => $progress,
                'status' => $status,
                'color' => $color,
            ];

            return $alat;
        });

        return Inertia::render(
            'AlatBerat/AlatBeratDashboard',
            [
                'stats' => $stats,
                'alatBerats' => $alatBerats,
            ]
        );
    }
}
