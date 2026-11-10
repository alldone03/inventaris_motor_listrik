<?php

namespace App\Http\Controllers;

use App\Models\AlatPrimer;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class AlatPrimerController extends Controller
{
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
}
