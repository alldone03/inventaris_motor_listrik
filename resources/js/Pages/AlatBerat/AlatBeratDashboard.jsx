
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

function formatSiloDate(date) {
    if (!date) return "-";

    const [year, month, day] = date.split("-");

    return new Date(
        Number(year),
        Number(month) - 1,
        Number(day)
    ).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}


function AlatBeratCard({ alat, onDetail }) {
    const silo = alat.silo_countdown || {
        configured: false,
        remaining: null,
        progress: 0,
        status: "Belum Diatur",
        color: "gray",
    };

    const siloColors = {
        green: {
            card: "bg-emerald-50/70 border-emerald-100",
            badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
            bar: "bg-emerald-600",
        },
        yellow: {
            card: "bg-amber-50/70 border-amber-100",
            badge: "bg-amber-100 text-amber-700 border-amber-200",
            bar: "bg-amber-500",
        },
        red: {
            card: "bg-red-50/70 border-red-100",
            badge: "bg-red-100 text-red-700 border-red-200",
            bar: "bg-red-600",
        },
        gray: {
            card: "bg-gray-50 border-gray-200",
            badge: "bg-gray-100 text-gray-600 border-gray-200",
            bar: "bg-gray-300",
        },
    };

    const warna = siloColors[silo.color] || siloColors.gray;

    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 p-5">

            {/* Header Card */}
            <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 text-lg">
                        {alat.merk || "-"} {alat.model || ""}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                        {alat.nomor_unit || "-"}
                    </p>
                </div>

                <span
                    className={`text-xs font-semibold px-3 py-2 rounded-lg border whitespace-nowrap ${statusStyle[alat.status] ||
                        "bg-gray-100 text-gray-600 border-gray-200"
                        }`}
                >
                    {alat.status || "-"}
                </span>
            </div>

            <div className="border-t border-gray-100 my-4" />

            {/* Informasi Alat */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                <div>
                    <p className="text-sm text-gray-500 mb-1">
                        Nama Alat
                    </p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.nama_alat || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-1">
                        Merk / Model
                    </p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.merk || "-"} {alat.model || ""}
                    </p>
                </div>
                {/* Nomor Register DEPNAKER - Lebar Penuh */}
                <div className="col-span-2">
                    <p className="text-sm text-gray-500 mb-1">
                        Nomor Register DEPNAKER
                    </p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.nomor_register_depnaker || "-"}
                    </p>
                </div>

                {/* <div>
                    <p className="text-sm text-gray-500 mb-1">
                        Kapasitas
                    </p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.kapasitas || "-"}
                    </p>
                </div>

                <div>
                    <p className="text-sm text-gray-500 mb-1">
                        Lokasi
                    </p>
                    <p className="font-semibold text-gray-800 text-base">
                        {alat.lokasi || "-"}
                    </p>
                </div> */}
            </div>

            {/* Masa Berlaku SILO */}
            <div className={`mt-5 rounded-xl border p-4 ${warna.card}`}>

                <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                        <span className="text-lg">▣</span>

                        <p className="text-sm text-gray-800 font-bold">
                            Masa Berlaku SILO
                        </p>
                    </div>

                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg border whitespace-nowrap ${warna.badge}`}>
                        {silo.configured
                            ? silo.remaining > 0
                                ? `${silo.remaining} hari tersisa`
                                : "Sudah Habis"
                            : "-"}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-3">
                    <div className="flex-1 h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className={`h-full rounded-full transition-all duration-500 ${warna.bar}`}
                            style={{
                                width: `${silo.progress}%`,
                            }}
                        />
                    </div>

                    <span className="font-bold text-gray-800 text-base min-w-10 text-right">
                        {silo.progress}%
                    </span>
                </div>

                {/* Tanggal Berakhir dan Status */}
                <div className="flex items-center justify-between gap-2 mt-3">
                    <p className="text-xs text-gray-700">
                        {silo.configured
                            ? `Berakhir: ${formatSiloDate(alat.tanggal_habis_berlaku)}`
                            : "Belum ada tanggal berlaku"}
                    </p>

                    <span className={`text-xs font-semibold px-3 py-1 rounded-lg border whitespace-nowrap ${warna.badge}`}>
                        {silo.status}
                    </span>
                </div>
            </div>

            {/* Tombol Detail */}
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
                            className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto p-6 md:p-8"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <p className="text-sm text-emerald-600 font-semibold uppercase tracking-wider">
                                        Informasi Inventaris
                                    </p>
                                    <h2 className="text-2xl font-bold text-gray-800 mt-1">
                                        Detail Alat Berat
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setAlatTerpilih(null)}
                                    className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
                                >
                                    ✕
                                </button>
                            </div>

                            {(() => {
                                const silo = alatTerpilih.silo_countdown;
                                const progress = silo?.progress ?? 0;
                                const remaining = silo?.remaining;

                                const ringColor =
                                    silo?.color === "green"
                                        ? "#059669"
                                        : silo?.color === "yellow"
                                            ? "#EAB308"
                                            : silo?.color === "red"
                                                ? "#EF4444"
                                                : "#9CA3AF";

                                const statusColor =
                                    silo?.color === "green"
                                        ? "text-emerald-700 bg-emerald-100"
                                        : silo?.color === "yellow"
                                            ? "text-yellow-700 bg-yellow-100"
                                            : silo?.color === "red"
                                                ? "text-red-700 bg-red-100"
                                                : "text-gray-600 bg-gray-100";

                                return (
                                    <>
                                        {/* Dua Kolom */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                            {/* KIRI - INFORMASI INVENTARIS */}
                                            <div className="rounded-xl border border-gray-200 p-4 md:p-5">
                                                <h3 className="font-bold text-gray-800 mb-3">
                                                    Informasi Alat
                                                </h3>

                                                <div className="space-y-0">
                                                    {[
                                                        ["Nama Alat", alatTerpilih.nama_alat],
                                                        ["Merk", alatTerpilih.merk],
                                                        ["Model", alatTerpilih.model],
                                                        ["Nomor Unit", alatTerpilih.nomor_unit],
                                                        ["Status", alatTerpilih.status],
                                                        ["Nomor Register DEPNAKER", alatTerpilih.nomor_register_depnaker],
                                                        ["Keterangan", alatTerpilih.keterangan],
                                                    ].map(([label, value]) => (
                                                        <div
                                                            key={label}
                                                            className="flex justify-between gap-3 border-b border-gray-100 py-3"
                                                        >
                                                            <span className="text-sm text-gray-500">
                                                                {label}
                                                            </span>
                                                            <span className="text-sm font-semibold text-gray-800 text-right">
                                                                {value || "-"}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* KANAN - MASA BERLAKU SILO */}
                                            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
                                                <h3 className="font-bold text-gray-800 text-lg mb-6">
                                                    Masa Berlaku SILO
                                                </h3>

                                                {/* Lingkaran dan Countdown */}
                                                <div className="flex items-center justify-center gap-5 py-5">
                                                    <div
                                                        className="w-32 h-32 shrink-0 rounded-full flex items-center justify-center"
                                                        style={{
                                                            background: `conic-gradient(${ringColor} ${progress}%, #E5E7EB ${progress}% 100%)`,
                                                        }}
                                                    >
                                                        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center">
                                                            <span className="text-2xl font-bold text-gray-800">
                                                                {silo?.configured ? `${progress}%` : "-"}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    <div className="text-center">
                                                        <p className="text-sm text-gray-500">
                                                            Sisa Masa Berlaku
                                                        </p>

                                                        <h2 className={`text-3xl font-extrabold mt-2 ${silo?.color === "red"
                                                            ? "text-red-600"
                                                            : silo?.color === "yellow"
                                                                ? "text-yellow-600"
                                                                : silo?.color === "green"
                                                                    ? "text-emerald-600"
                                                                    : "text-gray-500"
                                                            }`}>
                                                            {!silo?.configured
                                                                ? "Belum Diatur"
                                                                : remaining < 0
                                                                    ? `${Math.abs(remaining)} Hari Terlewat`
                                                                    : `${remaining} Hari`}
                                                        </h2>

                                                        <span className={`inline-block mt-3 rounded-full px-4 py-1 text-xs font-semibold ${statusColor}`}>
                                                            {silo?.status || "Belum Diatur"}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Tanggal SILO */}
                                                <div className="border-t border-gray-200 mt-5 pt-4 space-y-4">
                                                    <div className="flex justify-between gap-3">
                                                        <span className="text-sm text-gray-500">
                                                            Tanggal Surat Keluar
                                                        </span>
                                                        <span className="text-sm font-semibold text-gray-800">
                                                            {alatTerpilih.tanggal_surat_keluar || "-"}
                                                        </span>
                                                    </div>

                                                    <div className="flex justify-between gap-3">
                                                        <span className="text-sm text-gray-500">
                                                            Tanggal Habis Berlaku
                                                        </span>
                                                        <span className="text-sm font-semibold text-gray-800">
                                                            {alatTerpilih.tanggal_habis_berlaku || "-"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                );
                            })()}

                            {/* Tombol Tutup */}
                            <div className="mt-6 border-t border-gray-200 pt-5">
                                <button
                                    onClick={() => setAlatTerpilih(null)}
                                    className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl py-3 font-semibold transition"
                                >
                                    Tutup
                                </button>
                            </div>
                        </div>
                    </div>
                )}


            </div>
        </InstrumentLayout>
    );
}
