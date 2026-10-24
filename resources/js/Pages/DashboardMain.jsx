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
import MainLayout from '@/Pages/MainLayout';

export default function Dashboard() {
    const { auth } = usePage().props;
    const user = auth.user;



    const aplikasi = [
        { nama: "Listrik", url: route("listrik_dashboard"), gambar: "/Listrik.png", deskripsi: "Database inventaris motor listrik dan peralatan kelistrikan workshop." },
        { nama: "Instrumen", url: route("instrument_dashboard"), gambar: "/Instrumen.png", deskripsi: "Database instrumen, informasi peralatan, dan kegiatan kalibrasi." },
        { nama: "Alat Berat", url: route("alatberat_dashboard"), gambar: "/Alat_Berat.png", deskripsi: "Database inventaris alat berat dan informasi kondisi unit." }
    ]
    return (
        <MainLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                <Activity className="h-6 w-6" />
                            </span>
                            WORKSHOP LISTRIK INSTRUMEN (WLI)
                        </h2>

                    </div>

                </div>
            }
        >
            <Head title="Dashboard - Bengkel Listrik Pupuk Kujang" />
            <div className="flex gap-20">
                {aplikasi.map((item, index) => (
                    <Link
                        className="group block bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300"
                        href={item.url}
                    >
                        {/* Bagian Atas: Label & Gambar Thumbnail */}
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                                {item.nama}
                            </span>
                            <div className="p-2 rounded-xl bg-slate-100 group-hover:bg-primary/10 group-hover:text-primary transition-colors text-slate-600">
                                <img
                                    className="h-8 w-8 object-contain rounded-lg"
                                    src={item.gambar}
                                    alt={item.nama}
                                />
                            </div>
                        </div>

                        {/* Bagian Tengah: Deskripsi Singkat */}
                        <div className="mt-3">
                            <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                                {item.deskripsi}
                            </p>
                        </div>

                        {/* Bagian Bawah: Badge / Label Tambahan (Opsional, mirip card statistik) */}
                        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
                            <div className="flex gap-2">

                            </div>
                            <span className="text-xs font-semibold text-primary group-hover:underline flex items-center gap-1">
                                Lihat Detail &rarr;
                            </span>
                        </div>
                    </Link>
                ))}
            </div>




        </MainLayout>
    );
}
