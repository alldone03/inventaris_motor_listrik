import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePage } from '@inertiajs/react';
import {
    Zap,
    ArrowLeft,
    Edit,
    Trash2,
    FilePlus,
    FileCheck,
    Eye,
    CheckCircle2,
    Clock,
    Calendar,
    User,
    Wrench,
    Tag,
    Activity,
    Layers,
    MapPin,
    AlertCircle
} from 'lucide-react';

export default function MotorsShow({ motor }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const handleDeleteChecklist = (checklistId, formNo) => {
        if (confirm(`Hapus form checklist "${formNo || 'ini'}"?`)) {
            router.delete(route('checklists.destroy', checklistId));
        }
    };

    const handleDeleteMotor = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus data motor "${motor.item}" dan seluruh riwayat perbaikannya?`)) {
            router.delete(route('motors.destroy', motor.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('motors.index')}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                                    {motor.item}
                                </h2>
                                {motor.label_ke && (
                                    <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-bold border border-blue-200">
                                        Label Ke: {motor.label_ke}
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Alamat: {motor.alamat_motor || '-'} • Area: {motor.area || 'Pabrik Pupuk Kujang'}
                            </p>
                        </div>
                    </div>

                    {user.role === "admin" && (
                        <div className="flex items-center gap-2">
                            <Link
                                href={route('motors.checklists.create', motor.id)}
                                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
                            >
                                <FilePlus className="h-4 w-4" />
                                <span>Buat Form Checklist Baru</span>
                            </Link>
                            <Link
                                href={route('motors.edit', motor.id)}
                                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                                title="Edit Data Motor"
                            >
                                <Edit className="h-4 w-4" />
                            </Link>
                            <button
                                type="button"
                                onClick={handleDeleteMotor}
                                className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                                title="Hapus Motor"
                            >
                                <Trash2 className="h-4 w-4" />
                            </button>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={`Motor ${motor.item} - Bengkel Listrik Pupuk Kujang`} />

            <div className="space-y-8">
                {/* Specifications Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
                    <div className="p-6 bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400">
                                <Zap className="h-6 w-6" />
                            </div>
                            <div>
                                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Spesifikasi Nameplate Motor</span>
                                <h3 className="text-xl font-black">{motor.item} - {motor.manufacture || 'MFG'}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Item</span>
                                <span className="text-base font-black text-slate-900 font-mono">{motor.item}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Label Ke</span>
                                <span className="text-base font-bold text-slate-900">{motor.label_ke || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Alamat Motor</span>
                                <span className="text-base font-bold text-slate-900">{motor.alamat_motor || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">HP / kW</span>
                                <span className="text-base font-black text-emerald-700">{motor.hp_kw || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Voltage (V)</span>
                                <span className="text-base font-bold text-slate-900">{motor.voltage || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Ampere (A)</span>
                                <span className="text-base font-bold text-slate-900">{motor.ampere || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Frame</span>
                                <span className="text-base font-bold text-slate-900">{motor.frame || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">IP Rating</span>
                                <span className="text-base font-bold text-slate-900">{motor.ip_rating || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Frequency (Hz)</span>
                                <span className="text-base font-bold text-slate-900">{motor.frequency || '50 Hz'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Manufacture / MFG</span>
                                <span className="text-base font-bold text-slate-900">{motor.manufacture || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">RPM (Putaran)</span>
                                <span className="text-base font-bold text-slate-900">{motor.rpm || '-'}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Area Lapangan</span>
                                <span className="text-base font-bold text-slate-900">{motor.area || '-'}</span>
                            </div>
                        </div>

                        {motor.keterangan && (
                            <div className="mt-6 p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900">
                                <span className="font-bold uppercase tracking-wider block text-amber-800 mb-1">Keterangan:</span>
                                <p className="leading-relaxed whitespace-pre-wrap">{motor.keterangan}</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Checklists List Section */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                                <FileCheck className="h-5 w-5 text-emerald-600" />
                                Riwayat Form Checklist Perbaikan ({motor.checklists.length})
                            </h3>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Formulir tahapan pekerjaan bengkel listrik & dokumen verifikasi A4
                            </p>
                        </div>

                        {user.role === "admin" && (
                            <Link
                                href={route('motors.checklists.create', motor.id)}
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center gap-1.5 self-start sm:self-auto"
                            >
                                <FilePlus className="h-4 w-4" />
                                <span>Buat Form Checklist Baru</span>
                            </Link>
                        )}
                    </div>

                    <div className="space-y-4">
                        {motor.checklists.map((checklist) => (
                            <div
                                key={checklist.id}
                                className="p-5 rounded-2xl bg-slate-50 border border-slate-200/70 hover:border-emerald-300 hover:bg-emerald-50/20 transition flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                            >
                                <div className="space-y-1.5">
                                    <div className="flex items-center gap-2.5">
                                        <span className="font-mono text-sm font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-xs">
                                            {checklist.no_form || 'Form Checklist'}
                                        </span>
                                        <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${checklist.status_perbaikan === 'Selesai'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : 'bg-amber-100 text-amber-800'
                                            }`}>
                                            {checklist.status_perbaikan}
                                        </span>
                                        {checklist.tanggal_selesai && (
                                            <span className="text-xs text-slate-500 flex items-center gap-1">
                                                <Calendar className="h-3.5 w-3.5 text-slate-400" />
                                                {checklist.tanggal_selesai}
                                            </span>
                                        )}
                                    </div>

                                    {checklist.keluhan && (
                                        <p className="text-xs text-slate-600">
                                            <span className="font-semibold text-slate-700">Keluhan:</span> {checklist.keluhan}
                                        </p>
                                    )}

                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
                                        <span>Teknisi: <strong className="text-slate-800">{checklist.nama_teknisi || '-'}</strong></span>
                                        <span>•</span>
                                        <span>Staf Bengkel: <strong className="text-slate-800">{checklist.nama_staf || '-'}</strong></span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    <Link
                                        href={route('checklists.show', checklist.id)}
                                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition"
                                    >
                                        <Eye className="h-4 w-4" />
                                        <span>Lihat Format A4</span>
                                    </Link>
                                    {user.role === "admin" && (
                                        <Link
                                            href={route('checklists.edit', checklist.id)}
                                            className="p-2 rounded-xl bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition"
                                            title="Edit Checklist"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Link>
                                    )}
                                    {user.role === "admin" && (
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteChecklist(checklist.id, checklist.no_form)}
                                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                                            title="Hapus Checklist"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    )}

                                </div>
                            </div>
                        ))}

                        {motor.checklists.length === 0 && (
                            <div className="text-center py-10 border-2 border-dashed border-slate-200 rounded-2xl">
                                <FileCheck className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                                <p className="text-sm font-semibold text-slate-700">Belum ada formulir checklist perbaikan untuk motor ini.</p>
                                <p className="text-xs text-slate-400 mt-0.5 mb-4">Buat form checklist pertama dengan 7 tahapan pekerjaan standar.</p>
                                <Link
                                    href={route('motors.checklists.create', motor.id)}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition"
                                >
                                    <FilePlus className="h-4 w-4" />
                                    <span>Buat Form Checklist Baru</span>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
