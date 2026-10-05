import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, router } from '@inertiajs/react';
import { User, Plus, Edit, Trash2, X, Save } from 'lucide-react';

export default function ApproversIndex({ approvers }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingApprover, setEditingApprover] = useState(null);

    const { data, setData, post, put, reset, processing, errors } = useForm({
        nama: '',
        jabatan: '',
    });

    const openCreateModal = () => {
        setEditingApprover(null);
        reset();
        setIsModalOpen(true);
    };

    const openEditModal = (approver) => {
        setEditingApprover(approver);
        setData({
            nama: approver.nama,
            jabatan: approver.jabatan,
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingApprover) {
            put(route('approvers.update', editingApprover.id), {
                onSuccess: () => closeModal(),
            });
        } else {
            post(route('approvers.store'), {
                onSuccess: () => closeModal(),
            });
        }
    };

    const handleDelete = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus data persetujuan ini?')) {
            router.delete(route('approvers.destroy', id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-teal-100 text-teal-800">
                                <User className="h-6 w-6" />
                            </span>
                            Persetujuan & Pengesahan
                        </h2>
                        <p className="text-xs text-slate-500 mt-1">
                            Kelola daftar nama dan jabatan untuk keperluan tanda tangan form checklist.
                        </p>
                    </div>
                    <button
                        onClick={openCreateModal}
                        className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition"
                    >
                        <Plus className="h-4 w-4" />
                        <span>Tambah Pengesahan</span>
                    </button>
                </div>
            }
        >
            <Head title="Persetujuan & Pengesahan" />

            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden max-w-4xl mx-auto">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-sm">
                        <thead>
                            <tr className="bg-slate-900 text-slate-200 border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider">
                                <th className="py-3.5 px-4">Nama Lengkap</th>
                                <th className="py-3.5 px-4">Jabatan</th>
                                <th className="py-3.5 px-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                            {approvers.map((approver) => (
                                <tr key={approver.id} className="hover:bg-slate-50 transition">
                                    <td className="py-3.5 px-4 font-semibold text-slate-900">{approver.nama}</td>
                                    <td className="py-3.5 px-4 text-slate-600">{approver.jabatan}</td>
                                    <td className="py-3.5 px-4 text-center whitespace-nowrap">
                                        <div className="flex items-center justify-center gap-2">
                                            <button
                                                onClick={() => openEditModal(approver)}
                                                className="p-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white transition"
                                            >
                                                <Edit className="h-4 w-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(approver.id)}
                                                className="p-1.5 rounded-lg bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white transition"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {approvers.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="py-8 text-center text-slate-500 text-sm">
                                        Belum ada data pengesahan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeModal}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                            <h3 className="font-bold text-slate-900">
                                {editingApprover ? 'Edit Pengesahan' : 'Tambah Pengesahan Baru'}
                            </h3>
                            <button onClick={closeModal} className="text-slate-400 hover:text-slate-600">
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Nama Lengkap</label>
                                <input
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                                {errors.nama && <p className="text-xs text-rose-500 mt-1">{errors.nama}</p>}
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan</label>
                                <input
                                    type="text"
                                    value={data.jabatan}
                                    onChange={(e) => setData('jabatan', e.target.value)}
                                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500"
                                    required
                                />
                                {errors.jabatan && <p className="text-xs text-rose-500 mt-1">{errors.jabatan}</p>}
                            </div>
                            <div className="pt-4 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold transition"
                                >
                                    Batal
                                </button>
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition flex items-center gap-1.5"
                                >
                                    <Save className="h-4 w-4" />
                                    <span>Simpan</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
