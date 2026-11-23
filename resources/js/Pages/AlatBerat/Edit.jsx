
import { Head, Link, useForm } from "@inertiajs/react";
import AlatBeratLayout from "./AlatBeratLayout";

export default function AlatBeratEdit({ alatBerat }) {
    const { data, setData, put, processing, errors } = useForm({
        nama_alat: alatBerat.nama_alat ?? "",
        merk: alatBerat.merk ?? "",
        model: alatBerat.model ?? "",
        nomor_unit: alatBerat.nomor_unit ?? "",
        status: alatBerat.status ?? "Siap Operasi",
        nomor_register_depnaker: alatBerat.nomor_register_depnaker ?? "",
        tanggal_surat_keluar: alatBerat.tanggal_surat_keluar
            ? String(alatBerat.tanggal_surat_keluar).slice(0, 10)
            : "",
        tanggal_habis_berlaku: alatBerat.tanggal_habis_berlaku
            ? String(alatBerat.tanggal_habis_berlaku).slice(0, 10)
            : "",
        keterangan: alatBerat.keterangan ?? "",
    });

    // Perhitungan Countdown SILO
    const calculateSiloCountdown = () => {
        const { tanggal_surat_keluar, tanggal_habis_berlaku } = data;

        if (!tanggal_surat_keluar || !tanggal_habis_berlaku) {
            return null;
        }

        const toUTC = (date) => {
            const [year, month, day] = date.split("-").map(Number);
            return Date.UTC(year, month - 1, day);
        };

        const today = new Date();

        const todayUTC = Date.UTC(
            today.getFullYear(),
            today.getMonth(),
            today.getDate()
        );

        const mulai = toUTC(tanggal_surat_keluar);
        const habis = toUTC(tanggal_habis_berlaku);

        const totalHari = Math.round((habis - mulai) / 86400000);
        const sisaHari = Math.round((habis - todayUTC) / 86400000);

        let status, color;

        if (sisaHari <= 0) {
            status = "Kedaluwarsa";
            color = "red";
        } else if (sisaHari <= 30) {
            status = "Segera Habis";
            color = "red";
        } else if (sisaHari <= 90) {
            status = "Perlu Perhatian";
            color = "yellow";
        } else {
            status = "Aman";
            color = "green";
        }

        const progress = totalHari > 0
            ? Math.max(
                0,
                Math.min(
                    100,
                    Math.round((sisaHari / totalHari) * 100)
                )
            )
            : 0;

        return { sisaHari, progress, status, color };
    };

    const siloCountdown = calculateSiloCountdown();

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("alatberat.update", alatBerat.id));
    };

    const fields = [
        {
            name: "nama_alat",
            label: "Nama Alat",
            placeholder: "Contoh: Excavator",
            type: "text",
        },
        {
            name: "merk",
            label: "Merk",
            placeholder: "Contoh: Caterpillar",
            type: "text",
        },
        {
            name: "model",
            label: "Model",
            placeholder: "Contoh: CAT 320D",
            type: "text",
        },
        {
            name: "nomor_unit",
            label: "Nomor Unit",
            placeholder: "Contoh: EX-001",
            type: "text",
        },
        {
            name: "nomor_register_depnaker",
            label: "Nomor Register DEPNAKER",
            placeholder: "Masukkan nomor register DEPNAKER",
            type: "text",
        },
        {
            name: "tanggal_surat_keluar",
            label: "Tanggal Surat Keluar",
            type: "date",
        },
        {
            name: "tanggal_habis_berlaku",
            label: "Tanggal Habis Berlaku",
            type: "date",
        },
    ];

    return (
        <AlatBeratLayout>
            <Head title="Edit Alat Berat - Pupuk Kujang" />

            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-5xl">

                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route("alatberat.index")}
                            className="text-sm font-medium text-emerald-600 hover:text-emerald-800"
                        >
                            &larr; Kembali ke Daftar Alat Berat
                        </Link>

                        <h1 className="mt-3 text-2xl font-bold text-slate-800">
                            Edit Alat Berat
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Perbarui informasi inventaris alat berat perusahaan.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="mb-6 flex w-full justify-between border-b border-slate-200 pb-4">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Informasi Alat Berat
                                </h2>

                                <p className="mt-1 text-sm text-slate-500">
                                    Ubah informasi unit alat berat berikut.
                                </p>
                            </div>
                        </div>

                        {/* Input Fields */}

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            {/* Nama Alat, Merk, Model, Nomor Unit, Nomor Register */}
                            {fields.slice(0, 5).map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        {field.label}
                                    </label>

                                    <input
                                        id={field.name}
                                        type={field.type || "text"}
                                        value={data[field.name]}
                                        onChange={(e) => setData(field.name, e.target.value)}
                                        placeholder={field.placeholder || ""}
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors[field.name]
                                                ? "border-red-500"
                                                : "border-slate-300"
                                            }`}
                                    />

                                    {errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* Status Operasional */}
                            <div>
                                <label
                                    htmlFor="status"
                                    className="mb-2 block text-sm font-medium text-slate-700"
                                >
                                    Status Operasional
                                </label>

                                <select
                                    id="status"
                                    value={data.status}
                                    onChange={(e) => setData("status", e.target.value)}
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors.status ? "border-red-500" : "border-slate-300"
                                        }`}
                                >
                                    <option value="Siap Operasi">Siap Operasi</option>
                                    <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                                    <option value="Rusak">Rusak</option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                                )}
                            </div>

                            {/* Tanggal Surat Keluar dan Tanggal Habis Berlaku */}
                            {fields.slice(5).map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        {field.label}
                                    </label>

                                    <input
                                        id={field.name}
                                        type={field.type}
                                        value={data[field.name]}
                                        onChange={(e) => setData(field.name, e.target.value)}
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors[field.name]
                                                ? "border-red-500"
                                                : "border-slate-300"
                                            }`}
                                    />

                                    {errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}

                            {/* SILO AUTO COUNTDOWN */}
                            <div className="md:col-span-2 rounded-lg border border-slate-200 bg-slate-50 p-4">
                                <div className="mb-3 flex items-center justify-between">
                                    <label className="text-sm font-medium text-slate-700">
                                        Status SILO
                                    </label>

                                    {siloCountdown && (
                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-semibold ${siloCountdown.color === "green"
                                                    ? "bg-green-100 text-green-700"
                                                    : siloCountdown.color === "yellow"
                                                        ? "bg-yellow-100 text-yellow-700"
                                                        : "bg-red-100 text-red-700"
                                                }`}
                                        >
                                            {siloCountdown.status}
                                        </span>
                                    )}
                                </div>

                                {siloCountdown ? (
                                    <>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-3xl font-bold text-slate-800">
                                                {Math.abs(siloCountdown.sisaHari)}
                                            </span>

                                            <span className="text-sm text-slate-500">
                                                {siloCountdown.sisaHari > 0
                                                    ? "hari tersisa"
                                                    : "hari sejak kedaluwarsa"}
                                            </span>
                                        </div>

                                        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-200">
                                            <div
                                                className={`h-full rounded-full transition-all ${siloCountdown.color === "green"
                                                        ? "bg-green-500"
                                                        : siloCountdown.color === "yellow"
                                                            ? "bg-yellow-500"
                                                            : "bg-red-500"
                                                    }`}
                                                style={{
                                                    width: `${siloCountdown.progress}%`,
                                                }}
                                            />
                                        </div>

                                        <p className="mt-2 text-xs text-slate-500">
                                            Countdown dihitung otomatis berdasarkan tanggal habis berlaku.
                                        </p>
                                    </>
                                ) : (
                                    <div className="flex min-h-[75px] items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white">
                                        <p className="text-center text-sm text-slate-400">
                                            Isi tanggal untuk melihat countdown SILO
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>


                        {/* Keterangan */}
                        <div className="mt-5">
                            <label
                                htmlFor="keterangan"
                                className="mb-2 block text-sm font-medium text-slate-700"
                            >
                                Keterangan
                            </label>

                            <textarea
                                id="keterangan"
                                value={data.keterangan}
                                onChange={(e) =>
                                    setData("keterangan", e.target.value)
                                }
                                rows="4"
                                placeholder="Tambahkan keterangan kondisi alat berat..."
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors.keterangan
                                        ? "border-red-500"
                                        : "border-slate-300"
                                    }`}
                            />

                            {errors.keterangan && (
                                <p className="mt-1 text-sm text-red-600">
                                    {errors.keterangan}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-5 sm:flex-row">
                            <Link
                                href={route("alatberat.index")}
                                className="rounded-lg border border-slate-300 px-5 py-2.5 text-center text-sm font-medium text-slate-700 hover:bg-slate-50"
                            >
                                Batal
                            </Link>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing
                                    ? "Menyimpan..."
                                    : "Simpan Perubahan"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </AlatBeratLayout>
    );
}
