<?php

namespace App\Http\Controllers;

use App\Models\AlatPrimer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AlatPrimerController extends Controller
{
    // DAFTAR ALAT PRIMER
    public function index(Request $request)
    {
        $search = $request->input('search');

        $alatPrimers = AlatPrimer::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('nama', 'like', "%{$search}%")
                        ->orWhere('merk', 'like', "%{$search}%")
                        ->orWhere('serial_number', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Instrument/AlatPrimer/Index', [
            'alatPrimers' => $alatPrimers,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }

    // TAMBAH ALAT PRIMER
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => ['nullable', 'string', 'max:255'],
            'merk' => ['nullable', 'string', 'max:255'],
            'serial_number' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('alat_primers', 'serial_number'),
            ],
            'range' => ['nullable', 'string', 'max:255'],
        ]);

        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        AlatPrimer::create($validated);

        return redirect()
            ->route('alatprimer.index')
            ->with('success', 'Data alat primer berhasil disimpan.');
    }

    // HALAMAN EDIT
    public function edit($id)
    {
        $alatPrimer = AlatPrimer::findOrFail($id);

        return Inertia::render('Instrument/AlatPrimer/Edit', [
            'alatPrimer' => $alatPrimer,
        ]);
    }

    // UPDATE DATA LAMA
    public function update(Request $request, $id)
    {
        $alatPrimer = AlatPrimer::findOrFail($id);

        $validated = $request->validate([
            'nama' => ['nullable', 'string', 'max:255'],
            'merk' => ['nullable', 'string', 'max:255'],
            'serial_number' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('alat_primers', 'serial_number')
                    ->ignore($alatPrimer->id),
            ],
            'range' => ['nullable', 'string', 'max:255'],
        ]);

        foreach ($validated as $key => $value) {
            if ($value === '') {
                $validated[$key] = null;
            }
        }

        $alatPrimer->update($validated);

        return redirect()
            ->route('alatprimer.index')
            ->with('success', 'Data alat primer berhasil diperbarui.');
    }

    // HAPUS DATA ALAT PRIMER
    public function destroy($id)
    {
        $alatPrimer = AlatPrimer::findOrFail($id);

        $alatPrimer->delete();

        return redirect()
            ->route('alatprimer.index')
            ->with('success', 'Data alat primer berhasil dihapus.');
    }
}
