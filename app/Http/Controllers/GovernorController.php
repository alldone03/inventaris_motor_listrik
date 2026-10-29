<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Governor;
use Inertia\Inertia;

class GovernorController extends Controller
{
    public function index()
    {
        return Inertia::render('Instrument/Governor/Index', [
            'governors' => Governor::all(),
            'filters' => request()->all(),

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
}
