<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class MotorController extends Controller
{
    /**
     * Display a listing of motors with search.
     */
    public function index(Request $request): Response
    {
        $search = $request->input('search');
        $sortField = $request->input('sort_field', 'created_at');
        $sortDirection = $request->input('sort_direction', 'desc');

        $allowedSortFields = ['item', 'label_ke', 'alamat_motor', 'hp_kw', 'voltage', 'ampere', 'frame', 'ip_rating', 'frequency', 'manufacture', 'status', 'created_at'];
        $sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'created_at';
        $sortDirection = in_array(strtolower($sortDirection), ['asc', 'desc']) ? strtolower($sortDirection) : 'desc';

        $motors = Motor::query()
            ->withCount('checklists')
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('item', 'like', "%{$search}%")
                        ->orWhere('label_ke', 'like', "%{$search}%")
                        ->orWhere('alamat_motor', 'like', "%{$search}%")
                        ->orWhere('hp_kw', 'like', "%{$search}%")
                        ->orWhere('voltage', 'like', "%{$search}%")
                        ->orWhere('manufacture', 'like', "%{$search}%")
                        ->orWhere('area', 'like', "%{$search}%")
                        ->orWhere('rpm', 'like', "%{$search}%")
                        ->orWhere('ampere', 'like', "%{$search}%")
                        ->orWhere('frequency', 'like', "%{$search}%")
                        ->orWhere('ip_rating', 'like', "%{$search}%")
                        ->orWhere('frame', 'like', "%{$search}%")
                        ->orWhere('status', 'like', "%{$search}%")
                        ->orWhere('keterangan', 'like', "%{$search}%");
                });
            })
            ->orderBy($sortField, $sortDirection)
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Motors/Index', [
            'motors' => $motors,
            'filters' => [
                'search' => $search,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
            ],
        ]);
    }

    /**
     * Show the form for creating a new motor.
     */
    public function create(): Response
    {
        return Inertia::render('Motors/Create');
    }

    /**
     * Store a newly created motor in storage.
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'item' => 'nullable|string|max:255',
            'label_ke' => ['required', 'string', 'max:255', 'unique:motors,label_ke'],
            'alamat_motor' => 'nullable|string|max:255',
            'hp_kw' => 'nullable|string|max:255',
            'voltage' => 'nullable|string|max:255',
            'ampere' => 'nullable|string|max:255',
            'frame' => 'nullable|string|max:255',
            'ip_rating' => 'nullable|string|max:255',
            'frequency' => 'nullable|string|max:255',
            'manufacture' => 'nullable|string|max:255',
            'rpm' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
            'status' => 'nullable|string|in:Di Workshop,Keluar Workshop',
        ], [
            'label_ke.unique' => 'Label Ke motor ini sudah terdaftar. Harap gunakan kode item yang unik.',
            'label_ke.required' => 'Label Ke motor wajib diisi.',
        ]);

        $motor = Motor::create($validated);

        return redirect()->route('motors.show', $motor->id)
            ->with('success', 'Data Motor berhasil ditambahkan.');
    }

    /**
     * Display the specified motor with all its checklist forms.
     */
    public function show(Motor $motor): Response
    {
        $motor->load(['checklists' => function ($q) {
            $q->latest();
        }]);

        return Inertia::render('Motors/Show', [
            'motor' => $motor,
        ]);
    }

    /**
     * Show the form for editing the specified motor.
     */
    public function edit(Motor $motor): Response
    {
        return Inertia::render('Motors/Edit', [
            'motor' => $motor,
        ]);
    }

    /**
     * Update the specified motor in storage.
     */
    public function update(Request $request, Motor $motor): RedirectResponse
    {
        $validated = $request->validate([
            'item' => 'nullable|string|max:255',
            'label_ke' => ['required', 'string', 'max:255', Rule::unique('motors', 'label_ke')->ignore($motor->id)],
            'alamat_motor' => 'nullable|string|max:255',
            'hp_kw' => 'nullable|string|max:255',
            'voltage' => 'nullable|string|max:255',
            'ampere' => 'nullable|string|max:255',
            'frame' => 'nullable|string|max:255',
            'ip_rating' => 'nullable|string|max:255',
            'frequency' => 'nullable|string|max:255',
            'manufacture' => 'nullable|string|max:255',
            'rpm' => 'nullable|string|max:255',
            'area' => 'nullable|string|max:255',
            'keterangan' => 'nullable|string',
            'status' => 'nullable|string|in:Di Workshop,Keluar Workshop',
        ], [
            'item.unique' => 'Kode Item motor ini sudah terdaftar pada data motor lain.',
            'item.required' => 'Kode Item motor wajib diisi.',
        ]);

        $motor->update($validated);

        return redirect()->route('motors.show', $motor->id)
            ->with('success', 'Data Motor berhasil diperbarui.');
    }

    /**
     * Remove the specified motor from storage.
     */
    public function destroy(Motor $motor): RedirectResponse
    {
        $motor->delete();

        return redirect()->route('motors.index')
            ->with('success', 'Data Motor berhasil dihapus.');
    }
}
