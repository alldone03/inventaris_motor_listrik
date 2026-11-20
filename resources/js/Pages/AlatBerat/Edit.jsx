
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
        tanggal_surat_keluar: alatBerat.tanggal_surat_keluar ?? "",
        tanggal_habis_berlaku: alatBerat.tanggal_habis_berlaku ?? "",
        status_silo: alatBerat.status_silo ?? "",
        keterangan: alatBerat.keterangan ?? "",
    });

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
            placeholder: "Masukkan nomor register",
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
        {
            name: "status_silo",
            label: "Status SILO",
            type: "select",
            options: [
                "Masih Berlaku",
                "Mendekati Habis",
                "Segera Habis",
                "Belum Diatur",
            ],
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
                        <div className="mb-6 border-b border-slate-200 pb-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Informasi Alat Berat
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                Ubah informasi unit alat berat berikut.
                            </p>
                        </div>

                        {/* Input Fields */}
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        {field.label}
                                    </label>

                                    {field.type === "select" ? (
                                        <select
                                            id={field.name}
                                            value={data[field.name]}
                                            onChange={(e) =>
                                                setData(field.name, e.target.value)
                                            }
                                            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-slate-300"
                                                }`}
                                        >
                                            <option value="">
                                                Pilih Status SILO
                                            </option>

                                            {field.options.map((option) => (
                                                <option key={option} value={option}>
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            id={field.name}
                                            type={field.type}
                                            value={data[field.name]}
                                            onChange={(e) =>
                                                setData(field.name, e.target.value)
                                            }
                                            placeholder={field.placeholder || ""}
                                            className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors[field.name]
                                                    ? "border-red-500"
                                                    : "border-slate-300"
                                                }`}
                                        />
                                    )}

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
                                    onChange={(e) =>
                                        setData("status", e.target.value)
                                    }
                                    className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 ${errors.status
                                            ? "border-red-500"
                                            : "border-slate-300"
                                        }`}
                                >
                                    <option value="Siap Operasi">
                                        Siap Operasi
                                    </option>
                                    <option value="Dalam Perbaikan">
                                        Dalam Perbaikan
                                    </option>
                                    <option value="Rusak">
                                        Rusak
                                    </option>
                                </select>

                                {errors.status && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors.status}
                                    </p>
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
                                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
