import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import GovernorLayout from './GovernorLayout';

// Terima 'governor' (atau data object dari database) beserta 'record' (ID)
export default function Uploadpdf({ record, governor }) {
    const [pdfFile, setPdfFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // useEffect untuk mengecek apakah sudah ada PDF di database saat halaman pertama kali dibuka
    useEffect(() => {
        if (governor && governor.pdf_path) {
            // Asumsi file disimpan di storage publik Laravel (/storage/...)
            setPreviewUrl(`/storage/${governor.pdf_path}`);
            // console.log(`/storage/${governor.pdf_path}`);
        }
    }, [governor]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            console.log("File baru dipilih:", file);
            setPdfFile(file);

            // Buat temporary URL untuk file lokal yang baru dipilih
            const fileUrl = URL.createObjectURL(file);
            setPreviewUrl(fileUrl);
        }
    };

    // Cleanup URL object jika user memilih file baru (untuk mencegah memory leak)
    useEffect(() => {
        return () => {
            // Hanya revoke jika URL berasal dari createObjectURL (bukan dari database /storage/)
            if (previewUrl && previewUrl.startsWith('blob:')) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!pdfFile) return;

        const formData = new FormData();
        formData.append('pdf_file', pdfFile);

        router.post(
            route('governor.uploadedpdf', record || governor?.id),
            formData,
            {
                onSuccess: () => {
                    // Redirect kembali ke halaman index setelah sukses
                    router.get(route('governor.index'));
                },
            }
        );
    };

    return (
        <GovernorLayout>
            <div className="py-6 max-w-3xl mx-auto">
                <div className="bg-white rounded-xl shadow-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary p-4 text-white">
                        <h3 className="text-lg font-semibold">Upload & Preview PDF Governor</h3>
                    </div>

                    {/* Body Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">
                                Pilih file PDF {governor?.pdf_path && "(Ganti file yang sudah ada)"}
                            </label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                            />
                            <p className="text-xs mt-1 text-gray-500">Max 2MB</p>
                        </div>
                        <a
                            href={`/storage/${governor.pdf_path}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-secondary"
                        >
                            Print
                        </a>

                        {/* Area Preview PDF (Membaca dari Database atau File Baru) */}
                        {previewUrl ? (
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2 text-gray-700">
                                    Preview Dokumen:
                                </label>
                                <div className="w-full h-[450px] border border-gray-300 rounded-lg overflow-hidden bg-gray-50 shadow-inner">
                                    <iframe
                                        src={`${previewUrl}#toolbar=0`}
                                        title="PDF Preview"
                                        className="w-full h-full"
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="mb-6 flex flex-col items-center justify-center h-48 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-gray-400 text-sm">
                                <span>Belum ada file PDF yang di-upload atau dipilih</span>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => window.history.back()}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                                Kembali
                            </button>

                            {/* Tombol Upload */}
                            <button
                                type="submit"
                                disabled={!pdfFile} // Tombol terkunci jika belum memilih file *baru*
                                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Upload PDF
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </GovernorLayout>
    );
}