import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { createWorker } from 'tesseract.js';
import heic2any from 'heic2any';
import { 
    Camera, 
    Upload, 
    X, 
    Sparkles, 
    Search, 
    RotateCw, 
    Crop, 
    CheckCircle2,
    Image as ImageIcon,
    AlertCircle,
    Loader2
} from 'lucide-react';

export default function OcrScannerModal({ isOpen, onClose, onSelectResult }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [isConvertingHeic, setIsConvertingHeic] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [extractedItem, setExtractedItem] = useState('');
    const [rawText, setRawText] = useState('');
    const [cameraActive, setCameraActive] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    if (!isOpen) return null;

    const resetState = () => {
        setImageSrc(null);
        setCrop(null);
        setCompletedCrop(null);
        setIsScanning(false);
        setIsConvertingHeic(false);
        setProgress(0);
        setStatusText('');
        setExtractedItem('');
        setRawText('');
        setErrorMessage('');
        stopCamera();
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setErrorMessage('');
            setExtractedItem('');
            setRawText('');

            const fileNameLower = file.name.toLowerCase();
            const isHeic = fileNameLower.endsWith('.heic') || 
                           fileNameLower.endsWith('.heif') || 
                           file.type === 'image/heic' || 
                           file.type === 'image/heif';

            if (isHeic) {
                setIsConvertingHeic(true);
                setStatusText('Mengonversi foto HEIC iPhone...');
                try {
                    const convertedBlob = await heic2any({
                        blob: file,
                        toType: 'image/jpeg',
                        quality: 0.92,
                    });
                    const blobToRead = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        setImageSrc(event.target.result);
                        setIsConvertingHeic(false);
                    };
                    reader.readAsDataURL(blobToRead);
                } catch (err) {
                    console.error('HEIC conversion error:', err);
                    setErrorMessage('Gagal mengonversi format HEIC. Pastikan file tidak terkunci atau rusak.');
                    setIsConvertingHeic(false);
                }
            } else {
                const reader = new FileReader();
                reader.onload = (event) => {
                    setImageSrc(event.target.result);
                };
                reader.onerror = () => {
                    setErrorMessage('Gagal membaca berkas gambar. Format mungkin rusak atau tidak didukung.');
                };
                reader.readAsDataURL(file);
            }
        }
        // Reset input value so re-uploading same file triggers onChange
        if (e.target) {
            e.target.value = '';
        }
    };

    const onImageLoaded = (img) => {
        imgRef.current = img;
        const naturalW = img.width || 300;
        const naturalH = img.height || 200;
        const width = naturalW * 0.75;
        const height = naturalH * 0.45;
        const x = (naturalW - width) / 2;
        const y = (naturalH - height) / 2;
        
        const initialCrop = {
            unit: 'px',
            x: Math.max(0, x),
            y: Math.max(0, y),
            width: Math.max(50, width),
            height: Math.max(30, height),
        };
        setCrop(initialCrop);
        setCompletedCrop(initialCrop);
    };

    const startCamera = async () => {
        try {
            setErrorMessage('');
            setCameraActive(true);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Camera access error:', err);
            setErrorMessage('Tidak dapat mengakses kamera. Pastikan izin kamera aktif.');
            setCameraActive(false);
        }
    };

    const stopCamera = () => {
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        setCameraActive(false);
    };

    const captureCameraPhoto = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth || 640;
            canvas.height = video.videoHeight || 480;
            const ctx = canvas.getContext('2d');
            
            // Fill with white background
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            
            const dataUrl = canvas.toDataURL('image/png');
            setImageSrc(dataUrl);
            stopCamera();
            setExtractedItem('');
            setRawText('');
        }
    };

    const getCroppedCanvas = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        const pixelCropX = crop.x * scaleX;
        const pixelCropY = crop.y * scaleY;
        const pixelCropWidth = crop.width * scaleX;
        const pixelCropHeight = crop.height * scaleY;

        canvas.width = Math.max(1, pixelCropWidth);
        canvas.height = Math.max(1, pixelCropHeight);
        const ctx = canvas.getContext('2d');

        // Solid white background to prevent PNG transparency from becoming black
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(
            image,
            pixelCropX,
            pixelCropY,
            pixelCropWidth,
            pixelCropHeight,
            0,
            0,
            pixelCropWidth,
            pixelCropHeight
        );

        return canvas;
    };

    const cleanItemCode = (text) => {
        if (!text) return '';

        // 1. Try regex pattern match like "2213-JA", "1102-FA", "3305-MB", "2213_JA", "2213 JA"
        const itemPattern = /\b([0-9]{3,4}\s*[-–_ ]\s*[A-Z]{1,3})\b/i;
        const match = text.match(itemPattern);
        if (match) {
            return match[1].replace(/\s+/g, '-').replace(/[_–]/g, '-').toUpperCase();
        }

        // 2. Try pattern "ITEM: 2213-JA" or "ITEM NO: ..."
        const itemKeywordMatch = text.match(/ITEM(?:\s*(?:NO|CODE|TAG)?)\s*[:=\-]?\s*([A-Z0-9\-_/ ]+)/i);
        if (itemKeywordMatch) {
            const candidate = itemKeywordMatch[1].trim().split('\n')[0].trim();
            return candidate.replace(/\s+/g, '-').toUpperCase();
        }

        // 3. Fallback: Take the cleanest single line from the cropped selection
        const lines = text
            .split('\n')
            .map(l => l.trim())
            .filter(l => l.length >= 2);

        if (lines.length > 0) {
            const bestLine = lines.find(l => /[0-9]/.test(l) && /[A-Za-z]/.test(l)) || lines[0];
            return bestLine.replace(/[^A-Za-z0-9\-_/ ]/g, '').trim().toUpperCase();
        }

        return text.trim().toUpperCase();
    };

    const processOcr = async (useCrop = true) => {
        if (!imageSrc) return;

        setErrorMessage('');
        let targetCanvasOrImage = imageSrc;

        if (useCrop && completedCrop && completedCrop.width > 5 && completedCrop.height > 5 && imgRef.current) {
            targetCanvasOrImage = getCroppedCanvas(imgRef.current, completedCrop);
        }

        setIsScanning(true);
        setProgress(10);
        setStatusText('Menyiapkan OCR Engine...');

        try {
            const worker = await createWorker('eng', 1, {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 80) + 15);
                        setStatusText(`Membaca huruf & angka Item... ${Math.round(m.progress * 100)}%`);
                    } else {
                        setStatusText(m.status);
                    }
                }
            });

            setStatusText('Mengekstrak teks item...');
            const ret = await worker.recognize(targetCanvasOrImage);
            const recognized = ret.data.text || '';
            
            setRawText(recognized);
            const detectedItem = cleanItemCode(recognized);
            setExtractedItem(detectedItem);

            await worker.terminate();
            setProgress(100);
            setStatusText('Selesai!');
        } catch (error) {
            console.error('OCR Error:', error);
            setErrorMessage('Gagal memproses gambar OCR. Pastikan format gambar valid.');
            setStatusText('Terjadi kendala.');
        } finally {
            setIsScanning(false);
        }
    };

    const handleExecuteSearch = () => {
        if (extractedItem && onSelectResult) {
            onSelectResult(extractedItem);
            handleClose();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-6 max-h-[92vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white/15 backdrop-blur rounded-xl">
                            <Crop className="h-5 w-5 text-amber-300" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                                OCR Pemindai Kode Item Motor
                            </h3>
                            <p className="text-xs text-emerald-100">
                                Mendukung <strong>HEIC (iPhone), JPG, JPEG, PNG, WEBP</strong>
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Body Content */}
                <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
                    {/* Error message banner */}
                    {errorMessage && (
                        <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                            <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                            <span>{errorMessage}</span>
                        </div>
                    )}

                    {/* HEIC Converting loader */}
                    {isConvertingHeic && (
                        <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-center space-y-2">
                            <Loader2 className="h-7 w-7 text-amber-600 animate-spin mx-auto" />
                            <p className="text-xs font-bold">Mengonversi format HEIC iPhone ke format gambar web...</p>
                            <p className="text-[11px] text-amber-700">Mohon tunggu beberapa saat.</p>
                        </div>
                    )}

                    {/* Camera view if active */}
                    {cameraActive && (
                        <div className="relative rounded-2xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center">
                            <video
                                ref={videoRef}
                                autoPlay
                                playsInline
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-4 flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={captureCameraPhoto}
                                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
                                >
                                    <Camera className="h-4 w-4" /> Ambil Foto
                                </button>
                                <button
                                    type="button"
                                    onClick={stopCamera}
                                    className="px-4 py-2.5 bg-slate-700/80 hover:bg-slate-700 text-white rounded-xl text-sm"
                                >
                                    Batal
                                </button>
                            </div>
                        </div>
                    )}

                    <canvas ref={canvasRef} className="hidden" />

                    {/* Image Upload / Crop Interface */}
                    {!cameraActive && !isConvertingHeic && (
                        <div>
                            {imageSrc ? (
                                <div className="space-y-4">
                                    {/* Crop Instructions & Actions Bar */}
                                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                                            <Crop className="h-4 w-4 text-emerald-600 shrink-0" />
                                            <span>Sesuaikan kotak seleksi pada tulisan <strong>Kode Item</strong> (contoh: 2213-JA)</span>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5"
                                            >
                                                <RotateCw className="h-3.5 w-3.5" /> Ganti Foto
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => processOcr(true)}
                                                disabled={isScanning}
                                                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 disabled:opacity-50"
                                            >
                                                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                                                <span>Baca Item (OCR)</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Crop Area Container */}
                                    <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-950 flex items-center justify-center p-2 min-h-[240px] max-h-[380px]">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            className="max-h-[360px] flex items-center justify-center"
                                        >
                                            <img
                                                ref={imgRef}
                                                src={imageSrc}
                                                alt="Nameplate to Crop"
                                                onLoad={(e) => onImageLoaded(e.currentTarget)}
                                                style={{ maxHeight: '360px', maxWidth: '100%', objectFit: 'contain' }}
                                                crossOrigin="anonymous"
                                            />
                                        </ReactCrop>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-emerald-50/50 hover:bg-emerald-50 group"
                                    >
                                        <div className="p-4 bg-emerald-100 text-emerald-700 rounded-2xl mb-3 group-hover:scale-105 transition">
                                            <Upload className="h-7 w-7" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm">Unggah Foto Nameplate</h4>
                                        <p className="text-xs text-slate-500 mt-1">
                                            Format <strong>HEIC (iPhone), JPG, JPEG, PNG</strong>
                                        </p>
                                    </div>

                                    <div
                                        onClick={startCamera}
                                        className="border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-teal-50/50 hover:bg-teal-50 group"
                                    >
                                        <div className="p-4 bg-teal-100 text-teal-700 rounded-2xl mb-3 group-hover:scale-105 transition">
                                            <Camera className="h-7 w-7" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm">Gunakan Kamera</h4>
                                        <p className="text-xs text-slate-500 mt-1">Foto fisik nameplate motor langsung</p>
                                    </div>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif,.heic,.heif,image/*"
                                className="hidden"
                                onChange={handleFileUpload}
                            />
                        </div>
                    )}

                    {/* Progress Bar while scanning */}
                    {isScanning && (
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-700">
                                <span className="flex items-center gap-1.5">
                                    <RotateCw className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                                    {statusText || 'Sedang membaca teks OCR...'}
                                </span>
                                <span className="text-emerald-700">{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2.5 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Extracted Item Display & Direct Search */}
                    {extractedItem && !isScanning && (
                        <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 space-y-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    Hasil Pembacaan Item Terdeteksi
                                </span>
                                <span className="text-[10px] font-semibold text-slate-400">
                                    Dapat diedit jika perlu koreksi
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={extractedItem}
                                        onChange={(e) => setExtractedItem(e.target.value)}
                                        className="w-full px-4 py-3 bg-white border border-emerald-300 rounded-xl font-mono font-black text-xl text-slate-900 tracking-tight focus:ring-2 focus:ring-emerald-500 shadow-xs"
                                        placeholder="Kode Item..."
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleExecuteSearch}
                                    className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-2 shrink-0"
                                >
                                    <Search className="h-4 w-4" />
                                    <span>Cari Item Ini Sekarang</span>
                                </button>
                            </div>

                            {rawText && (
                                <p className="text-[11px] text-slate-500 truncate">
                                    <span className="font-semibold text-slate-600">Teks mentah terbaca:</span> {rawText.replace(/\n+/g, ' ')}
                                </p>
                            )}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                    <span className="text-xs text-slate-400">
                        {imageSrc ? 'Pilih area item lalu klik "Baca Item (OCR)".' : 'Pilih atau foto nameplate motor.'}
                    </span>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/70 font-semibold text-xs transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
