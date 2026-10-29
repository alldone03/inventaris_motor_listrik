<?php

namespace App\Http\Controllers;

use App\Models\Motor;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $sortField = $request->input('sort_field', 'label_ke');
        $sortDirection = $request->input('sort_direction', 'asc');

        $allowedSortFields = ['item', 'label_ke', 'alamat_motor', 'hp_kw', 'voltage', 'ampere', 'frame', 'ip_rating', 'frequency', 'manufacture', 'status', 'mounting', 'created_at'];
        $sortField = in_array($sortField, $allowedSortFields) ? $sortField : 'label_ke';
        $sortDirection = in_array(strtolower($sortDirection), ['asc', 'desc']) ? strtolower($sortDirection) : 'asc';

        $numericFields = ['label_ke', 'item', 'alamat_motor'];

        $query = Motor::query()
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
                        ->orWhere('keterangan', 'like', "%{$search}%")
                        ->orWhere('mounting', 'like', "%{$search}%");
                });
            });

        if (in_array($sortField, $numericFields)) {
            $driver = DB::connection()->getDriverName();
            $castType = in_array($driver, ['sqlite', 'pgsql']) ? 'INTEGER' : 'SIGNED';

            $query->orderByRaw("CASE WHEN {$sortField} IS NULL OR {$sortField} = '' THEN 1 ELSE 0 END ASC")
                ->orderByRaw("CAST({$sortField} AS {$castType}) {$sortDirection}")
                ->orderByRaw("LENGTH({$sortField}) {$sortDirection}")
                ->orderBy($sortField, $sortDirection);
        } else {
            $query->orderBy($sortField, $sortDirection);
        }

        $motors = $query
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Listrik/Motors/Index', [
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
        $driver = DB::connection()->getDriverName();
        $castType = in_array($driver, ['sqlite', 'pgsql']) ? 'INTEGER' : 'SIGNED';

        // Cari motor dengan label_ke numerik tertinggi / data terakhir
        $lastMotor = Motor::whereNotNull('label_ke')
            ->where('label_ke', '!=', '')
            ->orderByRaw("CAST(label_ke AS {$castType}) DESC")
            ->orderByRaw("LENGTH(label_ke) DESC")
            ->first();

        if (!$lastMotor) {
            $lastMotor = Motor::latest()->first();
        }

        $lastLabelKe = $lastMotor?->label_ke;

        // Hitung saran nomor label berikutnya
        $suggestedLabelKe = null;
        if ($lastLabelKe !== null && trim($lastLabelKe) !== '') {
            if (is_numeric($lastLabelKe)) {
                $suggestedLabelKe = (string) ((int) $lastLabelKe + 1);
            } elseif (preg_match('/^(.*?)(\d+)$/', $lastLabelKe, $matches)) {
                $prefix = $matches[1];
                $num = $matches[2];
                $next = (int) $num + 1;
                $suggestedLabelKe = $prefix . str_pad($next, strlen($num), '0', STR_PAD_LEFT);
            } else {
                $suggestedLabelKe = $lastLabelKe . '-1';
            }
        } else {
            $suggestedLabelKe = '1';
        }

        return Inertia::render('Listrik/Motors/Create', [
            'lastLabelKe' => $lastLabelKe,
            'suggestedLabelKe' => $suggestedLabelKe,
        ]);
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
            'mounting' => 'nullable|string|max:255',
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

        return Inertia::render('Listrik/Motors/Show', [
            'motor' => $motor,
        ]);
    }

    /**
     * Show the form for editing the specified motor.
     */
    public function edit(Motor $motor): Response
    {
        return Inertia::render('Listrik/Motors/Edit', [
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
            'mounting' => 'nullable|string',
        ], [
            'item.unique' => 'Kode Item motor ini sudah terdaftar pada data motor lain.',
            'item.required' => 'Kode Item motor wajib diisi.',
        ]);
        // dd($validated);

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

    /**
     * Display nameplates print selection and bulk printing page.
     */
    public function printNameplates(Request $request): Response
    {
        $search = $request->input('search');

        $query = Motor::query()
            ->when($search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('item', 'like', "%{$search}%")
                        ->orWhere('label_ke', 'like', "%{$search}%")
                        ->orWhere('alamat_motor', 'like', "%{$search}%")
                        ->orWhere('hp_kw', 'like', "%{$search}%")
                        ->orWhere('voltage', 'like', "%{$search}%")
                        ->orWhere('ampere', 'like', "%{$search}%")
                        ->orWhere('mounting', 'like', "%{$search}%");
                });
            });

        $driver = DB::connection()->getDriverName();
        $castType = in_array($driver, ['sqlite', 'pgsql']) ? 'INTEGER' : 'SIGNED';

        $motors = $query
            ->orderByRaw("CASE WHEN label_ke IS NULL OR label_ke = '' THEN 1 ELSE 0 END ASC")
            ->orderByRaw("CAST(label_ke AS {$castType}) ASC")
            ->orderBy('label_ke', 'asc')
            ->get();

        return Inertia::render('Listrik/Motors/PrintNameplates', [
            'motors' => $motors,
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


}


