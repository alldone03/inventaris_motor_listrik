
import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Plus, Search, RotateCcw, Package, ChevronLeft, ChevronRight } from 'lucide-react';
import AlatPrimerLayout from './AlatPrimerLayout';

export default function Index({ alatPrimers, filters }) {
    const handleSearch = (e) => {
        e.preventDefault();

        router.get(
            route('alatprimer.index'),
            { search: filters.search || '' },
            { preserveState: true, replace: true }
        );
    };

    const handleReset = () => {
        router.get(route('alatprimer.index'));
    };

    return (
        <AlatPrimerLayout>
            <Head title="Daftar Alat Primer" />

            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Daftar Alat Primer
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Data inventaris peralatan instrumentasi.
                        </p>
                    </div>

                    <Link
                        href={route('alatprimer.create')}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700"
                    >
                        <Plus size={18} />
                        Tambah Alat
                    </Link>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                    <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
                        <div className="relative flex-1">
                            <Search
                                size={18}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                defaultValue={filters?.search || ''}
                                name="search"
                                placeholder="Cari nama, merk, atau serial number..."
                                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                onChange={(e) => {
                                    filters.search = e.target.value;
                                }}
                            />
                        </div>

                        <button
                            type="submit"
                            className="px-5 py-2.5 rounded-xl bg-slate-800 text-white text-sm font-semibold hover:bg-slate-700"
                        >
                            Cari
                        </button>

                        <button
                            type="button"
                            onClick={handleReset}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm hover:bg-slate-50"
                        >
                            <RotateCcw size={16} />
                            Reset
                        </button>
                    </form>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                    <div className="p-5 border-b border-slate-200 flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                            <Package size={20} />
                        </div>
                        <div>
                            <h2 className="font-bold text-slate-800">
                                Data Alat Primer
                            </h2>
                            <p className="text-xs text-slate-500">
                                Total {alatPrimers.total} data
                            </p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                                <tr>
                                    <th className="px-5 py-4">No</th>
                                    <th className="px-5 py-4">Nama Alat</th>
                                    <th className="px-5 py-4">Merk</th>
                                    <th className="px-5 py-4">Serial Number</th>
                                    <th className="px-5 py-4">Range</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-100">
                                {alatPrimers.data.length > 0 ? (
                                    alatPrimers.data.map((alat, index) => (
                                        <tr key={alat.id} className="hover:bg-slate-50">
                                            <td className="px-5 py-4 text-slate-500">
                                                {alatPrimers.from + index}
                                            </td>
                                            <td className="px-5 py-4 font-semibold text-slate-800">
                                                {alat.nama}
                                            </td>
                                            <td className="px-5 py-4 text-slate-600">
                                                {alat.merk}
                                            </td>
                                            <td className="px-5 py-4 text-slate-600">
                                                {alat.serial_number}
                                            </td>
                                            <td className="px-5 py-4 text-slate-600">
                                                {alat.range}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="px-5 py-12 text-center">
                                            <Package size={32} className="mx-auto text-slate-300 mb-3" />
                                            <p className="font-semibold text-slate-600">
                                                Belum ada data alat primer
                                            </p>
                                            <p className="text-xs text-slate-400 mt-1">
                                                Silakan tambahkan data alat terlebih dahulu.
                                            </p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {alatPrimers.links && alatPrimers.links.length > 3 && (
                        <div className="p-4 border-t border-slate-200 flex justify-between items-center">
                            <span className="text-xs text-slate-500">
                                Menampilkan {alatPrimers.from || 0}–{alatPrimers.to || 0} dari {alatPrimers.total} data
                            </span>

                            <div className="flex gap-1">
                                {alatPrimers.links.map((link, index) => (
                                    <button
                                        key={index}
                                        disabled={!link.url}
                                        onClick={() => link.url && router.visit(link.url)}
                                        className={`px-3 py-2 rounded-lg text-xs ${link.active
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white border border-slate-200 text-slate-600'
                                            } disabled:opacity-40`}
                                    >
                                        {index === 0 ? <ChevronLeft size={14} /> :
                                            index === alatPrimers.links.length - 1 ? <ChevronRight size={14} /> :
                                                <span dangerouslySetInnerHTML={{ __html: link.label }} />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AlatPrimerLayout>
    );
}
