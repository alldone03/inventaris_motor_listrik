import { useState } from 'react';
import { router } from '@inertiajs/react';
import GovernorLayout from './GovernorLayout';

export default function Uploadpdf() {
    const [pdfFile, setPdfFile] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('pdf_file', pdfFile);

        router.post(
            route('governor.uploadpdf', recordId),
            formData,
            {
                onSuccess: () => {
                    onClose();
                },
            }
        );
    };



    return (
        <GovernorLayout>
            <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-screen items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

                    <div className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-xl transition-all">
                        {/* Header */}
                        <div className="bg-primary p-4 text-white">
                            <h3 className="text-lg font-semibold">Upload PDF</h3>
                        </div>

                        {/* Body */}
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-2">
                                    Pilih file PDF
                                </label>

                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={(e) =>
                                        setPdfFile(e.target.files[0])
                                    }
                                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                                />

                                <p className="text-xs mt-1 text-gray-500">
                                    Max 2MB
                                </p>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"

                                    className="rounded-lg border border-gray-300 px-4 py-2"
                                >
                                    Batal
                                </button>

                                <button
                                    type="submit"

                                    className="rounded-lg bg-primary px-4 py-2 text-white disabled:opacity-50"
                                >
                                    Upload
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GovernorLayout>
    );
}