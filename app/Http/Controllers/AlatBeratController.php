<?php

namespace App\Http\Controllers;

use App\Models\AlatBerat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AlatBeratController extends Controller
{
    public function index(Request $request)
    {
        // Mengambil parameter dari URL (query string)
        $search = $request->input('search');
        $status = $request->input('status');

        // Membuat query Eloquent dengan filter dinamis
        $alatBerat = AlatBerat::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama_alat', 'like', "%{$search}%")
                      ->orWhere('merk', 'like', "%{$search}%")
                      ->orWhere('model', 'like', "%{$search}%")
                      ->orWhere('nomor_unit', 'like', "%{$search}%");
                });
            })
            ->when($status && $status !== 'Semua Status', function ($query, $status) {
                // Filter berdasarkan kolom status
                $query->where('status', $status);
            })
            ->get();

        return Inertia::render(
            'AlatBerat/Index',
            [
                'alatBerat' => $alatBerat,
                // Mengirimkan kembali filter ke frontend agar input form tetap terisi
                'filters' => $request->only(['search', 'status']),
            ]
        );
    }

    public function create()
    {
        return Inertia::render('AlatBerat/Create');
    }

    public function store(Request $request)
    {
        // 1. Validasi data
        $validated = $request->validate([
            'nama_alat' => 'required|string|max:255',
            'merk' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'nomor_unit' => 'nullable|string|max:255',
            'kapasitas' => 'nullable|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'status' => 'required|in:Siap Operasi,Dalam Perbaikan,Rusak',
            'keterangan' => 'nullable|string',
        ]);

        // 2. Simpan data ke database
        AlatBerat::create($validated);

        // 3. Redirect dengan pesan berhasil
        return redirect()->route('alatberat.index')
            ->with('success', 'Data alat berat berhasil ditambahkan.');
    }

    public function edit(AlatBerat $alatBerat)
    {
        return Inertia::render('AlatBerat/Edit', [
            'alatBerat' => $alatBerat,
        ]);
    }

    public function update(Request $request, AlatBerat $alatBerat)
    {
        $validated = $request->validate([
            'nama_alat' => 'required|string|max:255',
            'merk' => 'nullable|string|max:255',
            'model' => 'nullable|string|max:255',
            'nomor_unit' => 'nullable|string|max:255',
            'kapasitas' => 'nullable|string|max:255',
            'lokasi' => 'nullable|string|max:255',
            'status' => 'required|in:Siap Operasi,Dalam Perbaikan,Rusak',
            'keterangan' => 'nullable|string',
        ]);

        $alatBerat->update($validated);

        return redirect()->route('alatberat.index')
            ->with('success', 'Data alat berat berhasil diperbarui.');

    }

    public function destroy($id)
    {
        $alatBerat = AlatBerat::findOrFail($id);

        $alatBerat->delete();

        return redirect()
            ->back()
            ->with('success', 'Data alat berat berhasil dihapus.');
    }
}
