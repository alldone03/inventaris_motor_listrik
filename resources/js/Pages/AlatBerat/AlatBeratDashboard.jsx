
import React, { useMemo, useState } from "react";
import { router, usePage } from "@inertiajs/react";
import InstrumentLayout from "./AlatBeratLayout";

const statusStyle = {
    "Siap Operasi": "bg-emerald-100 text-emerald-700 border-emerald-200",
    "Dalam Perbaikan": "bg-amber-100 text-amber-700 border-amber-200",
    "Rusak": "bg-red-100 text-red-700 border-red-200",
};

function StatistikCard({ judul, jumlah, simbol, warna, aksen }) {
    return (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition">
            <div className="flex items-center justify-between">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl ${warna}`}>
                    {simbol}
                </div>
                <div className={`w-1.5 h-10 rounded-full ${aksen}`} />
            </div>
            <p className="text-base text-gray-600 mt-3">{judul}</p>
            <div className="flex items-end gap-2 mt-1">
                <h2 className="text-3xl font-bold text-gray-800">
                    {jumlah ?? 0}
                </h2>
                <span className="text-sm text-gray-500 mb-1">Unit</span>
            </div>
        </div>
    );
}

function AlatBeratCard({ alat, onDetail }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg">
                        {alat.merk} {alat.model}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                        {alat.nomor_unit || "-"}
                    </p>
                </div>
                <span className={`text-xs font-semibold px-3 py-2 rounded-lg border whitespace-nowrap ${statusStyle[alat.status] || "bg-gray-100 text-gray-600 border-gray-200"
                    }`}>
                    {alat.status}
                </span>
            </div>

            <div className="border-t border-gray-100 my-4" />

            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div>
                    <p className="text-sm text-gray-500 mb-1">Nama Alat</p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.nama_alat || "-"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-1">Merk / Model</p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.merk} {alat.model}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-1">Kapasitas</p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.kapasitas || "-"}
                    </p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 mb-1">Lokasi</p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.lokasi || "-"}
                    </p>
                </div>
            </div>

            <div className="mt-5 bg-emerald-50 border border-emerald-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-emerald-700 text-base">⚙</span>
                    <p className="text-sm text-emerald-800 font-bold">
                        Informasi Pemeliharaan
                    </p>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                    {alat.keterangan || "Belum ada informasi pemeliharaan."}
                </p>
            </div>

            <button
                onClick={() => onDetail(alat)}
                className="w-full mt-4 flex items-center justify-center gap-2 text-base font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-xl py-3 transition"
            >
                Lihat Detail →
            </button>
        </div>
    );
}

export default function AlatBeratDashboard() {
    const { alatBerats = [], stats = {} } = usePage().props;

    const data = alatBerats;

    const [pencarian, setPencarian] = useState("");
    const [filterStatus, setFilterStatus] = useState("Semua Status");
    const [alatTerpilih, setAlatTerpilih] = useState(null);

    const statistik = {
        total: stats.total ?? 0,
        siap: stats.siap_operasi ?? 0,
        perbaikan: stats.dalam_perbaikan ?? 0,
        rusak: stats.rusak ?? 0,
    };

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
            <div className="min-h-screen bg-[#f5f8f6] px-3 py-4 md:px-4 md:py-5">

               
{/* HERO BANNER */}
<div
    className="relative overflow-hidden rounded-2xl shadow-lg bg-cover bg-center"
    style={{
        backgroundImage: "url('/ALATBERATATAS.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
    }}
>
    <div className="relative z-10 px-6 py-8 md:px-9 md:py-10">
        <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm text-white mb-5">
                <span className="w-2 h-2 rounded-full bg-green-300" />
                SISTEM INFORMASI MANAJEMEN
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Alat Berat
            </h1>

            <p className="text-emerald-100 text-base mt-3 leading-relaxed max-w-lg">
                Monitoring inventaris, kondisi operasional,
                dan informasi pemeliharaan alat berat
                secara terintegrasi.
            </p>

            <div className="flex flex-wrap gap-3 mt-6">
                <div className="bg-white/15 border border-white/20 rounded-lg px-4 py-2 text-sm text-white">
                    ⚙ Manajemen Inventaris
                </div>
                <div className="bg-white/15 border border-white/20 rounded-lg px-4 py-2 text-sm text-white">
                    ✓ Monitoring Operasional
                </div>
            </div>
        </div>
    </div>
</div>


                {/* STATISTIK */}
                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mt-5">
                    <StatistikCard
                        judul="Total Alat Berat"
                        jumlah={statistik.total}
                        simbol="🚜"
                        warna="bg-emerald-50 text-emerald-700"
                        aksen="bg-emerald-500"
                    />
                    <StatistikCard
                        judul="Siap Operasi"
                        jumlah={statistik.siap}
                        simbol="✓"
                        warna="bg-green-50 text-green-600"
                        aksen="bg-green-500"
                    />
                    <StatistikCard
                        judul="Dalam Perbaikan"
                        jumlah={statistik.perbaikan}
                        simbol="🔧"
                        warna="bg-amber-50 text-amber-600"
                        aksen="bg-amber-400"
                    />
                    <StatistikCard
                        judul="Rusak"
                        jumlah={statistik.rusak}
                        simbol="⚠"
                        warna="bg-red-50 text-red-600"
                        aksen="bg-red-500"
                    />
                </div>

                {/* DAFTAR ALAT BERAT */}
                <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-4 md:p-5">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-5">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">
                                Daftar Alat Berat
                            </h2>
                            <p className="text-base text-gray-500 mt-1">
                                Informasi dan kondisi seluruh unit alat berat
                            </p>
                        </div>

                        <div className="bg-emerald-50 text-emerald-800 rounded-lg px-4 py-2 text-base font-bold">
                            {dataTersaring.length} Unit
                        </div>
                    </div>

                    {/* PENCARIAN DAN FILTER */}
                    <div className="flex flex-col md:flex-row gap-3 mb-5">
                        <div className="relative flex-1">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                                🔍
                            </span>
                            <input
                                type="text"
                                value={pencarian}
                                onChange={(e) => setPencarian(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Cari nama alat, merk, model, atau nomor unit..."
                                className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-3 text-base outline-none focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            />
                        </div>

                        <select
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                            className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-base outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                            <option>Semua Status</option>
                            <option>Siap Operasi</option>
                            <option>Dalam Perbaikan</option>
                            <option>Rusak</option>
                        </select>
                    </div>

                    {/* GRID KARTU */}
                    {dataTersaring.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                            {dataTersaring.map((alat) => (
                                <AlatBeratCard
                                    key={alat.id}
                                    alat={alat}
                                    onDetail={setAlatTerpilih}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="bg-gray-50 rounded-xl border border-dashed border-gray-300 p-12 text-center">
                            <div className="text-4xl mb-3">🔍</div>
                            <h3 className="text-lg font-semibold text-gray-700">
                                {data.length === 0
                                    ? "Belum ada data alat berat"
                                    : "Data tidak ditemukan"}
                            </h3>
                            <p className="text-base text-gray-500 mt-2">
                                {data.length === 0
                                    ? "Silakan tambahkan data alat berat terlebih dahulu."
                                    : "Coba gunakan kata kunci atau filter lainnya."}
                            </p>
                        </div>
                    )}
                </div>

                {/* MODAL DETAIL */}
                {alatTerpilih && (
                    <div
                        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
                        onClick={() => setAlatTerpilih(null)}
                    >
                        <div
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-5">
                                <div>
                                    <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">
                                        Informasi Inventaris
                                    </p>
                                    <h2 className="text-xl font-bold text-gray-800 mt-1">
                                        Detail Alat Berat
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setAlatTerpilih(null)}
                                    className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="space-y-4 text-base">
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
                                        className="flex justify-between gap-4 border-b border-gray-100 pb-3"
                                    >
                                        <span className="text-gray-500">
                                            {label}
                                        </span>
                                        <span className="font-semibold text-gray-800 text-right">
                                            {value || "-"}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <button
                                onClick={() => setAlatTerpilih(null)}
                                className="w-full mt-6 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-3 text-base font-semibold transition"
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
