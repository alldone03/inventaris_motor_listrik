<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use App\Models\MotorChecklist;
use App\Models\Approver;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MotorChecklistController extends Controller
{
    /**
     * Show form to create a new checklist for a motor.
     */
    public function create(Motor $motor): Response
    {
        $defaultTemplate = MotorChecklist::getDefaultTemplate($motor);
        $nextFormNo = 'PK-BL-CHK-' . date('Y') . '-' . str_pad(MotorChecklist::count() + 1, 3, '0', STR_PAD_LEFT);
        $approvers = Approver::all();

        return Inertia::render('Checklists/Create', [
            'motor' => $motor,
            'defaultTemplate' => $defaultTemplate,
            'suggestedFormNo' => $nextFormNo,
            'approvers' => $approvers,
        ]);
    }

    /**
     * Store a new checklist for a motor.
     */
    public function store(Request $request, Motor $motor): RedirectResponse
    {
        $validated = $request->validate([
            'no_form' => 'nullable|string|max:255',
            'tanggal_masuk' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date',
            'area_lapangan' => 'nullable|string|max:255',
            'keluhan' => 'nullable|string',
            'daya_spek' => 'nullable|string|max:255',
            'tegangan_spek' => 'nullable|string|max:255',
            'ampere_spek' => 'nullable|string|max:255',
            'rpm_spek' => 'nullable|string|max:255',
            'nama_teknisi' => 'nullable|string|max:255',
            'nama_staf' => 'nullable|string|max:255',
            'tanggal_approval_teknisi' => 'nullable|date',
            'tanggal_approval_staf' => 'nullable|date',
            'status_perbaikan' => 'required|string|max:255',
            'items' => 'required|array',
            'catatan_umum' => 'nullable|string',
        ]);

        $checklist = $motor->checklists()->create($validated);

        return redirect()->route('checklists.show', $checklist->id)
            ->with('success', 'Form Checklist Perbaikan berhasil disimpan.');
    }

    /**
     * Display the checklist in A4 printable layout.
     */
    public function show(MotorChecklist $checklist): Response
    {
        $checklist->load('motor');
        // dd($checklist);


        return Inertia::render('Checklists/Show', [
            'checklist' => $checklist,
            'motor' => $checklist->motor,
        ]);
    }

    /**
     * Show form to edit an existing checklist.
     */
    public function edit(MotorChecklist $checklist): Response
    {
        $checklist->load('motor');
        $approvers = Approver::all();

        return Inertia::render('Checklists/Edit', [
            'checklist' => $checklist,
            'motor' => $checklist->motor,
            'approvers' => $approvers,
        ]);
    }

    /**
     * Update an existing checklist.
     */
    public function update(Request $request, MotorChecklist $checklist): RedirectResponse
    {
        $validated = $request->validate([
            'no_form' => 'nullable|string|max:255',
            'tanggal_masuk' => 'nullable|date',
            'tanggal_selesai' => 'nullable|date',
            'area_lapangan' => 'nullable|string|max:255',
            'keluhan' => 'nullable|string',
            'daya_spek' => 'nullable|string|max:255',
            'tegangan_spek' => 'nullable|string|max:255',
            'ampere_spek' => 'nullable|string|max:255',
            'rpm_spek' => 'nullable|string|max:255',
            'nama_teknisi' => 'nullable|string|max:255',
            'nama_staf' => 'nullable|string|max:255',
            'tanggal_approval_teknisi' => 'nullable|date',
            'tanggal_approval_staf' => 'nullable|date',
            'status_perbaikan' => 'required|string|max:255',
            'items' => 'required|array',
            'catatan_umum' => 'nullable|string',
        ]);

        $checklist->update($validated);

        return redirect()->route('checklists.show', $checklist->id)
            ->with('success', 'Form Checklist Perbaikan berhasil diperbarui.');
    }

    /**
     * Remove a checklist from storage.
     */
    public function destroy(MotorChecklist $checklist): RedirectResponse
    {
        $motorId = $checklist->motor_id;
        $checklist->delete();

        return redirect()->route('motors.show', $motorId)
            ->with('success', 'Form Checklist berhasil dihapus.');
    }
}
