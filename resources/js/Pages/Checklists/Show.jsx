import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, usePage } from '@inertiajs/react';
import PupukKujangLogo from '@/Components/PupukKujangLogo';
import {
    Printer,
    Edit,
    ArrowLeft,
    Check,
    X,
    FileText
} from 'lucide-react';

export default function ChecklistsShow({ checklist, motor }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const printRef = useRef(null);

    const handlePrint = () => {
        window.print();
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 print:hidden">
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
                                    Preview Form Checklist (1 Lembar A4)
                                </h2>
                                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                                    Item: {motor.item}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Format tabel standar 1 halaman A4 Bengkel Listrik PT PUPUK KUJANG
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        {user.role === "admin" && (
                            <Link
                                href={route('checklists.edit', checklist.id)}
                                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                            >
                                <Edit className="h-4 w-4" />
                                <span>Edit Form</span>
                            </Link>
                        )}
                        <button
                            type="button"
                            onClick={handlePrint}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
                        >
                            <Printer className="h-4 w-4" />
                            <span>Cetak / Simpan PDF (1 Halaman)</span>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Form Checklist ${motor.item} - PT PUPUK KUJANG`} />

            {/* Print Stylesheet for Strictly 1-Page A4 Output */}
            <style>{`
                @page {
                    size: A4 portrait;
                    margin: 5mm 6mm;
                }
                @media print {
                    html, body {
                        background: white !important;
                        color: black !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        font-size: 8pt !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                    header, aside, nav, footer, .print\\:hidden {
                        display: none !important;
                    }
                    main {
                        padding: 0 !important;
                        margin: 0 !important;
                        max-width: 100% !important;
                        width: 100% !important;
                    }
                    .a4-container {
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        width: 100% !important;
                        max-width: 100% !important;
                        min-height: auto !important;
                        page-break-inside: avoid !important;
                        break-inside: avoid !important;
                    }
                    .print-table {
                        border-collapse: collapse !important;
                    }
                    .print-border {
                        border-color: #000 !important;
                    }
                }
            `}</style>

            <div className="max-w-4xl mx-auto my-3 flex flex-col items-center">
                {/* A4 Paper Container formatted fully as tabular document */}
                <div
                    ref={printRef}
                    className="a4-container w-full bg-white rounded-xl shadow-xl border border-slate-300 p-4 sm:p-6 text-slate-900 font-sans print:p-0 print:border-none print:shadow-none text-[10px] leading-tight"
                >
                    {/* TABEL 1: KOP HEADER DOKUMEN */}
                    <table className="w-full border-2 border-slate-900 mb-1 border-collapse">
                        <tbody>
                            <tr>
                                {/* Logo & Perusahaan */}
                                <td className="w-[28%] p-1.5 border-r border-slate-900 align-middle">
                                    <div className="flex items-center gap-2">
                                        <PupukKujangLogo showText={false} className="h-9 w-auto shrink-0" />
                                        <div className="leading-tight">
                                            <div className="text-[10px] font-black tracking-wider text-slate-950 uppercase">
                                                PT PUPUK KUJANG
                                            </div>
                                            <div className="text-[8px] font-bold text-emerald-800 uppercase tracking-tight">
                                                Pupuk Indonesia Grup
                                            </div>
                                            <div className="text-[8px] font-bold text-slate-600 uppercase">
                                                Departemen Pemeliharaan
                                            </div>
                                        </div>
                                    </div>
                                </td>

                                {/* Judul Form */}
                                <td className="p-1.5 border-r border-slate-900 text-center align-middle bg-slate-50/50">
                                    <div className="text-[11px] font-black uppercase tracking-wider text-slate-950">
                                        CHECKLIST PEMERIKSAAN & PERBAIKAN MOTOR LISTRIK
                                    </div>
                                    <div className="text-[9px] font-extrabold uppercase tracking-wide text-emerald-800 mt-0.5">
                                        SEKSI BENGKEL LISTRIK (ELECTRICAL WORKSHOP)
                                    </div>
                                </td>

                                {/* Info No. Form & Item */}
                                <td className="w-[26%] p-1.5 align-middle bg-slate-50 text-[9px]">
                                    <div className="grid grid-cols-3 gap-x-1">
                                        <span className="text-slate-500 font-semibold">No. Form:</span>
                                        <span className="col-span-2 font-bold font-mono text-slate-950 truncate">{checklist.no_form || '-'}</span>

                                        <span className="text-slate-500 font-semibold">Kode Item:</span>
                                        <span className="col-span-2 font-black font-mono text-emerald-800 text-[10px] truncate">{motor.item}</span>

                                        <span className="text-slate-500 font-semibold">Status:</span>
                                        <span className="col-span-2 font-bold text-slate-900">{checklist.status_perbaikan || 'Selesai'}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* TABEL 2: SPESIFIKASI MOTOR & DATA IDENTITAS */}
                    <table className="w-full border-x-2 border-b-2 border-slate-900 mb-1 border-collapse text-[9px]">
                        <thead>
                            <tr className="bg-slate-800 text-white font-bold uppercase text-[8.5px]">
                                <th colSpan={4} className="py-0.5 px-2 text-left tracking-wider">
                                    I. IDENTITAS DAN SPESIFIKASI MOTOR LISTRIK (NAMEPLATE)
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-300">
                                <td className="w-[18%] py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Nama Item / Tag</td>
                                <td className="w-[32%] py-0.5 px-2 font-bold font-mono text-slate-950 border-r border-slate-300">{motor.item}</td>
                                <td className="w-[18%] py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Daya (HP / kW)</td>
                                <td className="w-[32%] py-0.5 px-2 font-bold text-slate-950">{checklist.daya_spek || motor.hp_kw || '-'}</td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Label Ke / Alamat</td>
                                <td className="py-0.5 px-2 font-medium text-slate-900 border-r border-slate-300">
                                    Label: {motor.label_ke || '-'} | Alamat: {motor.alamat_motor || '-'}
                                </td>
                                <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Tegangan / Arus</td>
                                <td className="py-0.5 px-2 font-bold text-slate-950">
                                    {checklist.tegangan_spek || motor.voltage || '-'} / {checklist.ampere_spek || motor.ampere || '-'}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Manufacture / Frame</td>
                                <td className="py-0.5 px-2 font-medium text-slate-900 border-r border-slate-300">
                                    {motor.manufacture || '-'} / Frame: {motor.frame || '-'}
                                </td>
                                <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">RPM / Frequency</td>
                                <td className="py-0.5 px-2 font-bold text-slate-950">
                                    {checklist.rpm_spek || motor.rpm || '-'} / {motor.frequency || '50 Hz'}
                                </td>
                            </tr>
                            <tr className="border-b border-slate-300">
                                <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Area / Lokasi Lapangan</td>
                                <td className="py-0.5 px-2 font-medium text-slate-900 border-r border-slate-300 truncate max-w-[200px]">
                                    {checklist.area_lapangan || motor.area || '-'}
                                </td>
                                <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Tgl Masuk / Selesai</td>
                                <td className="py-0.5 px-2 font-medium text-slate-900">
                                    {checklist.tanggal_masuk || '-'} s/d {checklist.tanggal_selesai || '-'}
                                </td>
                            </tr>
                            {checklist.keluhan && (
                                <tr>
                                    <td className="py-0.5 px-2 bg-slate-100 font-semibold text-slate-700 border-r border-slate-300">Keluhan Lapangan</td>
                                    <td colSpan={3} className="py-0.5 px-2 italic text-slate-800 font-medium">
                                        {checklist.keluhan}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                    {/* TABEL 3: TAHAPAN PEKERJAAN DAN CHECKLIST (MAIN TABLE) */}
                    <table className="w-full border-2 border-slate-900 mb-1 border-collapse text-[9px]">
                        <thead>
                            <tr className="bg-slate-800 text-white font-extrabold uppercase text-[8.5px] border-b border-slate-900">
                                <th className="py-1 px-1 border-r border-slate-600 w-7 text-center">NO</th>
                                <th className="py-1 px-2 border-r border-slate-600 text-left">II. TAHAPAN PEKERJAAN & INSPEKSI</th>
                                <th className="py-1 px-1 border-r border-slate-600 w-11 text-center">CEK</th>
                                <th className="py-1 px-2 border-r border-slate-600 text-left w-[42%]">HASIL PENGUKURAN / KETERANGAN</th>
                                <th className="py-1 px-1 w-11 text-center">STATUS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {checklist.items?.map((section, sIdx) => (
                                <React.Fragment key={section.no || sIdx}>
                                    {/* Section Bar */}
                                    <tr className="bg-slate-200 font-extrabold text-slate-950 border-y border-slate-400">
                                        <td className="py-0.5 px-1 text-center border-r border-slate-400 font-mono text-[8.5px]">
                                            {section.no}
                                        </td>
                                        <td colSpan={4} className="py-0.5 px-2 uppercase tracking-wide text-[8.5px]">
                                            {section.section}
                                        </td>
                                    </tr>

                                    {/* Task Rows */}
                                    {section.tasks?.map((task, tIdx) => (
                                        <tr
                                            key={task.sub || tIdx}
                                            className="border-b border-slate-300/80 hover:bg-slate-50/50"
                                        >
                                            {/* Sub Number */}
                                            <td className="py-[2px] px-1 text-center border-r border-slate-300 font-mono font-bold text-slate-600 text-[8px]">
                                                {task.sub}
                                            </td>

                                            {/* Task Name */}
                                            <td className="py-[2px] px-2 border-r border-slate-300 font-medium text-slate-900 leading-tight">
                                                {task.task}
                                            </td>

                                            {/* Checkbox ✓ / ✗ */}
                                            <td className="py-[2px] px-1 border-r border-slate-300 text-center font-bold font-mono">
                                                {task.checked ? (
                                                    <span className="text-emerald-700 font-black">[ ✓ ]</span>
                                                ) : (
                                                    <span className="text-rose-600 font-black">[ ✗ ]</span>
                                                )}
                                            </td>

                                            {/* Notes / Keterangan */}
                                            <td className="py-[2px] px-2 border-r border-slate-300 text-slate-800 font-normal leading-tight">
                                                {task.notes || '-'}
                                            </td>

                                            {/* Status OK / NO */}
                                            <td className="py-[2px] px-1 text-center font-bold font-mono text-[8.5px]">
                                                <span className={`inline-block px-1 py-[1px] rounded text-[8px] font-black uppercase ${task.status === 'OK'
                                                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                                                    : 'bg-rose-100 text-rose-900 border border-rose-300'
                                                    }`}>
                                                    {task.status || 'OK'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>

                    {/* TABEL 4: CATATAN KESIMPULAN & PENGESAHAN / TANDA TANGAN */}
                    <table className="w-full border-2 border-slate-900 border-collapse text-[9px]">
                        <tbody>
                            <tr>
                                {/* Kolom Kiri: Catatan Hasil Akhir / Running Test */}
                                <td className="w-[52%] p-2 border-r-2 border-slate-900 align-top bg-slate-50/50">
                                    <div className="font-extrabold uppercase text-[8.5px] text-slate-900 mb-1 pb-0.5 border-b border-slate-300">
                                        III. CATATAN KESIMPULAN & HASIL RUNNING TEST
                                    </div>
                                    <div className="text-slate-800 text-[8.5px] leading-relaxed min-h-[50px] font-medium">
                                        {checklist.catatan_umum || 'Motor telah selesai dikerjakan sesuai standar bengkel listrik dan dinyatakan laik operasi.'}
                                    </div>
                                </td>

                                {/* Kolom Kanan: Pengesahan & Tanda Tangan */}
                                <td className="w-[48%] p-1.5 align-top">
                                    <div className="font-extrabold uppercase text-[8.5px] text-center text-slate-900 mb-1 pb-0.5 border-b border-slate-300">
                                        IV. PENGESAHAN BENGKEL LISTRIK
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-center text-[8.5px]">
                                        {/* Teknisi */}
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-slate-800 uppercase">TEKNISI PELAKSANA</span>
                                            <div className="h-10 w-28 my-0.5 border-b border-dashed border-slate-400 flex items-end justify-center pb-0.5 text-slate-300 text-[7.5px] italic">
                                                (Tanda Tangan)
                                            </div>
                                            <span className="font-extrabold text-slate-950 uppercase truncate max-w-[120px]">
                                                {checklist.nama_teknisi ? checklist.nama_teknisi.split(' - ')[0] : '( ....................... )'}
                                            </span>
                                            <span className="text-[7.5px] text-slate-500">
                                                Tgl: {checklist.tanggal_selesai || '.... / .... / 2026'}
                                            </span>
                                        </div>

                                        {/* Staf / Pengawas */}
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-slate-800 uppercase">STAF / PENGAWAS</span>
                                            <div className="h-10 w-28 my-0.5 border-b border-dashed border-slate-400 flex items-end justify-center pb-0.5 text-slate-300 text-[7.5px] italic">
                                                (Tanda Tangan)
                                            </div>
                                            <span className="font-extrabold text-slate-950 uppercase truncate max-w-[120px]">
                                                {checklist.nama_staf ? checklist.nama_staf.split(' - ')[0] : '( ....................... )'}
                                            </span>
                                            <span className="text-[7.5px] text-slate-500">
                                                Tgl: {checklist.tanggal_selesai || '.... / .... / 2026'}
                                            </span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Print Hint Card (Hidden on Print) */}
                <div className="w-full mt-3 p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between print:hidden text-xs">
                    <div className="flex items-center gap-2.5 text-slate-600">
                        <Printer className="h-4 w-4 text-emerald-600 shrink-0" />
                        <span>Formulir di atas telah dikompresi ke dalam <strong>format tabel terpadu</strong> dan dioptimasi agar <strong>presisi pas dalam 1 lembar A4</strong> saat dicetak atau disimpan sebagai PDF.</span>
                    </div>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition shrink-0"
                    >
                        Cetak Sekarang
                    </button>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

