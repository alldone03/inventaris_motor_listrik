<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
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
                        ->orWhere('keterangan', 'like', "%{$search}%");
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Motors/Index', [
            'motors' => $motors,
            'filters' => [
                'search' => $search,
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
            'item' => 'required|string|max:255',
            'label_ke' => 'nullable|string|max:255',
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
            'item' => 'required|string|max:255',
            'label_ke' => 'nullable|string|max:255',
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
