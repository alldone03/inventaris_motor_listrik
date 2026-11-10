
import React from 'react';
import { Link, useForm } from '@inertiajs/react';
import AlatPrimerLayout from './AlatPrimerLayout';
import {
    Gauge,
    Tag,
    Hash,
    Ruler,
    ArrowLeft,
    Save,
} from 'lucide-react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        nama: '',
        merk: '',
        serial_number: '',
        range: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('alatprimer.store'));
    };

    const inputClass =
        "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition";

    return (
        <AlatPrimerLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                        <Gauge size={27} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Tambah Alat Primer
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Tambahkan data inventaris alat kalibrasi.
                        </p>
                    </div>
                </div>
            }
        >
            <div className="space-y-6">

                {/* INFORMASI ALAT PRIMER */}
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-100 rounded-2xl p-5 flex items-center gap-4">
                    <div className="w-16 h-16 shrink-0 rounded-xl bg-blue-200/70 text-blue-800 flex items-center justify-center">
                        <Gauge size={34} />
                    </div>

                    <div>
                        <h2 className="text-lg font-bold text-blue-900">
                            Informasi Alat Primer
                        </h2>
                        <p className="text-sm text-blue-800 mt-1">
                            Masukkan informasi alat primer ke dalam inventaris.
                        </p>
                    </div>
                </div>

                {/* FORM DATA ALAT */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="px-6 py-5 border-b border-slate-200">
                        <h2 className="text-xl font-bold text-slate-800">
                            Form Data Alat
                        </h2>
                        <p className="text-sm text-slate-500 mt-1">
                            Seluruh kolom dapat diisi sesuai data yang tersedia.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="p-6 space-y-5">

                            {/* NAMA ALAT */}
                            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-3 md:gap-5 items-center">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <Gauge size={20} className="text-slate-600" />
                                    Nama Alat
                                </label>

                                <div>
                                    <input
                                        type="text"
                                        name="nama"
                                        value={data.nama}
                                        onChange={(e) => setData('nama', e.target.value)}
                                        placeholder="Contoh: Pressure Calibrator"
                                        className={inputClass}
                                    />
                                    {errors.nama && (
                                        <p className="text-xs text-red-500 mt-1">{errors.nama}</p>
                                    )}
                                </div>
                            </div>

                            {/* MERK */}
                            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-3 md:gap-5 items-center">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <Tag size={20} className="text-slate-600" />
                                    Merk
                                </label>

                                <div>
                                    <input
                                        type="text"
                                        name="merk"
                                        value={data.merk}
                                        onChange={(e) => setData('merk', e.target.value)}
                                        placeholder="Contoh: Fluke, Beamex, WIKA"
                                        className={inputClass}
                                    />
                                    {errors.merk && (
                                        <p className="text-xs text-red-500 mt-1">{errors.merk}</p>
                                    )}
                                </div>
                            </div>

                            {/* SERIAL NUMBER */}
                            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-3 md:gap-5 items-center">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <Hash size={20} className="text-slate-600" />
                                    Serial Number
                                </label>

                                <div>
                                    <input
                                        type="text"
                                        name="serial_number"
                                        value={data.serial_number}
                                        onChange={(e) => setData('serial_number', e.target.value)}
                                        placeholder="Masukkan serial number alat"
                                        className={inputClass}
                                    />
                                    {errors.serial_number && (
                                        <p className="text-xs text-red-500 mt-1">{errors.serial_number}</p>
                                    )}
                                </div>
                            </div>

                            {/* RANGE */}
                            <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-3 md:gap-5 items-center">
                                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                    <Ruler size={20} className="text-slate-600" />
                                    Range
                                </label>

                                <div>
                                    <input
                                        type="text"
                                        name="range"
                                        value={data.range}
                                        onChange={(e) => setData('range', e.target.value)}
                                        placeholder="Contoh: 0 – 10 bar"
                                        className={inputClass}
                                    />
                                    {errors.range && (
                                        <p className="text-xs text-red-500 mt-1">{errors.range}</p>
                                    )}
                                </div>
                            </div>

                        </div>

                        {/* BUTTON FOOTER */}
                        <div className="px-6 py-5 border-t border-slate-200 flex flex-col-reverse sm:flex-row justify-end gap-3">

                            <Link
                                href={route('alatprimer_dashboard')}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-sm transition"
                            >
                                <ArrowLeft size={18} />
                                Kembali
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >
                                <Save size={18} />
                                {processing ? 'Menyimpan...' : 'Simpan Data'}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </AlatPrimerLayout>
    );
}
