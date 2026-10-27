import React, { useState } from 'react';
import AuthenticatedLayout from '@/Pages/Listrik/ListrikLayout';
import { Head, Link, router, usePoll, usePage } from '@inertiajs/react';
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
import InstrumentLayout from './InstrumentLayout';


export default function InstrumentDashboard() {

    const { auth } = usePage().props;
    const user = auth.user;
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <InstrumentLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                <Activity className="h-6 w-6" />
                            </span>
                            Dashboard Instrument
                        </h2>

                    </div>


                </div>

            }
        >

            <Head title="Dashboard Instrumen" />

            <div className="space-y-6">

                {/* Search Banner Instrumen */}
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 p-6 sm:p-8 text-white shadow-xl">
                    <div className="relative z-10">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-3">
                            <Search className="h-3.5 w-3.5" />
                            Pencarian Instrumen
                        </span>

                        <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                            Cari Data Instrumen
                        </h3>

                        <p className="text-slate-300 text-xs sm:text-sm mt-1 mb-5">
                            Cari peralatan berdasarkan tag number, jenis, atau lokasi.
                        </p>

                        <form
                            onSubmit={(e) => e.preventDefault()}
                            className="flex flex-col sm:flex-row gap-2.5 max-w-3xl"
                        >
                            <div className="relative flex-1">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari Valve, Transmitter, Governor..."
                                    className="w-full pl-10 pr-4 py-3 bg-white/10 hover:bg-white/15 focus:bg-white text-white focus:text-slate-900 rounded-xl text-sm placeholder-slate-400 border border-white/15 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2"
                            >
                                <Search className="h-4 w-4" />
                                Cari
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Header section */}
            <div>
                <h3 className="text-lg font-bold text-slate-800">
                    Kategori Instrumen
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                    Pilih kategori peralatan yang ingin dilihat.
                </p>
            </div>

            {/* Tiga kartu kategori */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Valve */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-300 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
                        <Wrench className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">
                        Valve
                    </h4>
                    <p className="text-sm text-slate-500 mt-2">
                        Inventaris dan informasi peralatan valve.
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm font-semibold text-blue-700">
                        <span>Data peralatan</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Transmitter */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-emerald-300 transition">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                        <Activity className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">
                        Transmitter
                    </h4>
                    <p className="text-sm text-slate-500 mt-2">
                        Inventaris transmitter dan informasi pengukuran.
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm font-semibold text-emerald-700">
                        <span>Data peralatan</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Governor */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-lg hover:border-amber-300 transition">
                    <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                        <Layers className="w-6 h-6" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">
                        Governor
                    </h4>
                    <p className="text-sm text-slate-500 mt-2">
                        Inventaris dan informasi sistem governor.
                    </p>
                    <div className="mt-5 flex items-center justify-between text-sm font-semibold text-amber-700">
                        <span>Data peralatan</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

            </div>
        
        


        </InstrumentLayout >
    );
}
