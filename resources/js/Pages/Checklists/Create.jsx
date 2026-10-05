import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { 
    FileCheck, 
    ArrowLeft, 
    Save, 
    Check, 
    X, 
    Plus, 
    Trash2, 
    Layers, 
    Calendar, 
    User, 
    Wrench,
    CheckCircle2,
    XCircle,
    HelpCircle
} from 'lucide-react';

export default function ChecklistsCreate({ motor, defaultTemplate, suggestedFormNo, approvers = [] }) {
    const { data, setData, post, processing, errors } = useForm({
        no_form: suggestedFormNo || '',
        tanggal_masuk: new Date().toISOString().split('T')[0],
        tanggal_selesai: new Date().toISOString().split('T')[0],
        area_lapangan: motor.area || (motor.alamat_motor ? `Alamat: ${motor.alamat_motor}` : ''),
        keluhan: '',
        daya_spek: motor.hp_kw || '',
        tegangan_spek: motor.voltage || '',
        ampere_spek: motor.ampere || '',
        rpm_spek: motor.rpm || '',
        nama_teknisi: '',
        nama_staf: '',
        tanggal_approval_teknisi: new Date().toISOString().split('T')[0],
        tanggal_approval_staf: new Date().toISOString().split('T')[0],
        status_perbaikan: 'Selesai',
        items: defaultTemplate || [],
        catatan_umum: '',
    });

    const handleTaskChange = (sectionIdx, taskIdx, field, value) => {
        const newItems = [...data.items];
        newItems[sectionIdx].tasks[taskIdx][field] = value;
        setData('items', newItems);
    };

    const toggleCheck = (sectionIdx, taskIdx) => {
        const newItems = [...data.items];
        newItems[sectionIdx].tasks[taskIdx].checked = !newItems[sectionIdx].tasks[taskIdx].checked;
        setData('items', newItems);
    };

    const toggleStatus = (sectionIdx, taskIdx, currentStatus) => {
        const nextStatus = currentStatus === 'OK' ? 'NO' : 'OK';
        handleTaskChange(sectionIdx, taskIdx, 'status', nextStatus);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('motors.checklists.store', motor.id));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route('motors.show', motor.id)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Link>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                    Form Checklist Perbaikan Motor Listrik
                                </h2>
                                <span className="px-2.5 py-0.5 rounded-lg bg-slate-900 text-white font-mono font-bold text-xs">
                                    Item: {motor.item}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Isi 7 tahapan pekerjaan bengkel listrik & verifikasi status OK/NO
                            </p>
                        </div>
                    </div>
                </div>
            }
        >
            <Head title={`Buat Checklist ${motor.item} - Bengkel Listrik Pupuk Kujang`} />

            <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto">
                {/* Header Information Card */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <FileCheck className="h-4 w-4 text-emerald-600" />
                        Informasi Umum Dokumen & Identitas Motor
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                        {/* No Form */}
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Nomor Form / Dokumen</label>
                            <input
                                type="text"
                                value={data.no_form}
                                onChange={(e) => setData('no_form', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-bold focus:bg-white focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Tanggal Masuk */}
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Tanggal Masuk</label>
                            <input
                                type="date"
                                value={data.tanggal_masuk}
                                onChange={(e) => setData('tanggal_masuk', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Tanggal Selesai */}
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Tanggal Selesai</label>
                            <input
                                type="date"
                                value={data.tanggal_selesai}
                                onChange={(e) => setData('tanggal_selesai', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:bg-white focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        {/* Status Perbaikan */}
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Status Perbaikan</label>
                            <select
                                value={data.status_perbaikan}
                                onChange={(e) => setData('status_perbaikan', e.target.value)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500"
                            >
                                <option value="Selesai">Selesai (Lolos Test)</option>
                                <option value="Dalam Proses">Dalam Proses Pengerjaan</option>
                                <option value="Menunggu Sparepart">Menunggu Sparepart</option>
                                <option value="Draft">Draft</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Area Lapangan</label>
                            <input
                                type="text"
                                value={data.area_lapangan}
                                onChange={(e) => setData('area_lapangan', e.target.value)}
                                placeholder="Area 25 Pabrik..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block font-bold text-slate-700 mb-1">Keluhan di Lapangan</label>
                            <input
                                type="text"
                                value={data.keluhan}
                                onChange={(e) => setData('keluhan', e.target.value)}
                                placeholder="Contoh: Suara berisik bearing, getaran tinggi..."
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Checklist Sections 1 - 7 */}
                <div className="space-y-6">
                    {data.items.map((section, sIdx) => (
                        <div
                            key={section.no}
                            className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden"
                        >
                            {/* Section Header */}
                            <div className="bg-slate-900 px-6 py-3.5 text-white flex items-center justify-between">
                                <div className="flex items-center gap-2.5">
                                    <span className="h-6 w-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">
                                        {section.no}
                                    </span>
                                    <h4 className="font-bold text-sm tracking-wide">
                                        {section.section}
                                    </h4>
                                </div>
                                <span className="text-[11px] text-slate-400 font-medium">
                                    {section.tasks.length} Butir Pekerjaan
                                </span>
                            </div>

                            {/* Tasks Table */}
                            <div className="p-4 sm:p-6 overflow-x-auto">
                                <table className="w-full text-left text-xs border-collapse">
                                    <thead>
                                        <tr className="border-b border-slate-200 text-slate-400 uppercase text-[10px] font-bold">
                                            <th className="py-2 px-2 w-12 text-center">No</th>
                                            <th className="py-2 px-3">Tahapan Pekerjaan</th>
                                            <th className="py-2 px-3 text-center w-28">Checklist</th>
                                            <th className="py-2 px-3">Keterangan / Hasil Ukur</th>
                                            <th className="py-2 px-3 text-center w-28">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {section.tasks.map((task, tIdx) => (
                                            <tr key={task.sub || tIdx} className="hover:bg-slate-50/80 transition">
                                                {/* No Sub */}
                                                <td className="py-3 px-2 text-center font-bold text-slate-400 font-mono">
                                                    {task.sub}
                                                </td>

                                                {/* Task Title */}
                                                <td className="py-3 px-3 font-semibold text-slate-800 text-xs sm:text-sm">
                                                    {task.task}
                                                </td>

                                                {/* Checklist Check / Cross Toggle */}
                                                <td className="py-3 px-3 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleCheck(sIdx, tIdx)}
                                                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                                                            task.checked
                                                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 shadow-xs'
                                                                : 'bg-rose-100 text-rose-800 border border-rose-300'
                                                        }`}
                                                        title="Klik untuk ubah Centang / Silang"
                                                    >
                                                        {task.checked ? (
                                                            <>
                                                                <Check className="h-4 w-4 text-emerald-600 stroke-[3]" />
                                                                <span>Centang</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <X className="h-4 w-4 text-rose-600 stroke-[3]" />
                                                                <span>Silang</span>
                                                            </>
                                                        )}
                                                    </button>
                                                </td>

                                                {/* Keterangan Textbox */}
                                                <td className="py-3 px-3">
                                                    <input
                                                        type="text"
                                                        value={task.notes || ''}
                                                        onChange={(e) => handleTaskChange(sIdx, tIdx, 'notes', e.target.value)}
                                                        placeholder="Tulis keterangan..."
                                                        className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                                    />
                                                </td>

                                                {/* Status OK / NO Selector */}
                                                <td className="py-3 px-3 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleStatus(sIdx, tIdx, task.status)}
                                                        className={`px-3 py-1.5 rounded-xl font-black text-xs transition ${
                                                            task.status === 'OK'
                                                                ? 'bg-emerald-600 text-white shadow-sm'
                                                                : 'bg-rose-600 text-white shadow-sm'
                                                        }`}
                                                        title="Klik untuk ubah status OK / NO"
                                                    >
                                                        {task.status || 'OK'}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Approval & Signatures Section */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm p-6 sm:p-8">
                    <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <User className="h-4 w-4 text-emerald-600" />
                        Persetujuan & Pengesahan Bengkel Listrik
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Teknisi (Left) */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                            <div className="flex items-center gap-2">
                                <Wrench className="h-4 w-4 text-emerald-600" />
                                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                                    Teknisi Bengkel Listrik (Sebelah Kiri)
                                </h4>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Lengkap Teknisi</label>
                                <select
                                    value={data.nama_teknisi}
                                    onChange={(e) => setData('nama_teknisi', e.target.value)}
                                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">-- Pilih Teknisi --</option>
                                    {approvers.map(a => (
                                        <option key={a.id} value={`${a.nama} - ${a.jabatan}`}>{a.nama} - {a.jabatan}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1">Tanggal Disetujui</label>
                                <input
                                    type="date"
                                    value={data.tanggal_approval_teknisi}
                                    onChange={(e) => setData('tanggal_approval_teknisi', e.target.value)}
                                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>

                        {/* Staf (Right) */}
                        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                            <div className="flex items-center gap-2">
                                <User className="h-4 w-4 text-teal-600" />
                                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-800">
                                    Staf Bengkel Listrik (Sebelah Kanan)
                                </h4>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">Nama Lengkap Staf / Supervisor</label>
                                <select
                                    value={data.nama_staf}
                                    onChange={(e) => setData('nama_staf', e.target.value)}
                                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                                >
                                    <option value="">-- Pilih Staf/Supervisor --</option>
                                    {approvers.map(a => (
                                        <option key={a.id} value={`${a.nama} - ${a.jabatan}`}>{a.nama} - {a.jabatan}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mt-2">
                                <label className="block text-xs font-bold text-slate-600 mb-1">Tanggal Disetujui</label>
                                <input
                                    type="date"
                                    value={data.tanggal_approval_staf}
                                    onChange={(e) => setData('tanggal_approval_staf', e.target.value)}
                                    className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Catatan Umum */}
                    <div className="mt-6">
                        <label className="block text-xs font-bold text-slate-700 mb-1">Catatan Kesimpulan / Rekomendasi Akhir</label>
                        <textarea
                            value={data.catatan_umum}
                            onChange={(e) => setData('catatan_umum', e.target.value)}
                            rows={3}
                            placeholder="Catatan hasil pengetesan akhir, kondisi rotor, kesiapan pasang di lapangan..."
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:bg-white focus:ring-2 focus:ring-emerald-500"
                        />
                    </div>
                </div>

                {/* Form Action Buttons */}
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm sticky bottom-4 z-20">
                    <Link
                        href={route('motors.show', motor.id)}
                        className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
                    >
                        Batal
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        <Save className="h-4 w-4" />
                        <span>Simpan & Buka Format Preview A4</span>
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
