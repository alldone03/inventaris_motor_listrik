import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import OcrScannerModal from '@/Components/OcrScannerModal';
import { 
    Zap, 
    FileCheck, 
    CheckCircle2, 
    Clock, 
    PlusCircle, 
    Search, 
    Camera, 
    ArrowRight, 
    Wrench, 
    Activity, 
    Layers,
    Sparkles,
    Eye,
    ChevronRight
} from 'lucide-react';

export default function Dashboard({ stats, recentChecklists, recentMotors }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [isOcrOpen, setIsOcrOpen] = useState(false);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('motors.index'), { search: searchQuery });
        }
    };

    const handleOcrResult = (itemCode) => {
        router.get(route('motors.index'), { search: itemCode });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                <Activity className="h-6 w-6" />
                            </span>
                            Dashboard Bengkel Listrik
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Sistem Monitoring, Inventaris & Form Checklist Perbaikan Motor Listrik PT PUPUK KUJANG
                        </p>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <button
                            type="button"
                            onClick={() => setIsOcrOpen(true)}
                            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center gap-2 transition"
                        >
                            <Camera className="h-4 w-4" />
                            <span>Scan OCR Nameplate</span>
                        </button>

                        <Link
                            href={route('motors.create')}
                            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
                        >
                            <PlusCircle className="h-4 w-4" />
                            <span>Tambah Motor Baru</span>
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard - Bengkel Listrik Pupuk Kujang" />

            <div className="space-y-8">
                {/* Search & OCR Banner */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-xl">
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
                    <div className="relative z-10 max-w-3xl">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                            <Sparkles className="h-3.5 w-3.5" />
                            Pencarian Cerdas & OCR Otomatis
                        </span>
                        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                            Cari data motor atau pindai nameplate fisik motor listrik
                        </h1>
                        <p className="text-slate-300 text-xs sm:text-sm mt-1 mb-5">
                            Ketik kode Item, alamat, atau gunakan kamera / foto nameplate motor untuk mengisi otomatis.
                        </p>

                        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari Item Motor (contoh: 2213-JA, 1102-FA, TECO, dll.)..."
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-xl text-sm placeholder-slate-400 border border-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                                />
                            </div>
                            <div className="flex gap-2">
                                <button
                                    type="submit"
                                    className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                                >
                                    <Search className="h-4 w-4" />
                                    <span>Cari</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsOcrOpen(true)}
                                    className="px-4 py-3 bg-white/15 hover:bg-white/25 text-white font-bold text-xs rounded-xl border border-white/20 transition flex items-center justify-center gap-1.5"
                                    title="Pindai OCR"
                                >
                                    <Camera className="h-4 w-4 text-cyan-300" />
                                    <span>Pindai OCR</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Metric Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Total Motors */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Motor Listrik</span>
                            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                <Zap className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-3xl font-black text-slate-900">{stats.totalMotors}</span>
                            <span className="text-xs text-slate-500 ml-2">unit terdaftar</span>
                        </div>
                        <Link
                            href={route('motors.index')}
                            className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                        >
                            <span>Lihat semua motor</span>
                            <ChevronRight className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    {/* Total Checklists */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Form Checklist</span>
                            <div className="p-2 rounded-xl bg-teal-50 text-teal-600">
                                <FileCheck className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-3xl font-black text-slate-900">{stats.totalChecklists}</span>
                            <span className="text-xs text-slate-500 ml-2">dokumen form</span>
                        </div>
                        <p className="mt-3 text-xs text-slate-500">Format standar A4 Bengkel Listrik</p>
                    </div>

                    {/* Selesai Perbaikan */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Perbaikan Selesai</span>
                            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                                <CheckCircle2 className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-3xl font-black text-emerald-600">{stats.selesaiChecklists}</span>
                            <span className="text-xs text-slate-500 ml-2">form selesai</span>
                        </div>
                        <p className="mt-3 text-xs text-emerald-600 font-medium">Lolos uji pengetesan</p>
                    </div>

                    {/* Dalam Proses */}
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Dalam Perbaikan</span>
                            <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
                                <Clock className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-3">
                            <span className="text-3xl font-black text-amber-600">{stats.prosesChecklists}</span>
                            <span className="text-xs text-slate-500 ml-2">sedang aktif</span>
                        </div>
                        <p className="mt-3 text-xs text-amber-600 font-medium">Tahapan bengkel listrik</p>
                    </div>
                </div>

                {/* Two Column Section: Recent Motors & Recent Checklists */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Recent Motors */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-emerald-50 text-emerald-700">
                                        <Layers className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 text-sm">Daftar Motor Terbaru</h3>
                                </div>
                                <Link
                                    href={route('motors.index')}
                                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                                >
                                    Semua <ArrowRight className="h-3.5 w-3.5" />
                                </Link>
                            </div>

                            <div className="space-y-3">
                                {recentMotors.map((m) => (
                                    <Link
                                        key={m.id}
                                        href={route('motors.show', m.id)}
                                        className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 hover:bg-emerald-50/50 border border-slate-200/60 hover:border-emerald-200 transition group"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-xl bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0 shadow-sm">
                                                {m.item.slice(0, 4)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-sm group-hover:text-emerald-700 flex items-center gap-2">
                                                    {m.item}
                                                    {m.label_ke && (
                                                        <span className="text-[10px] font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded">
                                                            Label {m.label_ke}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5">
                                                    Alamat: {m.alamat_motor || '-'} • {m.hp_kw || '-'} • {m.manufacture || 'MFG -'}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800">
                                                {m.checklists_count} Checklist
                                            </span>
                                        </div>
                                    </Link>
                                ))}

                                {recentMotors.length === 0 && (
                                    <p className="text-xs text-slate-500 text-center py-6">Belum ada data motor.</p>
                                )}
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-slate-100">
                            <Link
                                href={route('motors.create')}
                                className="w-full py-2.5 px-4 rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/50 text-slate-600 hover:text-emerald-700 text-xs font-bold flex items-center justify-center gap-2 transition"
                            >
                                <PlusCircle className="h-4 w-4" />
                                <span>Tambah Spesifikasi Motor Baru</span>
                            </Link>
                        </div>
                    </div>

                    {/* Right: Recent Checklists */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm flex flex-col justify-between">
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-teal-50 text-teal-700">
                                        <FileCheck className="h-4 w-4" />
                                    </div>
                                    <h3 className="font-extrabold text-slate-900 text-sm">Form Checklist Perbaikan Terakhir</h3>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {recentChecklists.map((c) => (
                                    <div
                                        key={c.id}
                                        className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-center justify-between gap-3 hover:border-teal-200 transition"
                                    >
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-xs font-bold text-slate-700">
                                                    {c.no_form || 'Form Checklist'}
                                                </span>
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                                    c.status_perbaikan === 'Selesai' 
                                                        ? 'bg-emerald-100 text-emerald-800' 
                                                        : 'bg-amber-100 text-amber-800'
                                                }`}>
                                                    {c.status_perbaikan}
                                                </span>
                                            </div>
                                            <div className="text-xs text-slate-600 font-semibold mt-1">
                                                Item Motor: {c.motor?.item} ({c.motor?.manufacture || 'MFG'})
                                            </div>
                                            <div className="text-[11px] text-slate-400 mt-0.5">
                                                Teknisi: {c.nama_teknisi || '-'} • Tgl: {c.tanggal_selesai || c.tanggal_masuk || '-'}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5 shrink-0">
                                            <Link
                                                href={route('checklists.show', c.id)}
                                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1 transition"
                                                title="Preview Dokumen A4"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                <span>A4 Preview</span>
                                            </Link>
                                        </div>
                                    </div>
                                ))}

                                {recentChecklists.length === 0 && (
                                    <p className="text-xs text-slate-500 text-center py-6">Belum ada form checklist yang dibuat.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* OCR Scanner Modal */}
            <OcrScannerModal
                isOpen={isOcrOpen}
                onClose={() => setIsOcrOpen(false)}
                onSelectResult={handleOcrResult}
            />
        </AuthenticatedLayout>
    );
}
