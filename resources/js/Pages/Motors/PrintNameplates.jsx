import React, { useState, useMemo } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import MotorNameplateCard from '@/Components/MotorNameplateCard';
import {
    Printer,
    ArrowLeft,
    Search,
    CheckSquare,
    Square,
    Tag,
    Layers,
    SlidersHorizontal,
    X,
    Eye,
    HelpCircle
} from 'lucide-react';

export default function PrintNameplates({ motors, filters }) {
    const [search, setSearch] = useState(filters?.search || '');
    const [selectedIds, setSelectedIds] = useState([]);
    const [filterStatus, setFilterStatus] = useState('all'); // all | Di Workshop | Keluar Workshop
    const [printMode, setPrintMode] = useState('stiker'); // 'stiker' (8.5x5cm roll/label) | 'a4' (A4 grid 2x5)

    // Filtered motors based on search and status
    const filteredMotors = useMemo(() => {
        return motors.filter((motor) => {
            const matchesSearch =
                !search ||
                (motor.label_ke && motor.label_ke.toLowerCase().includes(search.toLowerCase())) ||
                (motor.item && motor.item.toLowerCase().includes(search.toLowerCase())) ||
                (motor.alamat_motor && motor.alamat_motor.toLowerCase().includes(search.toLowerCase())) ||
                (motor.hp_kw && motor.hp_kw.toLowerCase().includes(search.toLowerCase())) ||
                (motor.mounting && motor.mounting.toLowerCase().includes(search.toLowerCase())) ||
                (motor.voltage && motor.voltage.toLowerCase().includes(search.toLowerCase()));

            const matchesStatus =
                filterStatus === 'all' || motor.status === filterStatus;

            return matchesSearch && matchesStatus;
        });
    }, [motors, search, filterStatus]);

    const isAllSelected =
        filteredMotors.length > 0 &&
        filteredMotors.every((m) => selectedIds.includes(motorId(m)));

    function motorId(m) {
        return m.id;
    }

    const toggleSelectAll = () => {
        if (isAllSelected) {
            // Uncheck all currently visible
            const visibleIds = new Set(filteredMotors.map((m) => motorId(m)));
            setSelectedIds((prev) => prev.filter((id) => !visibleIds.has(id)));
        } else {
            // Select all visible
            const visibleIds = filteredMotors.map((m) => motorId(m));
            setSelectedIds((prev) => Array.from(new Set([...prev, ...visibleIds])));
        }
    };

    const toggleSelectOne = (id) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const clearSelection = () => {
        setSelectedIds([]);
    };

    const selectedMotors = useMemo(() => {
        const idMap = new Map(motors.map((m) => [m.id, m]));
        return selectedIds.map((id) => idMap.get(id)).filter(Boolean);
    }, [motors, selectedIds]);

    const handlePrint = () => {
        if (selectedIds.length === 0) {
            alert('Silakan pilih minimal satu nameplate motor untuk dicetak.');
            return;
        }
        window.print();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 no-print">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('motors.index')}
                            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition shadow-sm"
                            title="Kembali ke Daftar Motor"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                                <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                    <Printer className="h-6 w-6" />
                                </span>
                                Cetak Massal Nameplate Motor
                            </h2>
                            <p className="text-xs text-slate-500 mt-1">
                                Pilih satu atau beberapa nameplate motor untuk dicetak secara massal sekaligus.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={handlePrint}
                            disabled={selectedIds.length === 0}
                            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition ${
                                selectedIds.length > 0
                                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20 cursor-pointer'
                                    : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                            }`}
                        >
                            <Printer className="h-4 w-4" />
                            <span>Cetak Terpilih ({selectedIds.length})</span>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title="Cetak Massal Nameplate Motor - Bengkel Listrik Pupuk Kujang" />

            <div className="space-y-6">
                {/* TOOLBAR & CONTROL PANEL (NO PRINT) */}
                <div className="no-print bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        {/* Search Bar */}
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari Kode Item, Label Ke, Alamat, Daya, Mounting..."
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={() => setSearch('')}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        {/* Filter Status & Print Mode */}
                        <div className="flex flex-wrap items-center gap-2.5">
                            {/* Filter Status */}
                            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                                <button
                                    type="button"
                                    onClick={() => setFilterStatus('all')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        filterStatus === 'all'
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Semua ({motors.length})
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilterStatus('Di Workshop')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        filterStatus === 'Di Workshop'
                                            ? 'bg-white text-emerald-700 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Di Workshop
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFilterStatus('Keluar Workshop')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        filterStatus === 'Keluar Workshop'
                                            ? 'bg-white text-amber-700 shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                >
                                    Keluar
                                </button>
                            </div>

                            {/* Mode Cetak */}
                            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                                <span className="px-2 text-slate-500 text-[11px]">Format:</span>
                                <button
                                    type="button"
                                    onClick={() => setPrintMode('stiker')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        printMode === 'stiker'
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                    title="Tiap kartu dicetak 1 lembar 8.5x5cm (printer stiker/label thermal/laser)"
                                >
                                    Stiker (8.5x5cm)
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setPrintMode('a4')}
                                    className={`px-3 py-1.5 rounded-lg transition ${
                                        printMode === 'a4'
                                            ? 'bg-emerald-600 text-white shadow-sm'
                                            : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                    title="Kertas A4 standar (grid kartu nameplate)"
                                >
                                    Kertas A4 (Grid)
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Selection Summary Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={toggleSelectAll}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition"
                            >
                                {isAllSelected ? (
                                    <>
                                        <CheckSquare className="h-4 w-4 text-emerald-600" />
                                        <span>Batal Pilih Semua</span>
                                    </>
                                ) : (
                                    <>
                                        <Square className="h-4 w-4 text-slate-400" />
                                        <span>Pilih Semua Tampil ({filteredMotors.length})</span>
                                    </>
                                )}
                            </button>

                            {selectedIds.length > 0 && (
                                <button
                                    type="button"
                                    onClick={clearSelection}
                                    className="px-2.5 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-bold transition"
                                >
                                    Reset Pilihan
                                </button>
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-slate-600">
                            <span>
                                Terpilih:{' '}
                                <strong className="text-emerald-600 font-bold">
                                    {selectedIds.length}
                                </strong>{' '}
                                dari {filteredMotors.length} motor
                            </span>
                        </div>
                    </div>
                </div>

                {/* INSTRUCTION CARD (NO PRINT) */}
                <div className="no-print bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 flex items-start gap-3">
                    <HelpCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-emerald-950 space-y-1">
                        <p className="font-bold">Panduan Cetak Massal:</p>
                        <p className="text-emerald-800 leading-relaxed">
                            {printMode === 'stiker' ? (
                                <>
                                    <strong>Format Stiker (8.5x5cm):</strong> Setiap nameplate yang dipilih akan dicetak pas <strong>1 kertas per kartu</strong> secara berurutan. Di pengaturan dialog cetak browser, pilih Paper Size <strong>8.5cm x 5cm</strong> (atau Custom) dan Margin <strong>None</strong>.
                                </>
                            ) : (
                                <>
                                    <strong>Format Kertas A4:</strong> Nameplate yang dipilih akan disusun rapi dalam grid pada lembar A4 (muat beberapa kartu per lembar A4).
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* MOTOR SELECTION GRID (NO PRINT) */}
                <div className="no-print space-y-3">
                    <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                            <Tag className="h-4 w-4 text-emerald-600" />
                            <span>Pilih Nameplate yang Ingin Dicetak</span>
                        </h3>
                        <span className="text-xs text-slate-500">
                            Klik kotak atau kartu untuk memilih
                        </span>
                    </div>

                    {filteredMotors.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-slate-500">
                            Tidak ada motor yang cocok dengan filter.
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                            {filteredMotors.map((motor) => {
                                const isSelected = selectedIds.includes(motor.id);

                                return (
                                    <div
                                        key={motor.id}
                                        onClick={() => toggleSelectOne(motor.id)}
                                        className={`group relative rounded-2xl p-3 border-2 transition-all cursor-pointer flex flex-col items-center justify-between ${
                                            isSelected
                                                ? 'bg-emerald-50/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                                                : 'bg-white border-slate-200/80 hover:border-slate-300 hover:shadow-sm'
                                        }`}
                                    >
                                        {/* Selection Checkbox Pill */}
                                        <div className="w-full flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => {}} // handled by parent onClick
                                                    className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                                />
                                                <span className="font-bold text-xs text-slate-900">
                                                    Label: {motor.label_ke || '-'}
                                                </span>
                                            </div>

                                            <span
                                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                    motor.status === 'Di Workshop'
                                                        ? 'bg-emerald-100 text-emerald-800'
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}
                                            >
                                                {motor.status || 'Di Workshop'}
                                            </span>
                                        </div>

                                        {/* Proportional Preview of the Nameplate - Ukuran Asli 8.5cm x 5cm */}
                                        <div className="p-2 bg-slate-50/50 rounded-xl border border-slate-100 w-full flex justify-center overflow-x-auto">
                                            <MotorNameplateCard motor={motor} />
                                        </div>

                                        <div className="w-full mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                                            <span className="font-mono font-medium truncate max-w-[140px]">
                                                {motor.item || '-'}
                                            </span>
                                            <span className="truncate max-w-[120px]">
                                                {motor.alamat_motor || '-'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* PRINT AREA (ONLY VISIBLE ON PRINT) */}
                <div id="bulk-print-container">
                    {selectedMotors.map((motor) => (
                        <div
                            key={motor.id}
                            className={`bulk-print-item ${
                                printMode === 'stiker' ? 'sticker-mode-item' : 'a4-mode-item'
                            }`}
                        >
                            <MotorNameplateCard motor={motor} />
                        </div>
                    ))}
                </div>
            </div>

            {/* Print CSS Rules */}
            <style>{`
                @media screen {
                    #bulk-print-container {
                        display: none !important;
                    }
                }

                @media print {
                    /* Sembunyikan elemen UI non-print */
                    .no-print,
                    header,
                    aside,
                    nav,
                    footer {
                        display: none !important;
                    }

                    /* Reset body & html */
                    html, body {
                        background: #ffffff !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        height: auto !important;
                        min-height: 0 !important;
                        overflow: visible !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }

                    /* Reset pembungkus layout utama */
                    .min-h-screen {
                        display: block !important;
                        min-height: 0 !important;
                        height: auto !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        background: transparent !important;
                    }

                    main {
                        display: block !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        max-width: none !important;
                        width: 100% !important;
                    }

                    div.space-y-6 {
                        display: block !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }

                    ${
                        printMode === 'stiker'
                            ? `
                        @page {
                            size: 8.5cm 5cm;
                            margin: 0 !important;
                        }

                        #bulk-print-container {
                            display: block !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 8.5cm !important;
                        }

                        .bulk-print-item {
                            display: block !important;
                            width: 8.5cm !important;
                            height: 4.95cm !important;
                            max-width: 8.5cm !important;
                            max-height: 4.95cm !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            box-sizing: border-box !important;
                            overflow: hidden !important;
                            page-break-inside: avoid !important;
                            break-inside: avoid !important;
                            page-break-after: always !important;
                            break-after: page !important;
                        }

                        .bulk-print-item:last-child {
                            page-break-after: auto !important;
                            break-after: auto !important;
                        }

                        .bulk-print-item .print-nameplate-item {
                            width: 8.5cm !important;
                            height: 4.95cm !important;
                            max-width: 8.5cm !important;
                            max-height: 4.95cm !important;
                            margin: 0 !important;
                            box-sizing: border-box !important;
                            overflow: hidden !important;
                        }
                    `
                            : `
                        @page {
                            size: A4 portrait;
                            margin: 0.8cm !important;
                        }

                        #bulk-print-container {
                            display: flex !important;
                            flex-wrap: wrap !important;
                            align-content: flex-start !important;
                            gap: 0.35cm !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }

                        .bulk-print-item {
                            display: inline-block !important;
                            width: 8.5cm !important;
                            height: 5cm !important;
                            max-width: 8.5cm !important;
                            max-height: 5cm !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            box-sizing: border-box !important;
                            overflow: hidden !important;
                            page-break-inside: avoid !important;
                            break-inside: avoid !important;
                            page-break-after: auto !important;
                            break-after: auto !important;
                        }

                        .bulk-print-item .print-nameplate-item {
                            width: 8.5cm !important;
                            height: 5cm !important;
                            max-width: 8.5cm !important;
                            max-height: 5cm !important;
                            margin: 0 !important;
                            box-sizing: border-box !important;
                            overflow: hidden !important;
                        }
                    `
                    }

                    * {
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </AuthenticatedLayout>
    );
}
