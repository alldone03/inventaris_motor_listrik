import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import OcrScannerModal from '@/Components/OcrScannerModal';
import { 
    Zap, 
    ArrowLeft, 
    Save, 
    Camera, 
    Sparkles, 
    Layers
} from 'lucide-react';

export default function MotorsEdit({ motor }) {
    const [isOcrOpen, setIsOcrOpen] = useState(false);

    const { data, setData, put, processing, errors } = useForm({
        item: motor.item || '',
        label_ke: motor.label_ke || '',
        alamat_motor: motor.alamat_motor || '',
        hp_kw: motor.hp_kw || '',
        voltage: motor.voltage || '',
        ampere: motor.ampere || '',
        frame: motor.frame || '',
        ip_rating: motor.ip_rating || '',
        frequency: motor.frequency || '50 Hz',
        manufacture: motor.manufacture || '',
        rpm: motor.rpm || '',
        area: motor.area || '',
        keterangan: motor.keterangan || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('motors.update', motor.id));
    };

    const handleItemOcr = (itemCode) => {
        setData('item', itemCode);
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
                            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                                Edit Spesifikasi Motor: {motor.item}
                            </h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Perbarui data nameplate atau keterangan motor listrik
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsOcrOpen(true)}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 flex items-center gap-2 transition"
                    >
                        <Camera className="h-4 w-4" />
                        <span>Scan OCR Nameplate</span>
                    </button>
                </div>
            }
        >
            <Head title={`Edit Motor ${motor.item} - Bengkel Listrik Pupuk Kujang`} />

            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 p-6 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Perbarui Data Motor</span>
                            <h3 className="text-lg font-bold">Item: {motor.item}</h3>
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsOcrOpen(true)}
                            className="px-3.5 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow transition flex items-center gap-1.5"
                        >
                            <Sparkles className="h-4 w-4" />
                            <span>Pindai Ulang OCR</span>
                        </button>
                    </div>

                    <div className="p-6 sm:p-8 space-y-6">
                        {/* Section 1 */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                <Zap className="h-4 w-4 text-emerald-600" />
                                1. Identifikasi Pokok Motor
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Item <span className="text-rose-500">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={data.item}
                                        onChange={(e) => setData('item', e.target.value)}
                                        required
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                    {errors.item && <p className="text-xs text-rose-500 mt-1">{errors.item}</p>}
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Label Ke
                                    </label>
                                    <input
                                        type="text"
                                        value={data.label_ke}
                                        onChange={(e) => setData('label_ke', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">
                                        Alamat Motor
                                    </label>
                                    <input
                                        type="text"
                                        value={data.alamat_motor}
                                        onChange={(e) => setData('alamat_motor', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 2 */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                                <Layers className="h-4 w-4 text-emerald-600" />
                                2. Spesifikasi Elektrikal & Mekanikal (Nameplate)
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">HP / kW</label>
                                    <input
                                        type="text"
                                        value={data.hp_kw}
                                        onChange={(e) => setData('hp_kw', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Voltage (V)</label>
                                    <input
                                        type="text"
                                        value={data.voltage}
                                        onChange={(e) => setData('voltage', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Ampere (A)</label>
                                    <input
                                        type="text"
                                        value={data.ampere}
                                        onChange={(e) => setData('ampere', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Frame</label>
                                    <input
                                        type="text"
                                        value={data.frame}
                                        onChange={(e) => setData('frame', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">IP Rating</label>
                                    <input
                                        type="text"
                                        value={data.ip_rating}
                                        onChange={(e) => setData('ip_rating', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Frequency (Hz)</label>
                                    <input
                                        type="text"
                                        value={data.frequency}
                                        onChange={(e) => setData('frequency', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Manufacture / MFG</label>
                                    <input
                                        type="text"
                                        value={data.manufacture}
                                        onChange={(e) => setData('manufacture', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">RPM (Putaran/Menit)</label>
                                    <input
                                        type="text"
                                        value={data.rpm}
                                        onChange={(e) => setData('rpm', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-700 mb-1">Area / Lokasi Pabrik</label>
                                    <input
                                        type="text"
                                        value={data.area}
                                        onChange={(e) => setData('area', e.target.value)}
                                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Section 3 */}
                        <div>
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-4 pb-2 border-b border-slate-100">
                                3. Catatan & Keterangan Tambahan
                            </h4>
                            <div>
                                <textarea
                                    value={data.keterangan}
                                    onChange={(e) => setData('keterangan', e.target.value)}
                                    rows={3}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-6 sm:px-8 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <Link
                            href={route('motors.show', motor.id)}
                            className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-bold transition"
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center gap-2 disabled:opacity-50"
                        >
                            <Save className="h-4 w-4" />
                            <span>Simpan Perubahan</span>
                        </button>
                    </div>
                </form>
            </div>

            <OcrScannerModal
                isOpen={isOcrOpen}
                onClose={() => setIsOcrOpen(false)}
                onSelectResult={handleItemOcr}
            />
        </AuthenticatedLayout>
    );
}
