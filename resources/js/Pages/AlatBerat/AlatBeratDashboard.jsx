// INI SEMENTARA NANTI DIEDIT LAGI SESUAI KEBUTUHAN
import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import {
    Search,
    Truck,
    Wrench,
    Activity,
    MapPin,
    Eye,
    PlusCircle
} from 'lucide-react';
import AlatBeratLayout from './AlatBeratLayout';

export default function AlatBeratDashboard() {
    const [searchQuery, setSearchQuery] = useState('');

    // Data contoh untuk tampilan saja, belum dari database
    const daftarAlat = [
        {
            id: 1,
            kode: 'AB-001',
            nama: 'Forklift',
            lokasi: 'Workshop',
            kondisi: 'Baik',
            status: 'Aktif',
        },
        {
            id: 2,
            kode: 'AB-002',
            nama: 'Wheel Loader',
            lokasi: 'Area Produksi',
            kondisi: 'Baik',
            status: 'Aktif',
        },
        {
            id: 3,
            kode: 'AB-003',
            nama: 'Excavator',
            lokasi: 'Area Lapangan',
            kondisi: 'Perlu Pemeriksaan',
            status: 'Maintenance',
        },
        {
            id: 4,
            kode: 'AB-004',
            nama: 'Mobile Crane',
            lokasi: 'Workshop',
            kondisi: 'Baik',
            status: 'Aktif',
        },
    ];

    const filteredAlat = daftarAlat.filter((alat) =>
        `${alat.kode} ${alat.nama} ${alat.lokasi}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <AlatBeratLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-100 text-amber-700">
                        <Truck className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black text-slate-900">
                            Dashboard Alat Berat
                        </h2>
                        <p className="text-sm text-slate-500">
                            Inventaris dan pemantauan kondisi alat berat
                        </p>
                    </div>
                </div>
            }
        >
            <Head title="Dashboard Alat Berat" />

            <div className="space-y-6">
                {/* Ringkasan */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">
                                Total Alat Berat
                            </span>
                            <Truck className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-3xl font-black text-slate-900 mt-3">
                            {daftarAlat.length}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Data contoh
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">
                                Kondisi Baik
                            </span>
                            <Activity className="w-5 h-5 text-emerald-600" />
                        </div>
                        <p className="text-3xl font-black text-emerald-600 mt-3">
                            {daftarAlat.filter(a => a.kondisi === 'Baik').length}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Unit dalam kondisi baik
                        </p>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center">
                            <span className="text-sm text-slate-500">
                                Maintenance
                            </span>
                            <Wrench className="w-5 h-5 text-amber-600" />
                        </div>
                        <p className="text-3xl font-black text-amber-600 mt-3">
                            {daftarAlat.filter(a => a.status === 'Maintenance').length}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                            Unit perlu pemeliharaan
                        </p>
                    </div>
                </div>

                {/* Daftar alat berat */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-slate-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900">
                                    Daftar Alat Berat
                                </h3>
                                <p className="text-sm text-slate-500 mt-1">
                                    Inventaris seluruh unit alat berat
                                </p>
                            </div>

                            <div className="relative">
                                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari alat berat..."
                                    className="w-full sm:w-64 pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">No.</th>
                                    <th className="px-6 py-4">Kode Alat</th>
                                    <th className="px-6 py-4">Nama Alat</th>
                                    <th className="px-6 py-4">Lokasi</th>
                                    <th className="px-6 py-4">Kondisi</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Aksi</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {filteredAlat.map((alat, index) => (
                                    <tr key={alat.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4 text-slate-500">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4 font-mono font-bold text-slate-700">
                                            {alat.kode}
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-slate-900">
                                            {alat.nama}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            <span className="flex items-center gap-1.5">
                                                <MapPin className="w-4 h-4 text-slate-400" />
                                                {alat.lokasi}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                alat.kondisi === 'Baik'
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-amber-100 text-amber-700'
                                            }`}>
                                                {alat.kondisi}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {alat.status}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                onClick={() => alert(`Data contoh: ${alat.nama}`)}
                                                className="flex items-center gap-1.5 text-blue-600 hover:text-blue-800 font-semibold"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Lihat
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {filteredAlat.length === 0 && (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-10 text-center text-slate-400">
                                            Alat berat tidak ditemukan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="px-6 py-4 bg-slate-50 border-t border-slate-100">
                        <p className="text-xs text-slate-500">
                            Menampilkan {filteredAlat.length} dari {daftarAlat.length} data contoh.
                        </p>
                    </div>
                </div>
            </div>
        </AlatBeratLayout>
    );
}
