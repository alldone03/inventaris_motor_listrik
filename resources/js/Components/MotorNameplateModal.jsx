import React, { useRef } from 'react';
import { Printer, X, Tag } from 'lucide-react';

export default function MotorNameplateModal({ isOpen, onClose, motor }) {
    const printAreaRef = useRef(null);

    if (!isOpen || !motor) return null;

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4">
            {/* Modal Dialog */}
            <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-5 border-b border-slate-100 bg-slate-50/70">
                    <div className="flex items-center gap-2.5">
                        <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                            <Tag className="h-5 w-5" />
                        </span>
                        <div>
                            <h3 className="font-bold text-slate-900 text-base">Cetak Name Plate Motor</h3>
                            <p className="text-xs text-slate-500">Ukuran Laser 8,5 cm x 5 cm (3 Kolom)</p>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body / Preview */}
                <div className="p-6 flex flex-col items-center bg-slate-100/60">
                    <div className="text-xs text-slate-500 mb-3 font-medium">
                        Preview Fisik (Rasio Skala 8.5 cm x 5 cm):
                    </div>

                    {/* Outer card showing real-world proportional preview */}
                    <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-200 w-full flex justify-center">
                        {/* The exact 8.5cm x 5cm Printable Tag */}
                        <div
                            id="printable-nameplate"
                            ref={printAreaRef}
                            style={{
                                width: '8.5cm',
                                height: '5cm',
                                boxSizing: 'border-box',
                            }}
                            className="bg-white border-2 border-black p-2 flex flex-col justify-between text-black font-sans select-none overflow-hidden"
                        >
                            {/* Header Tag */}
                            <div className="border-b-2 border-black pb-1 mb-1 flex items-center justify-between">
                                <div>
                                    <div className="text-[11px] font-black uppercase tracking-wider leading-none">
                                        PT PUPUK KUJANG CIKAMPEK
                                    </div>
                                    <div className="text-[8px] font-bold text-slate-700 tracking-tight leading-tight mt-0.5">
                                        BAGIAN BENGKEL LISTRIK - NAMEPLATE MOTOR
                                    </div>
                                </div>
                                {/* <div className="text-right">
                                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 border border-black rounded">
                                        INVENTARIS
                                    </span>
                                </div> */}
                                {/* <img src="/images/logo-pkc.jpg" alt="Logo" className="h-12" /> */}
                            </div>

                            {/* 3-Column Content Layout */}
                            <div className="grid grid-cols-3 gap-1.5 flex-1 items-stretch text-[9px] leading-tight">
                                {/* KOLOM 1: LABEL KE (Ukuran 2-3 kali lipat lebih besar) */}
                                <div className="border-r border-black pr-1.5 flex flex-col justify-center items-center text-center bg-slate-50/50">
                                    <span className="text-[8px] font-extrabold uppercase tracking-wider text-slate-600 mb-0.5">
                                        LABEL KE
                                    </span>
                                    <div className="font-black font-mono text-3xl leading-none tracking-tight my-auto text-black">
                                        {motor.label_ke || '-'}
                                    </div>
                                    <span className="text-[7.5px] font-bold uppercase text-slate-500">
                                        No. Identitas
                                    </span>
                                </div>

                                {/* KOLOM 2: ITEM, ALAMAT, DAYA */}
                                <div className="border-r border-black pr-1.5 pl-0.5 flex flex-col justify-between">
                                    {/* Item */}
                                    <div className="border-b border-dashed border-slate-300 pb-0.5">
                                        <div className="text-[7.5px] font-bold uppercase text-slate-500 leading-none">
                                            Item
                                        </div>
                                        <div className="font-black font-mono text-[11px] text-black truncate leading-tight mt-0.5" title={motor.item}>
                                            {motor.item || '-'}
                                        </div>
                                    </div>

                                    {/* Alamat */}
                                    <div className="border-b border-dashed border-slate-300 py-0.5">
                                        <div className="text-[7.5px] font-bold uppercase text-slate-500 leading-none">
                                            Alamat
                                        </div>
                                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.alamat_motor}>
                                            {motor.alamat_motor || '-'}
                                        </div>
                                    </div>

                                    {/* Daya */}
                                    <div className="pt-0.5">
                                        <div className="text-[7.5px] font-bold uppercase text-slate-500 leading-none">
                                            Daya
                                        </div>
                                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.hp_kw}>
                                            {motor.hp_kw || '-'}
                                        </div>
                                    </div>
                                </div>

                                {/* KOLOM 3: MOUNTING, VOLTAGE & AMPERE, FRAME */}
                                <div className="pl-0.5 flex flex-col justify-between">
                                    {/* Mounting */}
                                    <div className="border-b border-dashed border-slate-300 pb-0.5">
                                        <div className="text-[7.5px] font-bold uppercase text-slate-500 leading-none">
                                            Mounting
                                        </div>
                                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.mounting}>
                                            {motor.mounting || '-'}
                                        </div>
                                    </div>

                                    {/* Voltage & Ampere */}
                                    <div className="border-b border-dashed border-slate-300 py-0.5">
                                        <div className="text-[7.5px] font-bold uppercase text-slate-500 leading-none">
                                            Volt & Amp
                                        </div>
                                        <div className="font-bold text-[9px] text-black truncate leading-tight mt-0.5">
                                            {motor.voltage || '-'} / {motor.ampere || '-'}
                                        </div>
                                    </div>

                                    {/* Frame */}
                                    <div className="pt-0.5">
                                        <div className="text-[7.5px] font-bold uppercase text-slate-500 leading-none">
                                            Frame
                                        </div>
                                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.frame}>
                                            {motor.frame || '-'}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Footer Status & Note */}
                            <div className="border-t border-black pt-0.5 mt-1 flex justify-between items-center text-[7.5px] font-semibold text-slate-600">
                                <span>Status: {motor.status || 'Di Workshop'}</span>
                                <span>Bengkel Listrik PKC</span>
                            </div>
                        </div>
                    </div>

                    <div className="text-[11px] text-slate-500 mt-3 text-center">
                        Tip: Pada dialog printer browser, pilih ukuran kertas stiker/label yang sesuai dan atur Margin ke <strong>None</strong> atau <strong>Minimum</strong>.
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-end gap-2.5">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                    >
                        Tutup
                    </button>
                    <button
                        type="button"
                        onClick={handlePrint}
                        className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-md flex items-center gap-2 transition"
                    >
                        <Printer className="h-4 w-4" />
                        <span>Cetak Name Plate</span>
                    </button>
                </div>
            </div>

            {/* Print CSS Rules */}
            <style>{`
                @media print {
                    /* Sembunyikan seluruh elemen body selain printable-nameplate */
                    body * {
                        visibility: hidden !important;
                    }
                    #printable-nameplate, #printable-nameplate * {
                        visibility: visible !important;
                    }
                    #printable-nameplate {
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 8.5cm !important;
                        height: 5cm !important;
                        margin: 0 !important;
                        padding: 0.2cm !important;
                        box-sizing: border-box !important;
                        border: 2px solid #000 !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                        page-break-inside: avoid !important;
                    }
                    @page {
                        size: 8.5cm 5cm;
                        margin: 0;
                    }
                }
            `}</style>
        </div>
    );
}
