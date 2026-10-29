import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import GovernorLayout from "./GovernorLayout";


export default function GovernorCreate() {
    const [isOcrOpen, setIsOcrOpen] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        item_no: '',
        governor_type: '',
        rotation: '',
        speed_range_rpm: '',
        part_no: '',
        serial_no: '',
        ket: '',
        stock_code: '',
        area: '',
        pabrik: '',
    });
    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('governor.store'), {
            onSuccess: () => reset(),
        });
    };
    const fields = [
        { name: 'item_no', label: 'Item No', placeholder: 'Contoh: 2001-JT' },
        { name: 'governor_type', label: 'Governor Type', placeholder: 'Contoh: TG-13' },
        { name: 'rotation', label: 'Rotation', placeholder: 'Contoh: CCW / CW' },
        { name: 'speed_range_rpm', label: 'Speed Range (RPM)', placeholder: 'Contoh: 4000' },
        { name: 'part_no', label: 'Part No', placeholder: 'Masukkan part number' },
        { name: 'serial_no', label: 'Serial No', placeholder: 'Masukkan serial number' },
        { name: 'ket', label: 'Keterangan', placeholder: 'Masukkan keterangan' },
        { name: 'stock_code', label: 'Stock / Code', placeholder: 'Masukkan stock code' },
        { name: 'area', label: 'Area', placeholder: 'Contoh: UTILITY' },
        { name: 'pabrik', label: 'Pabrik', placeholder: 'Contoh: 1A' },
    ];
    return (
        <GovernorLayout>
            <Head title="Tambah Governor Baru - Bengkel Listrik Pupuk Kujang" />
            <h1>Tambah Governor</h1>
            <div className="min-h-screen bg-slate-50 p-6">
                <div className="mx-auto max-w-5xl">
                    {/* Header */}
                    <div className="mb-6">
                        <Link
                            href={route('governor.index')}
                            className="text-sm font-medium text-blue-600 hover:text-blue-800"
                        >
                            &larr; Kembali ke Data Governor
                        </Link>

                        <h1 className="mt-3 text-2xl font-bold text-slate-800">
                            Tambah Data Governor
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Masukkan informasi peralatan governor ke dalam database.
                        </p>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"
                    >
                        <div className="mb-6 border-b border-slate-200 pb-4">
                            <h2 className="text-lg font-semibold text-slate-800">
                                Informasi Peralatan
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Lengkapi kolom data peralatan berikut.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                            {fields.map((field) => (
                                <div key={field.name}>
                                    <label
                                        htmlFor={field.name}
                                        className="mb-2 block text-sm font-medium text-slate-700"
                                    >
                                        {field.label}
                                    </label>

                                    <input
                                        id={field.name}
                                        type="text"
                                        value={data[field.name]}
                                        onChange={(e) =>
                                            setData(field.name, e.target.value)
                                        }
                                        placeholder={field.placeholder}
                                        className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 ${errors[field.name]
                                            ? 'border-red-500'
                                            : 'border-slate-300'
                                            }`}
                                    />

                                    {errors[field.name] && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors[field.name]}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="mt-8 flex flex-col-reverse justify-end gap-3 border-t border-slate-200 pt-5 sm:flex-row">
                            <button
                                type="button"
                                onClick={() => reset()}
                                disabled={processing}
                                className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Reset Form
                            </button>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Data'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>


        </GovernorLayout>
    )
}
