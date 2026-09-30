import React, { useRef } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import PupukKujangLogo from '@/Components/PupukKujangLogo';
import { 
    Printer, 
    Edit, 
    ArrowLeft, 
    Check, 
    X, 
    Download,
    Share2,
    Calendar,
    UserCheck,
    Wrench,
    FileText
} from 'lucide-react';

export default function ChecklistsShow({ checklist, motor }) {
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
                                    Preview Dokumen Form Checklist (A4)
                                </h2>
                                <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-xs font-bold border border-emerald-300">
                                    Item: {motor.item}
                                </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Format standar cetak A4 Bengkel Listrik PT PUPUK KUJANG
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                        <Link
                            href={route('checklists.edit', checklist.id)}
                            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition flex items-center gap-1.5"
                        >
                            <Edit className="h-4 w-4" />
                            <span>Edit Form</span>
                        </Link>

                        <button
                            type="button"
                            onClick={handlePrint}
                            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
                        >
                            <Printer className="h-4 w-4" />
                            <span>Cetak Dokumen A4 / Simpan PDF</span>
                        </button>
                    </div>
                </div>
            }
        >
            <Head title={`Form Checklist ${motor.item} - PT PUPUK KUJANG`} />

            {/* Print Stylesheet */}
            <style>{`
                @media print {
                    body {
                        background: white !important;
                        color: black !important;
                        margin: 0 !important;
                        padding: 0 !important;
                    }
                    header, aside, nav, footer, .print\\:hidden {
                        display: none !important;
                    }
                    main {
                        padding: 0 !important;
                        margin: 0 !important;
                        max-width: 100% !important;
                    }
                    .a4-container {
                        box-shadow: none !important;
                        border: none !important;
                        margin: 0 !important;
                        padding: 10mm 12mm !important;
                        width: 100% !important;
                        max-width: 100% !important;
                    }
                    .page-break {
                        page-break-after: always;
                    }
                }
            `}</style>

            <div className="max-w-4xl mx-auto my-4 flex flex-col items-center">
                {/* A4 Paper Container */}
                <div 
                    ref={printRef}
                    className="a4-container w-full bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-300/80 p-6 sm:p-10 text-slate-900 font-sans print:p-0 print:border-none print:shadow-none"
                    style={{ minHeight: '297mm' }}
                >
                    {/* A4 HEADER */}
                    <div className="border-b-2 border-slate-900 pb-4 mb-4">
                        <div className="grid grid-cols-12 gap-2 items-center">
                            {/* Logo Kiri */}
                            <div className="col-span-3 flex items-center">
                                <PupukKujangLogo showText={false} className="h-14 w-auto" />
                                <div className="ml-2 leading-tight hidden sm:block">
                                    <div className="text-[11px] font-black tracking-wider text-slate-900 uppercase">
                                        PUPUK KUJANG
                                    </div>
                                    <div className="text-[9px] font-semibold text-emerald-700 uppercase tracking-tighter">
                                        Pupuk Indonesia
                                    </div>
                                </div>
                            </div>

                            {/* Judul Tengah */}
                            <div className="col-span-6 text-center">
                                <h1 className="text-base sm:text-lg font-black tracking-wider uppercase text-slate-900 font-sans">
                                    PT PUPUK KUJANG
                                </h1>
                                <h2 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-slate-800 underline decoration-slate-900 decoration-1 underline-offset-2">
                                    FORM CHECKLIST PERBAIKAN MOTOR LISTRIK
                                </h2>
                                <h3 className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-800 mt-0.5">
                                    BENGKEL LISTRIK
                                </h3>
                            </div>

                            {/* Kotak Item Kanan */}
                            <div className="col-span-3 flex justify-end">
                                <div className="border-2 border-slate-900 rounded-lg p-2 bg-slate-50/50 text-right w-full max-w-[170px] shadow-xs">
                                    <div className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">
                                        KODE ITEM
                                    </div>
                                    <div className="text-sm sm:text-base font-black font-mono text-slate-950 tracking-tight">
                                        {motor.item}
                                    </div>
                                    <div className="text-[9px] font-bold text-slate-600 mt-0.5 truncate">
                                        Label: {motor.label_ke || '-'} | Alm: {motor.alamat_motor || '-'}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Specifications & Work Order Info */}
                    <div className="border border-slate-300 rounded-lg p-3 bg-slate-50/70 mb-4 text-[11px] leading-tight">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <div>
                                <span className="text-slate-500 font-semibold block text-[10px]">No. Dokumen Form:</span>
                                <span className="font-bold font-mono text-slate-900">{checklist.no_form || '-'}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 font-semibold block text-[10px]">Daya / Tegangan:</span>
                                <span className="font-bold text-slate-900">{motor.hp_kw || '-'} / {motor.voltage || '-'}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 font-semibold block text-[10px]">Tgl Masuk:</span>
                                <span className="font-bold text-slate-900">{checklist.tanggal_masuk || '-'}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 font-semibold block text-[10px]">Tgl Selesai:</span>
                                <span className="font-bold text-slate-900">{checklist.tanggal_selesai || '-'}</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 pt-2 border-t border-slate-200">
                            <div>
                                <span className="text-slate-500 font-semibold block text-[10px]">Manufacture / MFG:</span>
                                <span className="font-bold text-slate-900">{motor.manufacture || '-'}</span>
                            </div>
                            <div>
                                <span className="text-slate-500 font-semibold block text-[10px]">Ampere / RPM:</span>
                                <span className="font-bold text-slate-900">{motor.ampere || '-'} / {motor.rpm || '-'}</span>
                            </div>
                            <div className="col-span-2">
                                <span className="text-slate-500 font-semibold block text-[10px]">Area / Lokasi di Lapangan:</span>
                                <span className="font-bold text-slate-900 truncate block">{checklist.area_lapangan || motor.area || '-'}</span>
                            </div>
                        </div>

                        {checklist.keluhan && (
                            <div className="mt-2 pt-2 border-t border-slate-200">
                                <span className="text-slate-500 font-semibold text-[10px]">Keluhan Lapangan: </span>
                                <span className="font-medium text-slate-800 italic">{checklist.keluhan}</span>
                            </div>
                        )}
                    </div>

                    {/* CHECKLIST TABLE */}
                    <div className="border border-slate-900 rounded-lg overflow-hidden mb-5">
                        <table className="w-full text-left text-[11px] border-collapse">
                            <thead>
                                <tr className="bg-slate-100 text-slate-900 border-b border-slate-900 font-extrabold uppercase text-[10px]">
                                    <th className="py-2 px-2 border-r border-slate-900 w-10 text-center">NO</th>
                                    <th className="py-2 px-3 border-r border-slate-900">TAHAPAN PEKERJAAN</th>
                                    <th className="py-2 px-2 border-r border-slate-900 w-24 text-center">CHECKLIST</th>
                                    <th className="py-2 px-3 border-r border-slate-900">KETERANGAN</th>
                                    <th className="py-2 px-2 w-20 text-center">STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                {checklist.items?.map((section, sIdx) => (
                                    <React.Fragment key={section.no || sIdx}>
                                        {/* Section Header Row */}
                                        <tr className="bg-slate-200/90 font-black border-b border-slate-400 text-slate-950">
                                            <td className="py-1.5 px-2 text-center border-r border-slate-900 font-mono">
                                                {section.no}
                                            </td>
                                            <td colSpan={4} className="py-1.5 px-3 uppercase tracking-wider font-extrabold">
                                                {section.section}
                                            </td>
                                        </tr>

                                        {/* Tasks Rows */}
                                        {section.tasks?.map((task, tIdx) => (
                                            <tr 
                                                key={task.sub || tIdx}
                                                className="border-b border-slate-300 hover:bg-slate-50/50"
                                            >
                                                {/* Sub No */}
                                                <td className="py-1.5 px-2 text-center border-r border-slate-900 font-mono font-bold text-slate-600">
                                                    {task.sub}
                                                </td>

                                                {/* Task Name */}
                                                <td className="py-1.5 px-3 border-r border-slate-900 font-medium text-slate-900">
                                                    {task.task}
                                                </td>

                                                {/* Checklist (Centang / Silang) */}
                                                <td className="py-1.5 px-2 border-r border-slate-900 text-center whitespace-nowrap">
                                                    {task.checked ? (
                                                        <span className="inline-flex items-center gap-1 font-black text-emerald-800 font-mono text-xs">
                                                            <Check className="h-4 w-4 stroke-[3] text-emerald-600 inline" />
                                                            <span>[ ✓ ]</span>
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 font-black text-rose-700 font-mono text-xs">
                                                            <X className="h-4 w-4 stroke-[3] text-rose-600 inline" />
                                                            <span>[ ✗ ]</span>
                                                        </span>
                                                    )}
                                                </td>

                                                {/* Keterangan Boxed */}
                                                <td className="py-1.5 px-2 border-r border-slate-900">
                                                    <div className="border border-slate-300 rounded px-2 py-0.5 min-h-[22px] bg-white font-normal text-slate-800 text-[10.5px]">
                                                        {task.notes || '-'}
                                                    </div>
                                                </td>

                                                {/* Status OK / NO */}
                                                <td className="py-1.5 px-2 text-center font-black">
                                                    <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                                        task.status === 'OK' 
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
                    </div>

                    {/* Catatan Kesimpulan Akhir */}
                    {checklist.catatan_umum && (
                        <div className="border border-slate-300 rounded-lg p-2.5 bg-slate-50 mb-6 text-[11px]">
                            <span className="font-bold text-slate-900 block mb-0.5">Catatan Umum / Hasil Running Test:</span>
                            <p className="text-slate-700">{checklist.catatan_umum}</p>
                        </div>
                    )}

                    {/* APPROVAL SECTION FOOTER */}
                    <div className="mt-6 pt-4 border-t-2 border-slate-900">
                        <div className="text-[11px] font-bold text-center text-slate-700 mb-4 uppercase tracking-wider">
                            PENGESAHAN & PERSETUJUAN PERBAIKAN MOTOR LISTRIK
                        </div>

                        <div className="grid grid-cols-2 gap-8 text-center text-[11px]">
                            {/* Teknisi Bengkel Listrik (Kiri) */}
                            <div className="flex flex-col items-center">
                                <span className="font-extrabold uppercase text-slate-900 block">
                                    TEKNISI BENGKEL LISTRIK
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">Pelaksana Perbaikan</span>
                                
                                {/* Signature Space */}
                                <div className="h-20 w-44 my-2 border-b border-dashed border-slate-400 flex items-center justify-center text-slate-300 italic text-[10px]">
                                    (Tanda Tangan)
                                </div>

                                <div className="font-bold text-slate-900 uppercase">
                                    {checklist.nama_teknisi ? `( ${checklist.nama_teknisi} )` : '( ........................................ )'}
                                </div>
                                <span className="text-[9px] text-slate-400 mt-0.5">
                                    Tanggal: {checklist.tanggal_selesai || '.... / .... / 2026'}
                                </span>
                            </div>

                            {/* Staf Bengkel Listrik (Kanan) */}
                            <div className="flex flex-col items-center">
                                <span className="font-extrabold uppercase text-slate-900 block">
                                    STAF BENGKEL LISTRIK
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">Verifikator & Pengawas</span>
                                
                                {/* Signature Space */}
                                <div className="h-20 w-44 my-2 border-b border-dashed border-slate-400 flex items-center justify-center text-slate-300 italic text-[10px]">
                                    (Tanda Tangan)
                                </div>

                                <div className="font-bold text-slate-900 uppercase">
                                    {checklist.nama_staf ? `( ${checklist.nama_staf} )` : '( ........................................ )'}
                                </div>
                                <span className="text-[9px] text-slate-400 mt-0.5">
                                    Tanggal: {checklist.tanggal_selesai || '.... / .... / 2026'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Print Hint Card */}
                <div className="w-full mt-4 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-between print:hidden">
                    <div className="flex items-center gap-2.5 text-xs text-slate-600">
                        <Printer className="h-4 w-4 text-emerald-600" />
                        <span>Gunakan opsi <strong>"Save as PDF"</strong> atau pilih printer Anda pada dialog cetak. Dokumen dirancang presisi untuk ukuran kertas <strong>A4</strong>.</span>
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
