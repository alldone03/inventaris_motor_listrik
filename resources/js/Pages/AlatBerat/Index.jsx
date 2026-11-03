
import { useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import AlatBeratLayout from "./AlatBeratLayout";
import CheckIsInput from "@/Components/CheckIsInput";
import { allowedInputter } from "@/Components/allowedInputter";

export default function Index({ alatBerat, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? "");
    const [status, setStatus] = useState(filters.status ?? "");

    const { auth } = usePage().props;
    const user = auth.user;

    // Menerima data biasa maupun pagination Laravel
    const rows = Array.isArray(alatBerat)
        ? alatBerat
        : alatBerat?.data ?? [];

    const links = alatBerat?.links ?? [];

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

    // Hapus data
    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data alat berat ini?")) {
            router.delete(route("alatberat.delete", id), {
                preserveScroll: true,
            });
        }
    };

    // Warna status
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

    return (
        <AlatBeratLayout>
            <div className="space-y-6 p-4 md:p-6">

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
                                placeholder="Nama alat, merk, model, nomor unit, lokasi..."
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
                                <th>No</th>
                                <th>Nama Alat</th>
                                <th>Merk</th>
                                <th>Model</th>
                                <th>Nomor Unit</th>
                                <th>Kapasitas</th>
                                <th>Lokasi</th>
                                <th>Status</th>
                                <CheckIsInput allowed={allowedInputter}>
                                    <th>Aksi</th>
                                </CheckIsInput>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.length > 0 ? (
                                rows.map((alat, index) => (
                                    <tr key={alat.id}>
                                        <td>
                                            {(alatBerat?.from ?? 1) + index}
                                        </td>
                                        <td className="font-medium">
                                            {alat.nama_alat}
                                        </td>
                                        <td>{alat.merk}</td>
                                        <td>{alat.model}</td>
                                        <td>{alat.nomor_unit}</td>
                                        <td>{alat.kapasitas || "-"}</td>
                                        <td>{alat.lokasi || "-"}</td>
                                        <td>
                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyle(alat.status)}`}
                                            >
                                                {alat.status}
                                            </span>
                                        </td>

                                        <CheckIsInput allowed={allowedInputter}>
                                            <td>
                                                <div className="flex gap-2">
                                                    <Link
                                                        href={route("alatberat.edit", alat.id)}
                                                        className="btn btn-sm border-0 bg-blue-600 text-white hover:bg-blue-700"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() => handleDelete(alat.id)}
                                                        className="btn btn-sm border-0 bg-red-600 text-white hover:bg-red-700"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </CheckIsInput>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={9}
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
        </AlatBeratLayout>
    );
}
