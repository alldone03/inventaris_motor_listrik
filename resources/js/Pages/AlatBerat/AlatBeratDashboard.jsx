
import React, { useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import InstrumentLayout from "./AlatBeratLayout";

// Styling status
const statusStyle = {
    "Siap Operasi": "bg-emerald-100 text-emerald-700",
    "Dalam Perbaikan": "bg-amber-100 text-amber-700",
    "Rusak": "bg-red-100 text-red-700",
};

// Komponen Statistik
function StatistikCard({ judul, jumlah, simbol, warna }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl ${warna}`}>
                {simbol}
            </div>

            <p className="text-sm text-gray-500 mt-3">{judul}</p>

            <h2 className="text-2xl font-bold text-gray-800 mt-1">
                {jumlah ?? 0}
            </h2>

            <p className="text-xs text-gray-400 mt-1">
                Unit alat berat
            </p>
        </div>
    );
}

// Komponen Kartu Alat Berat
function AlatBeratCard({ alat, onDetail }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-200 p-5">

            {/* Nama dan Status */}
            <div className="flex items-start justify-between gap-2">
                <div>
                    <h3 className="font-bold text-gray-800">
                        {alat.merk} {alat.model}
                    </h3>

                    <p className="text-xs text-gray-400 mt-1">
                        {alat.nomor_unit}
                    </p>
                </div>

                <span className={`text-[10px] font-semibold px-2 py-1 rounded-md whitespace-nowrap ${statusStyle[alat.status] || "bg-gray-100 text-gray-600"
                    }`}>
                    {alat.status}
                </span>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* Informasi Alat */}
            <div className="space-y-3 text-sm">
                <div>
                    <p className="text-xs text-gray-400">Nama Alat</p>
                    <p className="font-medium text-gray-700">
                        {alat.nama_alat}
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">Merk / Model</p>
                    <p className="font-medium text-gray-700">
                        {alat.merk} {alat.model}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <p className="text-xs text-gray-400">Kapasitas</p>
                        <p className="font-semibold text-gray-700">
                            {alat.kapasitas || "-"}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-400">Lokasi</p>
                        <p className="font-semibold text-gray-700">
                            {alat.lokasi || "-"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Informasi Pemeliharaan */}
            <div className="mt-4 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                <p className="text-xs text-emerald-700 font-semibold mb-1">
                    Informasi Pemeliharaan
                </p>

                <p className="text-xs text-gray-600">
                    {alat.keterangan || "-"}
                </p>
            </div>

            {/* Tombol Detail */}
            <button
                onClick={() => onDetail(alat)}
                className="w-full mt-4 text-sm text-emerald-700 font-semibold hover:text-emerald-900 transition"
            >
                Lihat Detail →
            </button>
        </div>
    );
}

// Dashboard Utama
export default function AlatBeratDashboard() {

    // Mengambil data dari Laravel melalui Inertia
    const { alatBerats = [], stats = {} } = usePage().props;

    // Data asli dari database
    const data = alatBerats;

    const [pencarian, setPencarian] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua Status");
    const [alatTerpilih, setAlatTerpilih] = useState(null);

    // Statistik berasal dari database melalui Controller
    const statistik = {
        total: stats.total ?? 0,
        siap: stats.siap_operasi ?? 0,
        perbaikan: stats.dalam_perbaikan ?? 0,
        rusak: stats.rusak ?? 0,
    };

    // Pencarian dan filter alat berat
    const dataTersaring = useMemo(() => {
        return data.filter((alat) => {
            const kataKunci = pencarian.toLowerCase();

            const cocokPencarian = [
                alat.nama_alat,
                alat.merk,
                alat.model,
                alat.nomor_unit,
                alat.lokasi,
            ].some(nilai =>
                String(nilai ?? "").toLowerCase().includes(kataKunci)
            );

            const cocokStatus =
                filterStatus === "Semua Status" ||
                alat.status === filterStatus;

            return cocokPencarian && cocokStatus;
        });
    }, [data, pencarian, filterStatus]);

    // Fungsi navigasi ke daftar alat berat saat ditekan Enter
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            router.get(route("alatberat.index"), {
                search: pencarian.trim(),
                status: filterStatus === "Semua Status" ? "" : filterStatus,
            });
        }
    };

    return (
        <InstrumentLayout>
            <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">

                {/* HEADER */}
                <div className="bg-gradient-to-r from-emerald-800 to-emerald-600 rounded-xl p-6 text-white shadow-md">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">
                                Dashboard Alat Berat
                            </h1>

                            <p className="text-emerald-100 text-sm mt-1">
                                Sistem Informasi Manajemen Alat Berat
                            </p>
                        </div>

                        <div className="bg-white/15 rounded-lg px-4 py-2 text-sm font-medium">
                            Monitoring Alat Berat
                        </div>
                    </div>
                </div>

                {/* PENCARIAN DAN FILTER */}
                <div className="mt-6 flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                            🔍
                        </span>

                        <input
                            type="text"
                            value={pencarian}
                            onChange={(e) => setPencarian(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Cari nama alat, merk, model, atau nomor unit..."
                            className="w-full bg-white border border-gray-200 rounded-lg pl-11 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                        />
                    </div>

                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-white border border-gray-200 rounded-lg px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                        <option>Semua Status</option>
                        <option>Siap Operasi</option>
                        <option>Dalam Perbaikan</option>
                        <option>Rusak</option>
                    </select>
                </div>

                {/* STATISTIK */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
                    <StatistikCard
                        judul="Total Alat Berat"
                        jumlah={statistik.total}
                        simbol="🚜"
                        warna="bg-emerald-50 text-emerald-700"
                    />

                    <StatistikCard
                        judul="Siap Operasi"
                        jumlah={statistik.siap}
                        simbol="✓"
                        warna="bg-green-50 text-green-600"
                    />

                    <StatistikCard
                        judul="Dalam Perbaikan"
                        jumlah={statistik.perbaikan}
                        simbol="🔧"
                        warna="bg-amber-50 text-amber-600"
                    />

                    <StatistikCard
                        judul="Rusak"
                        jumlah={statistik.rusak}
                        simbol="⚠"
                        warna="bg-red-50 text-red-600"
                    />
                </div>

                {/* DAFTAR ALAT BERAT */}
                <div className="mt-8">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Daftar Alat Berat
                            </h2>

                            <p className="text-sm text-gray-500 mt-1">
                                Informasi dan kondisi alat berat
                            </p>
                        </div>

                        <span className="text-sm text-emerald-700 font-semibold">
                            {dataTersaring.length} Unit
                        </span>
                    </div>

                    {dataTersaring.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                            {dataTersaring.map((alat) => (
                                <AlatBeratCard
                                    key={alat.id}
                                    alat={alat}
                                    onDetail={setAlatTerpilih}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                            <div className="text-4xl mb-3">🔍</div>

                            <h3 className="font-semibold text-gray-700">
                                {data.length === 0
                                    ? "Belum ada data alat berat"
                                    : "Data tidak ditemukan"}
                            </h3>

                            <p className="text-sm text-gray-400 mt-1">
                                {data.length === 0
                                    ? "Silakan tambahkan data alat berat terlebih dahulu."
                                    : "Coba gunakan kata kunci atau filter lainnya."}
                            </p>
                        </div>
                    )}
                </div>

                {/* MODAL DETAIL */}
                {alatTerpilih && (
                    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                        <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
                            <div className="flex justify-between items-center mb-5">
                                <h2 className="text-lg font-bold text-gray-800">
                                    Detail Alat Berat
                                </h2>

                                <button
                                    onClick={() => setAlatTerpilih(null)}
                                    className="text-gray-400 hover:text-red-500 text-xl"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4 text-sm">
                                {[
                                    ["Nama Alat", alatTerpilih.nama_alat],
                                    ["Merk", alatTerpilih.merk],
                                    ["Model", alatTerpilih.model],
                                    ["Nomor Unit", alatTerpilih.nomor_unit],
                                    ["Kapasitas", alatTerpilih.kapasitas || "-"],
                                    ["Lokasi", alatTerpilih.lokasi || "-"],
                                    ["Status", alatTerpilih.status],
                                    ["Keterangan", alatTerpilih.keterangan || "-"],
                                ].map(([label, value]) => (
                                    <div
                                        key={label}
                                        className="flex justify-between gap-4 border-b border-gray-100 pb-2"
                                    >
                                        <span className="text-gray-400">
                                            {label}
                                        </span>

                                        <span className="font-medium text-gray-700 text-right">
                                            {value}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setAlatTerpilih(null)}
                                className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg py-2.5 font-medium transition"
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </InstrumentLayout>
    );
}
