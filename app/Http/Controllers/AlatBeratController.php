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
