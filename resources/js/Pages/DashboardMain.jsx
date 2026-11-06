
import React, { useEffect } from 'react';
import MainLayout from '@/Pages/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { Activity, ArrowRight } from 'lucide-react';
import AOS from 'aos';

export default function Dashboard() {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    // Data aplikasi
    // Routing tetap menggunakan route yang sudah ada
    const aplikasi = [
        {
            nama: "Workshop Listrik",
            url: route("listrik_dashboard"),
            gambar: "/MOTORLISTRIK.jpg",
            deskripsi: "Database inventaris motor listrik dan peralatan kelistrikan workshop.",
        },
        {
            nama: "Instrumen",
            url: route("instrument_dashboard"),
            gambar: "/INSTRUMEN.jpg",
            deskripsi: "Database instrumen, informasi peralatan, dan kegiatan kalibrasi.",
        },
        {
            nama: "Alat Berat",
            url: route("alatberat_dashboard"),
            gambar: "/ALATBERAT.jpg",
            deskripsi: "Database inventaris alat berat dan informasi kondisi unit.",
        }
    ];

    return (
        <MainLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                        <Activity className="h-7 w-7" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                            WORKSHOP LISTRIK INSTRUMEN (WLI)
                        </h2>

                        <p className="text-sm text-slate-500 mt-1">
                            Sistem manajemen data peralatan, instrumen, dan alat berat Bengkel Listrik Pupuk Kujang.
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard - Bengkel Listrik Pupuk Kujang" />

            <div className="relative min-h-full overflow-hidden">

                {/* Background Decoration */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">

                    <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />

                    <div className="absolute bottom-0 -left-20 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl" />

                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-10">

                    {/* Section Heading */}
                    <div className="mb-8">

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                            Main Applications
                        </p>

                        <h3 className="text-2xl font-bold text-slate-800 mt-2">
                            Pilih Menu Utama
                        </h3>

                        <p className="text-sm text-slate-500 mt-1">
                            Akses sistem pengelolaan inventaris dan peralatan.
                        </p>

                    </div>

                    {/* Application Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {aplikasi.map((item, index) => {
                            const aosAnimation =
                                index === 0
                                    ? "fade-right"
                                    : index === aplikasi.length - 1
                                    ? "fade-left"
                                    : "fade-up";

                            return (
                                <div key={item.nama} data-aos={aosAnimation}>
                                    <Link
                                        href={item.url}
                                        className="group block bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between"
                                    >

                                {/* Image Section */}
                                <div className="relative h-56 overflow-hidden bg-slate-100">

                                    <img
                                        src={item.gambar}
                                        alt={item.nama}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />

                                    {/* Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />

                                    {/* Number Badge */}
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5">

                                        <span className="text-xs font-bold text-slate-800">
                                            0{index + 1}
                                        </span>

                                    </div>

                                    {/* Green Accent */}
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500" />

                                </div>

                                {/* Card Content */}
                                <div className="p-6">

                                    <h4 className="text-xl font-extrabold uppercase tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                                        {item.nama}
                                    </h4>

                                    <p className="mt-3 text-sm leading-relaxed text-slate-600 min-h-[48px]">
                                        {item.deskripsi}
                                    </p>

                                    {/* Detail Button */}
                                    <div className="mt-6">

                                        <span className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold group-hover:bg-emerald-600 transition-colors">

                                            Lihat Detail

                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />

                                        </span>

                                    </div>

                                </div>

                                    </Link>
                                </div>
                            );
                        })}

                    </div>

                    {/* Footer */}
                    <div className="mt-12 border-t border-slate-200/70 pt-5">

                        <p className="text-xs text-center text-slate-400">
                            © 2026 PT Pupuk Kujang — Workshop Listrik Instrumen
                        </p>

                    </div>

                </div>

            </div>

        </MainLayout>
    );
}
