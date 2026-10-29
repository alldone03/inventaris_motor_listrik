
import { useState } from "react";
import { Link, router } from "@inertiajs/react";
import GovernorLayout from "./GovernorLayout";

export default function GovernorIndex({ governors, filters = {} }) {
    const [search, setSearch] = useState(filters.search ?? "");

    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route("governor.index"),
            {
                search: search.trim(),
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleReset = () => {
        setSearch("");

        router.get(
            route("governor.index"),
            {},
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    const handleDelete = (id) => {
        if (confirm("Yakin ingin menghapus data Governor ini?")) {
            router.delete(route("governor.delete", id), {
                preserveScroll: true,
            });
        }
    };

    // Mendukung pagination Laravel
    const rows = Array.isArray(governors)
        ? governors
        : governors?.data ?? [];

    const links = governors?.links ?? [];

    return (
        <GovernorLayout>
            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">
                            Governor Data
                        </h1>
                        <p className="mt-1 text-sm text-gray-500">
                            Kelola dan cari data peralatan Governor.
                        </p>
                    </div>

                    <Link
                        href={route("governor.create")}
                        className="btn btn-primary"
                    >
                        + Tambah Governor
                    </Link>
                </div>

                {/* Search */}
                <form
                    onSubmit={handleSearch}
                    className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                    <label
                        htmlFor="governor-search"
                        className="mb-2 block text-sm font-semibold text-gray-700"
                    >
                        Cari Data Governor
                    </label>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            id="governor-search"
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Item No, Type, Rotation, Part No, Serial No, Area, Pabrik..."
                            className="input input-bordered w-full"
                        />

                        <button
                            type="submit"
                            className="btn btn-primary"
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

                    <p className="mt-2 text-xs text-gray-500">
                        Kosongkan pencarian dan klik Reset untuk melihat
                        semua data Governor.
                    </p>
                </form>

                {/* Informasi jumlah data */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm text-gray-600">
                        {governors?.total ?? rows.length} data ditemukan
                    </p>

                    {filters.search && (
                        <p className="text-sm text-gray-600">
                            Kata pencarian:{" "}
                            <span className="font-semibold">
                                {filters.search}
                            </span>
                        </p>
                    )}
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr className="bg-slate-100 text-slate-700">
                                <th>No</th>
                                <th>Item No</th>
                                <th>Governor Type</th>
                                <th>Rotation</th>
                                <th>Speed Range (RPM)</th>
                                <th>Part No</th>
                                <th>Serial No</th>
                                <th>Ket</th>
                                <th>Stock Code</th>
                                <th>Area</th>
                                <th>Pabrik</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {rows.length > 0 ? (
                                rows.map((governor, index) => (
                                    <tr key={governor.id}>
                                        <td>
                                            {(governors?.from ?? 1) +
                                                index}
                                        </td>
                                        <td>{governor.item_no}</td>
                                        <td>{governor.governor_type}</td>
                                        <td>{governor.rotation}</td>
                                        <td>{governor.speed_range_rpm}</td>
                                        <td>{governor.part_no}</td>
                                        <td>{governor.serial_no || "-"}</td>
                                        <td>{governor.ket || "-"}</td>
                                        <td>{governor.stock_code}</td>
                                        <td>{governor.area}</td>
                                        <td>{governor.pabrik}</td>

                                        <td>
                                            <div className="flex gap-2">
                                                <Link
                                                    href={route(
                                                        "governor.edit",
                                                        governor.id
                                                    )}
                                                    className="btn btn-sm btn-primary"
                                                >
                                                    Edit
                                                </Link>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleDelete(
                                                            governor.id
                                                        )
                                                    }
                                                    className="btn btn-sm border-0 bg-red-600 text-white hover:bg-red-700"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={12}
                                        className="py-10 text-center text-gray-500"
                                    >
                                        {filters.search
                                            ? "Data Governor tidak ditemukan."
                                            : "Belum ada data Governor."}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {links.length > 0 && (
                    <div className="flex flex-wrap items-center justify-center gap-2">
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
                                    ? "btn-primary"
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
        </GovernorLayout>
    );
}
