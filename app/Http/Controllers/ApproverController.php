<?php

namespace App\Http\Controllers;

use App\Models\Approver;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ApproverController extends Controller
{
    public function index(): Response
    {
        $approvers = Approver::latest()->get();
        return Inertia::render('Approvers/Index', ['approvers' => $approvers]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
        ]);
        Approver::create($validated);
        return back()->with('success', 'Data berhasil ditambahkan');
    }

    public function update(Request $request, Approver $approver)
    {
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'jabatan' => 'required|string|max:255',
        ]);
        $approver->update($validated);
        return back()->with('success', 'Data berhasil diubah');
    }

    public function destroy(Approver $approver)
    {
        $approver->delete();
        return back()->with('success', 'Data berhasil dihapus');
    }
}
