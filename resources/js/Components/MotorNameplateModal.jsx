import React from 'react';
import { Printer, X, Tag } from 'lucide-react';
import MotorNameplateCard from './MotorNameplateCard';

export default function MotorNameplateModal({ isOpen, onClose, motor }) {
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
                        className="p-2 rounded-xl text-slate-400 hover:text-black hover:bg-slate-100 transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Modal Body / Preview */}
                <div className="p-6 flex flex-col items-center bg-slate-100/60">
                    <div className="text-xs text-slate-600 mb-3 font-medium">
                        Preview Fisik (Rasio Skala 8.5 cm x 5 cm):
                    </div>

                    {/* Outer card showing real-world proportional preview */}
                    <div className="p-4 bg-white rounded-2xl shadow-md border border-slate-200 w-full flex justify-center">
                        <MotorNameplateCard id="single-print-area" motor={motor} />
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

            {/* Print CSS Rules - Menjamin hanya 1 lembar kertas */}
            <style>{`
                @media print {
                    @page {
                        size: 8.5cm 5cm;
                        margin: 0 !important;
                    }
                    html, body {
                        width: 8.5cm !important;
                        height: 5cm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        overflow: hidden !important;
                        background: #ffffff !important;
                    }
                    /* Sembunyikan semua elemen di luar area cetak */
                    body > * {
                        display: none !important;
                    }
                    /* Kecualikan container modal dan single-print-area */
                    body > div:has(#single-print-area) {
                        display: block !important;
                        position: static !important;
                        background: transparent !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        width: 8.5cm !important;
                        height: 5cm !important;
                        overflow: hidden !important;
                    }
                    div:has(> #single-print-area) {
                        border: none !important;
                        box-shadow: none !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: transparent !important;
                    }
                    /* Sembunyikan elemen modal lainnya (header, footer, backdrop) */
                    .fixed.inset-0.z-50 {
                        position: absolute !important;
                        left: 0 !important;
                        top: 0 !important;
                        padding: 0 !important;
                        margin: 0 !important;
                        background: white !important;
                        backdrop-filter: none !important;
                        width: 8.5cm !important;
                        height: 5cm !important;
                        overflow: hidden !important;
                        display: block !important;
                    }
                    .fixed.inset-0.z-50 > div {
                        border: none !important;
                        box-shadow: none !important;
                        border-radius: 0 !important;
                        max-width: none !important;
                        width: 8.5cm !important;
                        height: 5cm !important;
                    }
                    .fixed.inset-0.z-50 > div > div:not(:has(#single-print-area)) {
                        display: none !important;
                    }
                    .fixed.inset-0.z-50 > div > div:has(#single-print-area) {
                        background: white !important;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    #single-print-area {
                        position: fixed !important;
                        left: 0 !important;
                        top: 0 !important;
                        width: 8.5cm !important;
                        height: 5cm !important;
                        margin: 0 !important;
                        padding: 0 !important;
                        display: block !important;
                        visibility: visible !important;
                        z-index: 9999999 !important;
                        page-break-inside: avoid !important;
                        page-break-after: avoid !important;
                        page-break-before: avoid !important;
                    }
                    #single-print-area * {
                        visibility: visible !important;
                        -webkit-print-color-adjust: exact !important;
                        print-color-adjust: exact !important;
                    }
                }
            `}</style>
        </div>
    );
}
