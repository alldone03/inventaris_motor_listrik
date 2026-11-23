
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import AlatBeratLayout from "./AlatBeratLayout";
import CheckIsInput from "@/Components/CheckIsInput";
import { allowedInputter } from "@/Components/allowedInputter";
import { Pencil, Trash2, Upload, FileText, Download } from "lucide-react";

export default function Index({ alatBerat, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");
    const [deleteId, setDeleteId] = useState(null);
    const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
    // State upload PDF SILO
    const [uploadId, setUploadId] = useState(null);
    const [selectedPdf, setSelectedPdf] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const [previewUrl, setPreviewUrl] = useState(null);
    // Menerima data biasa maupun pagination Laravel
    const rows = Array.isArray(alatBerat)
        ? alatBerat
        : alatBerat?.data ?? [];

    const links = alatBerat?.links ?? [];
    const activeAlat = rows.find((alat) => alat.id === uploadId);

    // Pencarian dan filter
    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route("alatberat.index"),
            {
                search: search.trim(),
                status: status,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Reset pencarian
    const handleReset = () => {
        setSearch("");
        setStatus("");

        router.get(
            route("alatberat.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    // Membuka popup konfirmasi
    const handleDelete = (id) => {
        setDeleteId(id);
    };

    // Konfirmasi penghapusan
    const confirmDelete = () => {
        router.delete(route("alatberat.delete", deleteId), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteId(null);
                setShowDeleteSuccess(true);
            },
        });
    };

    // Membuka popup upload PDF
    const handleOpenUpload = (alat) => {
        setUploadId(alat.id);
        setSelectedPdf(null);

        if (alat.pdf_path) {
            setPreviewUrl(`/storage/${alat.pdf_path}`);
        } else {
            setPreviewUrl(null);
        }
    };

    // Mengirim PDF ke Laravel
    const handleUploadPdf = (e) => {
        e.preventDefault();

        if (!selectedPdf || uploadId === null) {
            return;
        }

        const formData = new FormData();
        formData.append("pdf", selectedPdf);

        router.post(
            route("alatberat.uploadPdf", uploadId),
            formData,
            {
                forceFormData: true,
                preserveScroll: true,
                onStart: () => setIsUploading(true),
                onFinish: () => {
                    setIsUploading(false);
                    setUploadId(null);
                    setSelectedPdf(null);
                },
            }
        );
    };

    // Warna status alat berat
    const statusStyle = (value) => {
        switch (value) {
            case "Siap Operasi":
                return "bg-green-100 text-green-700";
            case "Dalam Perbaikan":
                return "bg-yellow-100 text-yellow-700";
            case "Rusak":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    // Warna status SILO

    const siloStyle = (value) => {
        switch (value) {
            case "Aman":
                return "bg-green-100 text-green-700";
            case "Perlu Perhatian":
                return "bg-yellow-100 text-yellow-700";
            case "Segera Habis":
                return "bg-orange-100 text-orange-700";
            case "Kedaluwarsa":
                return "bg-red-200 text-red-800";
            case "Belum Diatur":
                return "bg-gray-100 text-gray-600";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };


    // Format tanggal
    const formatDate = (date) => {
        if (!date) return "-";

        return new Date(date).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
            timeZone: "UTC",
        });
    };


    return (
        <AlatBeratLayout>
            {/* Popup Konfirmasi Hapus */}
            {deleteId !== null && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-100">
                            <Trash2 size={26} className="text-red-600" />
                        </div>

                        <h3 className="text-xl font-bold text-gray-800">
                            Hapus Data Alat Berat?
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Apakah kamu yakin ingin menghapus data ini? Data yang sudah
                            dihapus tidak dapat dikembalikan.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeleteId(null)}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={confirmDelete}
                                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                            >
                                Ya, Hapus
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Popup Berhasil Dihapus */}
            {showDeleteSuccess && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
                    <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                            <span className="text-3xl">✓</span>
                        </div>

                        <h3 className="text-xl font-bold text-gray-800">
                            Data Berhasil Dihapus!
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            Data alat berat telah berhasil dihapus.
                        </p>

                        <button
                            type="button"
                            onClick={() => setShowDeleteSuccess(false)}
                            className="mt-6 rounded-lg bg-blue-600 px-6 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Oke
                        </button>
                    </div>
                </div>
            )}
            <div className="relative left-1/2 w-[calc(100vw-16rem-5cm)] max-w-none -translate-x-1/2 space-y-6">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-800 md:text-3xl">
                            Daftar Alat Berat
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola dan pantau inventaris alat berat perusahaan.
                        </p>
                    </div>

                    <CheckIsInput allowed={allowedInputter}>
                        <Link
                            href={route("alatberat.create")}
                            className="btn border-0 bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            + Tambah Alat Berat
                        </Link>
                    </CheckIsInput>
                </div>

                {/* Search dan Filter */}
                <form
                    onSubmit={handleSearch}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Cari Alat Berat
                            </label>

                            <input
                                type="search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Nama alat, merk, model, nomor unit, nomor register..."
                                className="input input-bordered w-full"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-semibold text-gray-700">
                                Filter Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="select select-bordered w-full"
                            >
                                <option value="">Semua Status</option>
                                <option value="Siap Operasi">Siap Operasi</option>
                                <option value="Dalam Perbaikan">Dalam Perbaikan</option>
                                <option value="Rusak">Rusak</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <button
                            type="submit"
                            className="btn border-0 bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                            Cari
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="btn btn-outline"
                        >
                            Reset
                        </button>
                    </div>
                </form>

                {/* Jumlah Data */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-gray-600">
                        {alatBerat?.total ?? rows.length} alat berat ditemukan
                    </p>

                    {filters.search && (
                        <p className="text-sm text-gray-600">
                            Pencarian: <strong>{filters.search}</strong>
                        </p>
                    )}
                </div>


                {/* Tabel Data */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-emerald-50 text-gray-700">
                                <th rowSpan={2}>No</th>
                                <th rowSpan={2}>Nama Alat</th>
                                <th rowSpan={2}>Merk</th>
                                <th rowSpan={2}>Model</th>
                                <th rowSpan={2}>Nomor Unit</th>
                                <th rowSpan={2}>Status</th>
                                <th rowSpan={2} className="text-center">
                                    Nomor Register
                                    <br />
                                    DEPNAKER
                                </th>

                                <th colSpan={2} className="text-center">
                                    <div className="flex items-center justify-center gap-2">
                                        <FileText size={18} />
                                        Masa Berlaku SILO
                                    </div>
                                </th>

                                <th rowSpan={2} className="text-center">
                                    Status SILO
                                </th>

                                <CheckIsInput allowed={allowedInputter}>
                                    <th rowSpan={2} className="text-center">
                                        Aksi
                                    </th>
                                </CheckIsInput>
                            </tr>

                            <tr className="bg-emerald-50 text-gray-700">
                                <th className="text-center">Tgl. Surat Keluar</th>
                                <th className="text-center">Tgl. Habis Berlaku</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.length > 0 ? (
                                rows.map((alat, index) => (
                                    <tr key={alat.id}>
                                        <td>{index + 1}</td>

                                        <td className="font-medium">
                                            {alat.nama_alat}
                                        </td>

                                        <td>{alat.merk || "-"}</td>

                                        <td>{alat.model || "-"}</td>

                                        <td>{alat.nomor_unit || "-"}</td>

                                        <td>
                                            <span
                                                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(alat.status)}`}
                                            >
                                                {alat.status || "-"}
                                            </span>
                                        </td>

                                        <td className="whitespace-nowrap">
                                            {alat.nomor_register_depnaker || "-"}
                                        </td>

                                        <td className="whitespace-nowrap text-center">
                                            {formatDate(alat.tanggal_surat_keluar)}
                                        </td>

                                        <td className="whitespace-nowrap text-center">
                                            {formatDate(alat.tanggal_habis_berlaku)}
                                        </td>

                                        <td className="text-center">
                                            <span
                                                className={`whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${siloStyle(alat.status_silo)}`}
                                            >
                                                {alat.status_silo || "-"}
                                            </span>
                                        </td>

                                        <CheckIsInput allowed={allowedInputter}>
                                            <td>
                                                <div className="flex items-center justify-center gap-2">
                                                    {/* Upload */}
                                                    <button
                                                        type="button"
                                                        title="Upload Dokumen SILO"
                                                        onClick={() => handleOpenUpload(alat)}
                                                        className="btn btn-sm btn-square border-0 bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                                                    >
                                                        <Upload size={17} />
                                                    </button>
                                                    {/* Download Dokumen SILO */}
                                                    {alat.pdf_path && (
                                                        <a
                                                            href={`/storage/${alat.pdf_path}`}
                                                            download
                                                            title="Download Dokumen SILO"
                                                            className="btn btn-sm btn-square border-0 bg-purple-100 text-purple-700 hover:bg-purple-200"
                                                        >
                                                            <Download size={17} />
                                                        </a>
                                                    )}
                                                    {/* Edit */}
                                                    <Link
                                                        href={route("alatberat.edit", alat.id)}
                                                        title="Edit Data"
                                                        className="btn btn-sm btn-square border-0 bg-blue-100 text-blue-700 hover:bg-blue-200"
                                                    >
                                                        <Pencil size={17} />
                                                    </Link>


                                                    {/* Hapus */}
                                                    <button
                                                        type="button"
                                                        title="Hapus Data"
                                                        onClick={() => handleDelete(alat.id)}
                                                        className="btn btn-sm btn-square border-0 bg-red-100 text-red-700 hover:bg-red-200"
                                                    >
                                                        <Trash2 size={17} />
                                                    </button>
                                                </div>
                                            </td>
                                        </CheckIsInput>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={11}
                                        className="py-10 text-center text-gray-500"
                                    >
                                        {filters.search || filters.status
                                            ? "Data alat berat tidak ditemukan."
                                            : "Belum ada data alat berat."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* Pagination */}
                {links.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-2">
                        {links.map((link, index) => (
                            <button
                                key={index}
                                type="button"
                                disabled={!link.url || link.active}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(
                                            link.url,
                                            {},
                                            {
                                                preserveState: true,
                                                preserveScroll: true,
                                            }
                                        );
                                    }
                                }}
                                className={`btn btn-sm ${link.active
                                    ? "border-0 bg-emerald-600 text-white"
                                    : "btn-outline"
                                    }`}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Popup Upload PDF SILO */}
            {uploadId !== null && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 p-4">

                    <div className="flex max-h-[90vh] w-full max-w-7xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b px-6 py-4">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">
                                    Upload Dokumen SILO
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Unggah dan lihat dokumen SILO alat berat
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => {
                                    setUploadId(null);
                                    setSelectedPdf(null);
                                    setPreviewUrl(null);
                                }}
                                className="text-2xl text-gray-400 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Dua Kolom */}
                        <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-[0.8fr_1.5fr]">

                            {/* KOLOM KIRI - UPLOAD */}
                            <div className="flex flex-col gap-5">

                                <div>
                                    <h4 className="mb-3 text-base font-bold text-gray-800">
                                        01. Upload File PDF
                                    </h4>

                                    <div className="rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 p-6 text-center">
                                        <FileText
                                            size={48}
                                            className="mx-auto mb-4 text-emerald-600"
                                        />

                                        <p className="mb-3 font-semibold text-gray-700">
                                            Pilih Dokumen PDF SILO
                                        </p>

                                        <input
                                            type="file"
                                            accept=".pdf,application/pdf"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];

                                                if (file) {
                                                    setSelectedPdf(file);
                                                    setPreviewUrl(URL.createObjectURL(file));
                                                }
                                            }}
                                            className="file-input file-input-bordered w-full"
                                        />

                                        <p className="mt-3 text-xs text-gray-500">
                                            Format PDF, maksimal 10 MB
                                        </p>
                                    </div>
                                    {/* Tombol Download Dokumen Lama */}
                                    {activeAlat?.pdf_path && (
                                        <a
                                            href={`/storage/${activeAlat.pdf_path}`}
                                            download
                                            className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-semibold text-blue-700 transition hover:bg-blue-100"
                                        >
                                            <Download size={18} />
                                            Download Dokumen SILO
                                        </a>
                                    )}
                                </div>

                                {selectedPdf && (
                                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                                        <p className="mb-1 text-sm font-semibold text-emerald-800">
                                            File yang dipilih
                                        </p>
                                        <p className="break-all text-sm text-emerald-700">
                                            {selectedPdf.name}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-auto rounded-xl bg-blue-50 p-4 text-sm text-blue-800">
                                    <p className="font-semibold">Informasi</p>
                                    <p className="mt-1">
                                        Pilih PDF baru untuk mengganti dokumen SILO
                                        yang sebelumnya sudah tersimpan.
                                    </p>
                                </div>

                            </div>

                            {/* KOLOM KANAN - PREVIEW */}
                            <div className="flex min-h-[450px] flex-col">

                                <h4 className="mb-3 text-base font-bold text-gray-800">
                                    02. Preview Dokumen
                                </h4>

                                {previewUrl ? (
                                    <div className="min-h-[450px] flex-1 overflow-hidden rounded-xl border border-gray-300 bg-gray-100">
                                        <iframe
                                            src={`${previewUrl}#toolbar=0`}
                                            title="Preview Dokumen SILO"
                                            className="h-full min-h-[450px] w-full"
                                        />
                                    </div>
                                ) : (
                                    <div className="flex min-h-[450px] flex-1 flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400">
                                        <FileText size={60} className="mb-4" />
                                        <p className="font-medium">
                                            Belum ada dokumen SILO
                                        </p>
                                        <p className="mt-2 text-sm">
                                            Pilih file PDF untuk melihat preview
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-end gap-3 border-t bg-white px-6 py-4">

                            <button
                                type="button"
                                onClick={() => {
                                    setUploadId(null);
                                    setSelectedPdf(null);
                                    setPreviewUrl(null);
                                }}
                                className="btn btn-outline"
                                disabled={isUploading}
                            >
                                Batal
                            </button>

                            <button
                                type="button"
                                onClick={handleUploadPdf}
                                disabled={!selectedPdf || isUploading}
                                className="btn border-0 bg-emerald-600 text-white hover:bg-emerald-700"
                            >
                                {isUploading ? "Mengunggah..." : "Upload PDF"}
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </AlatBeratLayout>
    );
}
