<?php

namespace App\Http\Controllers;

use App\Models\Governor;
use Illuminate\Http\Request;
use Inertia\Inertia;

class GovernorController extends Controller
{
    public function index(Request $request)
    {
        $search = trim($request->input('search', ''));

        $sortField = $request->input('sort_field', 'item_no');
        $sortDirection = strtolower(
            $request->input('sort_direction', 'asc')
        );

        $allowedSortFields = [
            'item_no',
            'governor_type',
            'rotation',
            'speed_range_rpm',
            'part_no',
            'serial_no',
            'ket',
            'stock_code',
            'area',
            'pabrik',
        ];

        // Validasi sorting
        if (! in_array($sortField, $allowedSortFields, true)) {
            $sortField = 'item_no';
        }

        if (! in_array($sortDirection, ['asc', 'desc'], true)) {
            $sortDirection = 'asc';
        }

        $query = Governor::query();

        // SEARCH SEMUA PARAMETER
        if ($search !== '') {
            $query->where(function ($q) use ($search) {
                $q->where('item_no', 'like', "%{$search}%")
                    ->orWhere('governor_type', 'like', "%{$search}%")
                    ->orWhere('rotation', 'like', "%{$search}%")
                    ->orWhere('speed_range_rpm', 'like', "%{$search}%")
                    ->orWhere('part_no', 'like', "%{$search}%")
                    ->orWhere('serial_no', 'like', "%{$search}%")
                    ->orWhere('ket', 'like', "%{$search}%")
                    ->orWhere('stock_code', 'like', "%{$search}%")
                    ->orWhere('area', 'like', "%{$search}%")
                    ->orWhere('pabrik', 'like', "%{$search}%");
            });
        }

        // SORTING
        $query->orderBy($sortField, $sortDirection);

        // PAGINATION
        $governors = $query
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Instrument/Governor/Index', [
            'governors' => $governors,
            'filters' => [
                'search' => $search,
                'sort_field' => $sortField,
                'sort_direction' => $sortDirection,
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Instrument/Governor/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'item_no' => 'required',
            'governor_type' => 'required',
            'rotation' => 'required',
            'speed_range_rpm' => 'required',
            'part_no' => 'required',
            'serial_no' => 'required',
            'ket' => 'required',
            'stock_code' => 'required',
            'area' => 'required',
            'pabrik' => 'required',
        ]);
        Governor::create($request->all());

        return to_route('governor.index');
    }

    public function edit($id)
    {
        $governor = Governor::find($id);

        return Inertia::render('Instrument/Governor/Edit', [
            'governor' => $governor,
        ]);
    }

    public function update(Request $request, $id)
    {
        $governor = Governor::find($id);
        $governor->update($request->all());

        return to_route('governor.index');
    }

    public function delete($id)
    {
        $governor = Governor::find($id);
        $governor->delete();

        return to_route('governor.index');
    }

    public function uploadpdf(Request $request, $id)
    {
        // dd('hello');s

        return Inertia::render('Instrument/Governor/Uploadpdf');
    }
}
// } public function uploadPdf(Request $request, $id)
// {
//     $request->validate([
//         'pdf' => 'required|file|mimes:pdf|max:10240',
//     ]);

//     $governor = Governor::findOrFail($id);

//     $path = $request->file('pdf')
//         ->store('governor-pdfs', 'public');

//     $governor->update([
//         'pdf_path' => $path,
//     ]);

//     return back()->with('success', 'PDF berhasil disimpan.');
// }
