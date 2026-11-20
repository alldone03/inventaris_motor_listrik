<?php

namespace App\Http\Controllers;

use App\Models\AlatBerat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AlatBeratController extends Controller
{
    // Menampilkan daftar alat berat
    public function index(Request $request)
    {
        $search = $request->input('search');
        $status = $request->input('status');

        $alatBerat = AlatBerat::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama_alat', 'like', "%{$search}%")
                        ->orWhere('merk', 'like', "%{$search}%")
                        ->orWhere('model', 'like', "%{$search}%")
                        ->orWhere('nomor_unit', 'like', "%{$search}%")
                        ->orWhere('nomor_register_depnaker', 'like', "%{$search}%");
                });
            })
            ->when($status && $status !== 'Semua Status', function ($query, $status) {
                $query->where('status', $status);
            })
            ->get();

        return Inertia::render('AlatBerat/Index', [
            'alatBerat' => $alatBerat,
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    // Halaman tambah data
    public function create()
    {
        return Inertia::render('AlatBerat/Create');
    }

    // Menyimpan data baru
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_alat' => 'required|string|max:255',
            'merk' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'nomor_unit' => 'required|string|max:255',

            'status' => 'required|in:Siap Operasi,Dalam Perbaikan,Rusak',

            'nomor_register_depnaker' => 'nullable|string|max:255',
            'tanggal_surat_keluar' => 'nullable|date',
            'tanggal_habis_berlaku' => 'nullable|date',
            'status_silo' => 'nullable|string|max:255',

            'keterangan' => 'nullable|string',
        ]);

        AlatBerat::create($validated);

        return redirect()->route('alatberat.index')
            ->with('success', 'Data alat berat berhasil ditambahkan.');
    }

    // Halaman edit data
    public function edit(AlatBerat $alatBerat)
    {
        return Inertia::render('AlatBerat/Edit', [
            'alatBerat' => $alatBerat,
        ]);
    }

    // Memperbarui data
    public function update(Request $request, AlatBerat $alatBerat)
    {
        $validated = $request->validate([
            'nama_alat' => 'required|string|max:255',
            'merk' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'nomor_unit' => 'required|string|max:255',

            'status' => 'required|in:Siap Operasi,Dalam Perbaikan,Rusak',

            'nomor_register_depnaker' => 'nullable|string|max:255',
            'tanggal_surat_keluar' => 'nullable|date',
            'tanggal_habis_berlaku' => 'nullable|date',
            'status_silo' => 'nullable|string|max:255',

            'keterangan' => 'nullable|string',
        ]);

        $alatBerat->update($validated);

        return redirect()->route('alatberat.index')
            ->with('success', 'Data alat berat berhasil diperbarui.');
    }

    // Menghapus data
    public function destroy($id)
    {
        $alatBerat = AlatBerat::findOrFail($id);

        $alatBerat->delete();

        return redirect()->back()
            ->with('success', 'Data alat berat berhasil dihapus.');

    }

    // Upload dokumen PDF SILO
    public function uploadPdf(Request $request, AlatBerat $alatBerat)
    {
        $request->validate([
            'pdf' => 'required|file|mimes:pdf|max:10240',
        ]);

        // Hapus PDF lama jika ada
        if ($alatBerat->pdf_path) {
            Storage::disk('public')->delete($alatBerat->pdf_path);
        }

        // Simpan PDF baru
        $path = $request->file('pdf')->store(
            'dokumen-silo',
            'public'
        );

        $alatBerat->update([
            'pdf_path' => $path,
        ]);

        return redirect()->back()
            ->with('success', 'Dokumen SILO berhasil diunggah.');
    }
}
