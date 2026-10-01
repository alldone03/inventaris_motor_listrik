import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import OcrScannerModal from '@/Components/OcrScannerModal';
import {
    Zap,
    Search,
    Camera,
    PlusCircle,
    Eye,
    Edit,
    Trash2,
    FilePlus,
    FileText,
    Layers,
    Filter,
    X,
    Sparkles,
    CheckCircle2,
    Info,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';

export default function MotorsIndex({ motors, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [isOcrOpen, setIsOcrOpen] = useState(false);
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('motors.index'), { search }, { preserveState: true, replace: true });
    };

    const handleClearSearch = () => {
        setSearch('');
        router.get(route('motors.index'), {}, { preserveState: true, replace: true });
    };

    const handleOcrResult = (extractedCode) => {
        setSearch(extractedCode);
        router.get(route('motors.index'), { search: extractedCode }, { preserveState: true, replace: true });
    };

    const handleDelete = (id, itemCode) => {
        if (confirm(`Apakah Anda yakin ingin menghapus data motor "${itemCode}" dan seluruh form checklist terkait?`)) {
            router.delete(route('motors.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                <Zap className="h-6 w-6" />
                            </span>
                            Daftar Spesifikasi Motor Listrik
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Kelola data inventaris, spesifikasi teknis nameplate, dan form checklist perbaikan motor.
                        </p>
                    </div>

                    {user.role === "admin" && (
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
                    )}
                </div>
            }
        >
            <Head title="Daftar Motor - Bengkel Listrik Pupuk Kujang" />

            <div className="space-y-6">
                {/* Search & Filter Bar */}
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari Kode Item, Label Ke, Alamat, Daya, Merk TECO/SIEMENS..."
                                className="w-full pl-10 pr-10 py-2.5 bg-slate-50 hover:bg-slate-100/80 focus:bg-white text-slate-900 rounded-xl text-xs sm:text-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                            />
                            {search && (
                                <button
                                    type="button"
                                    onClick={handleClearSearch}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition shrink-0"
                        >
                            Cari
                        </button>

                        <button
                            type="button"
                            onClick={() => setIsOcrOpen(true)}
                            className="px-3.5 py-2.5 bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-xs rounded-xl border border-teal-200 transition shrink-0 flex items-center gap-1.5"
                            title="Pindai OCR Nameplate"
                        >
                            <Camera className="h-4 w-4 text-teal-600" />
                            <span className="hidden sm:inline">OCR</span>
                        </button>
                    </form>

                    <div className="text-xs text-slate-500 font-medium shrink-0 flex items-center gap-2">
                        <span>Menampilkan</span>
                        <span className="font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded-md">
                            {motors.total} motor
                        </span>
                    </div>
                </div>

                {/* Motors Table List */}
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs">
                            <thead>
                                <tr className="bg-slate-900 text-slate-200 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider">
                                    <th className="py-3.5 px-4">Label & Item</th>
                                    <th className="py-3.5 px-3">Alamat</th>
                                    <th className="py-3.5 px-3">Daya (HP/kW)</th>
                                    <th className="py-3.5 px-3">Voltage & Ampere</th>
                                    <th className="py-3.5 px-3">Frame & IP</th>
                                    <th className="py-3.5 px-3">Freq & MFG</th>
                                    <th className="py-3.5 px-4">Keterangan</th>
                                    <th className="py-3.5 px-3 text-center">Checklists</th>
                                    {user.role === "admin" && (<th className="py-3.5 px-4 text-center">Aksi</th>)}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                                {motors.data.map((motor) => (
                                    <tr
                                        key={motor.id}
                                        className="hover:bg-emerald-50/40 transition group"
                                    >
                                        {/* Item & Label */}
                                        <td className="py-3.5 px-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2">
                                                {motor.label_ke && (
                                                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">
                                                        Label: {motor.label_ke}
                                                    </span>
                                                )}
                                                <div className="font-mono font-black text-slate-900 text-sm bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200 group-hover:border-emerald-300 group-hover:bg-emerald-50 text-emerald-950">
                                                    {motor.item}
                                                </div>

                                            </div>
                                        </td>

                                        {/* Alamat Motor */}
                                        <td className="py-3.5 px-3 whitespace-nowrap">
                                            <span className="font-semibold text-slate-900">
                                                {motor.alamat_motor || '-'}
                                            </span>
                                        </td>

                                        {/* HP / kW */}
                                        <td className="py-3.5 px-3 whitespace-nowrap">
                                            <span className="font-bold text-slate-800">
                                                {motor.hp_kw || '-'}
                                            </span>
                                            {motor.rpm && (
                                                <div className="text-[10px] text-slate-400 font-normal">
                                                    {motor.rpm}
                                                </div>
                                            )}
                                        </td>

                                        {/* Voltage & Ampere */}
                                        <td className="py-3.5 px-3 whitespace-nowrap">
                                            <div>{motor.voltage || '-'}</div>
                                            <div className="text-[10px] text-slate-500 font-semibold">{motor.ampere || '-'}</div>
                                        </td>

                                        {/* Frame & IP Rating */}
                                        <td className="py-3.5 px-3 whitespace-nowrap">
                                            <div>Frame: {motor.frame || '-'}</div>
                                            <div className="text-[10px] text-slate-500">IP: {motor.ip_rating || '-'}</div>
                                        </td>

                                        {/* Freq & Manufacture */}
                                        <td className="py-3.5 px-3 whitespace-nowrap">
                                            <div className="font-bold text-slate-900">{motor.manufacture || '-'}</div>
                                            <div className="text-[10px] text-slate-500">{motor.frequency || '50 Hz'}</div>
                                        </td>

                                        {/* Keterangan */}
                                        <td className="py-3.5 px-4 max-w-xs break-words whitespace-normal text-slate-500" title={motor.keterangan || ''}>
                                            {motor.keterangan || '-'}
                                        </td>

                                        {/* Checklist count badge */}
                                        <td className="py-3.5 px-3 text-center whitespace-nowrap">
                                            <Link
                                                href={route('motors.show', motor.id)}
                                                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold hover:bg-emerald-200 transition text-[11px]"
                                            >
                                                <FileText className="h-3 w-3" />
                                                <span>{motor.checklists_count || 0}</span>
                                            </Link>
                                        </td>

                                        {/* Actions */}
                                        {user.role === "admin" && (
                                            <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                                <div className="flex items-center justify-center gap-1.5">
                                                    {/* Add Checklist Form */}
                                                    <Link
                                                        href={route('motors.checklists.create', motor.id)}
                                                        className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-600 hover:text-white transition"
                                                        title="Buat Form Checklist Perbaikan Baru"
                                                    >
                                                        <FilePlus className="h-4 w-4" />
                                                    </Link>

                                                    {/* View Detail Motor */}
                                                    <Link
                                                        href={route('motors.show', motor.id)}
                                                        className="p-1.5 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white transition"
                                                        title="Lihat Detail & Riwayat Form"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Link>

                                                    {/* Edit Motor */}
                                                    <Link
                                                        href={route('motors.edit', motor.id)}
                                                        className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition"
                                                        title="Edit Data Motor"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Link>

                                                    {/* Delete Motor */}
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(motor.id, motor.item)}
                                                        className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white transition"
                                                        title="Hapus Motor"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}

                                {motors.data.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <Info className="h-8 w-8 text-slate-300" />
                                                <span className="font-semibold text-slate-600">Tidak ada data motor yang cocok dengan kriteria pencarian.</span>
                                                <button
                                                    type="button"
                                                    onClick={handleClearSearch}
                                                    className="text-xs text-emerald-600 font-bold hover:underline"
                                                >
                                                    Reset Pencarian
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {motors.links && motors.links.length > 3 && (
                        <div className="p-4 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs text-slate-500">
                                Menampilkan {motors.from || 0} - {motors.to || 0} dari {motors.total} data
                            </span>
                            <div className="flex gap-1">
                                {motors.links.map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url || '#'}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${link.active
                                            ? 'bg-emerald-600 text-white'
                                            : link.url
                                                ? 'bg-slate-50 hover:bg-slate-100 text-slate-700'
                                                : 'text-slate-300 pointer-events-none'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
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
