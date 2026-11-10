
import React from 'react';
import { Link } from '@inertiajs/react';
import AlatPrimerLayout from './AlatPrimerLayout';
import {
    Gauge,
    BriefcaseBusiness,
    PlusCircle,
    List,
    Layers,
    Thermometer,
    MoreHorizontal,
    ArrowRight,
} from 'lucide-react';

export default function AlatPrimerDashboard({
    totalAlat = 24,
    categories = [
        { name: 'Pressure Calibrator', total: 8, color: 'blue' },
        { name: 'Multifunction Calibrator', total: 6, color: 'emerald' },
        { name: 'Temperature Calibrator', total: 4, color: 'amber' },
        { name: 'Lainnya', total: 6, color: 'purple' },
    ],
    recentTools = [
        {
            id: 1,
            name: 'Pressure Calibrator',
            brand: 'Fluke',
            serial_number: '754-1234',
            range: '0 – 700 bar',
        },
        {
            id: 2,
            name: 'Multifunction Calibrator',
            brand: 'Beamex',
            serial_number: 'MC6-9876',
            range: '0 – 24 mA / 0 – 10 V',
        },
        {
            id: 3,
            name: 'Temperature Calibrator',
            brand: 'Additel',
            serial_number: 'ADT-2231',
            range: '-40 – 650 °C',
        },
        {
            id: 4,
            name: 'Pressure Gauge Tester',
            brand: 'WIKA',
            serial_number: 'PGT-4567',
            range: '0 – 100 bar',
        },
        {
            id: 5,
            name: 'Loop Calibrator',
            brand: 'Fluke',
            serial_number: '715-9988',
            range: '0 – 24 mA',
        },
    ],
}) {
    const categoryStyles = {
        blue: {
            card: 'bg-blue-50 border-blue-100',
            icon: 'text-blue-600',
            number: 'text-blue-700',
            Icon: Gauge,
        },
        emerald: {
            card: 'bg-emerald-50 border-emerald-100',
            icon: 'text-emerald-600',
            number: 'text-emerald-700',
            Icon: BriefcaseBusiness,
        },
        amber: {
            card: 'bg-amber-50 border-amber-100',
            icon: 'text-amber-600',
            number: 'text-amber-700',
            Icon: Thermometer,
        },
        purple: {
            card: 'bg-purple-50 border-purple-100',
            icon: 'text-purple-600',
            number: 'text-purple-700',
            Icon: MoreHorizontal,
        },
    };

    return (
        <AlatPrimerLayout
            header={
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Dashboard Alat Primer
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Inventaris alat kalibrasi (alat primer)
                        Departemen Har Listrik, Instrument & Alat Berat
                    </p>
                </div>
            }
        >
            <div className="space-y-5">

                {/* TOTAL ALAT & QUICK ACTION */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

                    {/* Total */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4">
                        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-5 flex items-center gap-6">
                            <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center text-blue-600">
                                <BriefcaseBusiness size={38} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-blue-950">
                                    Total Alat Primer
                                </p>

                                <div className="flex items-baseline gap-3 mt-1">
                                    <span className="text-4xl font-extrabold text-blue-700">
                                        {totalAlat}
                                    </span>
                                    <span className="text-sm font-medium text-slate-600">
                                        Unit
                                    </span>
                                </div>
                            </div>

                            <BriefcaseBusiness
                                size={100}
                                className="absolute -right-2 -bottom-6 text-blue-200/60"
                            />
                        </div>
                    </div>

                    {/* Quick Action */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <PlusCircle size={21} className="text-blue-700" />
                            <h2 className="font-bold text-slate-800">
                                Aksi Cepat
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Link
                                href={route('alatprimer.create')}
                                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm py-3 transition shadow-sm"
                            >
                                <PlusCircle size={19} />
                                Tambah Alat
                            </Link>

                            <Link
                                href={route('alatprimer_dashboard')}
                                className="flex items-center justify-center gap-2 rounded-xl border border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold text-sm py-3 transition"
                            >
                                <List size={19} />
                                Lihat Daftar
                            </Link>
                        </div>
                    </div>
                </div>

                {/* KATEGORI ALAT */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
                    <div className="flex items-center gap-2 mb-5">
                        <Layers size={22} className="text-slate-800" />
                        <h2 className="font-bold text-slate-800">
                            Kategori Alat Primer
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                        {categories.map((category, index) => {
                            const style =
                                categoryStyles[category.color] ||
                                categoryStyles.blue;

                            const Icon = style.Icon;

                            return (
                                <div
                                    key={category.name}
                                    className={`${style.card} border rounded-xl px-3 py-5 flex flex-col items-center justify-center text-center transition hover:shadow-md`}
                                >
                                    <Icon
                                        size={32}
                                        className={style.icon}
                                    />

                                    <p className={`text-3xl font-extrabold mt-2 ${style.number}`}>
                                        {category.total}
                                    </p>

                                    <p className="text-sm font-medium text-slate-700 mt-1">
                                        {category.name}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* RECENT TOOLS TABLE */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                    <div className="p-5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                            <List size={22} className="text-slate-800" />
                            <h2 className="font-bold text-slate-800">
                                Daftar Alat Primer Terbaru
                            </h2>
                        </div>

                        <Link
                            href={route('alatprimer_dashboard')}
                            className="text-sm font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1 whitespace-nowrap"
                        >
                            Lihat Semua Data
                            <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="overflow-x-auto px-5 pb-5">
                        <table className="w-full text-sm text-left">
                            <thead>
                                <tr className="bg-slate-100 text-slate-700 border-y border-slate-200">
                                    <th className="px-4 py-3 font-bold text-center w-16">
                                        No
                                    </th>
                                    <th className="px-4 py-3 font-bold">
                                        Nama Alat
                                    </th>
                                    <th className="px-4 py-3 font-bold">
                                        Merk
                                    </th>
                                    <th className="px-4 py-3 font-bold">
                                        Serial Number
                                    </th>
                                    <th className="px-4 py-3 font-bold">
                                        Range
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {recentTools.map((tool, index) => (
                                    <tr
                                        key={tool.id}
                                        className="hover:bg-blue-50/50 transition"
                                    >
                                        <td className="px-4 py-3 text-center text-slate-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-3 font-medium text-slate-800">
                                            {tool.name}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {tool.brand}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600">
                                            {tool.serial_number}
                                        </td>
                                        <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                                            {tool.range}
                                        </td>
                                    </tr>
                                ))}

                                {recentTools.length === 0 && (
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="text-center py-10 text-slate-400"
                                        >
                                            Belum ada data alat primer.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AlatPrimerLayout>
    );
}
