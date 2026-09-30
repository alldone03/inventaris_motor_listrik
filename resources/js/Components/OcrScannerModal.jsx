import React, { useState, useRef } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { createWorker } from 'tesseract.js';
import { 
    Camera, 
    Upload, 
    X, 
    Sparkles, 
    Check, 
    RotateCw, 
    Crop, 
    Maximize2, 
    Zap, 
    Image as ImageIcon,
    CheckCircle2
} from 'lucide-react';

export default function OcrScannerModal({ isOpen, onClose, onSelectResult, onPrefillForm }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [crop, setCrop] = useState(null);
    const [completedCrop, setCompletedCrop] = useState(null);
    const [croppedPreviewUrl, setCroppedPreviewUrl] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const imgRef = useRef(null);

    if (!isOpen) return null;

    const resetState = () => {
        setImageSrc(null);
        setCrop(null);
        setCompletedCrop(null);
        setCroppedPreviewUrl(null);
        setIsScanning(false);
        setProgress(0);
        setStatusText('');
        setExtractedText('');
        setParsedData(null);
        stopCamera();
    };

    const handleClose = () => {
        resetState();
        onClose();
    };

    const handleFileUpload = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setImageSrc(event.target.result);
                setExtractedText('');
                setParsedData(null);
                setCroppedPreviewUrl(null);
            };
            reader.readAsDataURL(file);
        }
    };

    const onImageLoaded = (img) => {
        imgRef.current = img;
        // Default initial crop box (e.g. 80% width, 60% height in center)
        const width = img.width * 0.8;
        const height = img.height * 0.6;
        const x = (img.width - width) / 2;
        const y = (img.height - height) / 2;
        
        const initialCrop = {
            unit: 'px',
            x,
            y,
            width,
            height,
        };
        setCrop(initialCrop);
        setCompletedCrop(initialCrop);
    };

    const startCamera = async () => {
        try {
            setCameraActive(true);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
        } catch (err) {
            console.error('Camera access error:', err);
            alert('Tidak dapat mengakses kamera. Pastikan izin kamera telah diberikan.');
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
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
            setImageSrc(dataUrl);
            stopCamera();
            setExtractedText('');
            setParsedData(null);
        }
    };

    const getCroppedImageBlob = (image, crop) => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        
        const pixelCropX = crop.x * scaleX;
        const pixelCropY = crop.y * scaleY;
        const pixelCropWidth = crop.width * scaleX;
        const pixelCropHeight = crop.height * scaleY;

        canvas.width = pixelCropWidth;
        canvas.height = pixelCropHeight;
        const ctx = canvas.getContext('2d');

        // Enhance image contrast for OCR
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

        return canvas.toDataURL('image/jpeg', 0.95);
    };

    const parseMotorInfo = (text) => {
        let foundItem = '';
        let foundHpKw = '';
        let foundVolt = '';
        let foundAmp = '';
        let foundRpm = '';
        let foundMfg = '';
        let foundFrame = '';
        let foundIp = '';
        let foundFreq = '';

        // Match item code format like 2213-JA, 1102-FA, etc.
        const itemRegex = /\b([0-9]{3,4}\s*[-–_]\s*[A-Z]{1,3})\b/i;
        const itemMatch = text.match(itemRegex);
        if (itemMatch) {
            foundItem = itemMatch[1].replace(/\s+/g, '').toUpperCase();
        } else {
            const itemKeywordMatch = text.match(/ITEM\s*[:=\-]?\s*([A-Z0-9\-_]+)/i);
            if (itemKeywordMatch) {
                foundItem = itemKeywordMatch[1].trim().toUpperCase();
            }
        }

        // If cropped area is small and contains a short alphanumeric item directly (e.g. "2213-JA" or "2213 JA")
        if (!foundItem) {
            const cleanText = text.trim().replace(/\s+/g, ' ');
            if (cleanText.length > 2 && cleanText.length <= 25) {
                const simpleCandidate = cleanText.split('\n')[0].trim();
                if (/^[A-Z0-9\-_/ ]+$/i.test(simpleCandidate)) {
                    foundItem = simpleCandidate.toUpperCase();
                }
            }
        }

        // Match Voltage (e.g. 440 V, 380V, 380/660 V)
        const voltMatch = text.match(/(\d{3}(?:\s*[\/]\s*\d{3})?)\s*V(?:OLTS?|OLTAGE)?\b/i);
        if (voltMatch) {
            foundVolt = voltMatch[1].replace(/\s+/g, '') + ' V';
        }

        // Match Power kW / HP
        const kwMatch = text.match(/(\d+(?:\.\d+)?)\s*(?:KW|KILOWATT)/i);
        const hpMatch = text.match(/(\d+(?:\.\d+)?)\s*HP/i);
        if (kwMatch && hpMatch) {
            foundHpKw = `${hpMatch[1]} HP / ${kwMatch[1]} kW`;
        } else if (hpMatch) {
            foundHpKw = `${hpMatch[1]} HP`;
        } else if (kwMatch) {
            foundHpKw = `${kwMatch[1]} kW`;
        }

        // Match Ampere
        const ampMatch = text.match(/(\d+(?:\.\d+)?)\s*A(?:MP|MPERE)?\b/i);
        if (ampMatch) {
            foundAmp = ampMatch[1] + ' A';
        }

        // Match RPM
        const rpmMatch = text.match(/(\d{3,4})\s*RPM\b/i);
        if (rpmMatch) {
            foundRpm = rpmMatch[1] + ' RPM';
        }

        // Match Frequency
        const freqMatch = text.match(/(\d{2})\s*HZ\b/i);
        if (freqMatch) {
            foundFreq = freqMatch[1] + ' Hz';
        }

        // Match IP Rating
        const ipMatch = text.match(/IP\s*[:=\-]?\s*(\d{2})/i);
        if (ipMatch) {
            foundIp = ipMatch[1];
        }

        // Match Frame
        const frameMatch = text.match(/FRAME\s*[:=\-]?\s*([0-9A-Z]+)/i);
        if (frameMatch) {
            foundFrame = frameMatch[1];
        }

        // Match Manufacturer
        const mfgKeywords = ['TECO', 'SIEMENS', 'ABB', 'TOSHIBA', 'WEG', 'MITSUBISHI', 'TATUNG', 'LEROY SOMER', 'BALDOR', 'SEW'];
        for (const mfg of mfgKeywords) {
            if (text.toUpperCase().includes(mfg)) {
                foundMfg = mfg;
                break;
            }
        }

        return {
            item: foundItem,
            hp_kw: foundHpKw,
            voltage: foundVolt,
            ampere: foundAmp,
            rpm: foundRpm,
            frequency: foundFreq,
            ip_rating: foundIp,
            frame: foundFrame,
            manufacture: foundMfg,
        };
    };

    const processOcr = async (useCrop = true) => {
        if (!imageSrc) return;

        let targetImage = imageSrc;

        // If user wants to crop and a valid crop selection exists
        if (useCrop && completedCrop && completedCrop.width > 10 && completedCrop.height > 10 && imgRef.current) {
            targetImage = getCroppedImageBlob(imgRef.current, completedCrop);
            setCroppedPreviewUrl(targetImage);
        }

        setIsScanning(true);
        setProgress(5);
        setStatusText('Menyiapkan Tesseract OCR Engine...');

        try {
            const worker = await createWorker('ind+eng', 1, {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 80) + 15);
                        setStatusText(`Membaca karakter OCR... ${Math.round(m.progress * 100)}%`);
                    } else {
                        setStatusText(m.status);
                    }
                }
            });

            setStatusText('Menganalisis teks terseleksi...');
            const ret = await worker.recognize(targetImage);
            const recognizedText = ret.data.text;
            
            setExtractedText(recognizedText);
            const parsed = parseMotorInfo(recognizedText);
            setParsedData(parsed);

            await worker.terminate();
            setProgress(100);
            setStatusText('Selesai!');
        } catch (error) {
            console.error('OCR Error:', error);
            setStatusText('Gagal membaca OCR: ' + (error.message || 'Error tidak diketahui'));
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/75 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
            <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-6 max-h-[92vh] flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white shrink-0">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white/15 backdrop-blur rounded-xl">
                            <Crop className="h-5 w-5 text-amber-300" />
                        </div>
                        <div>
                            <h3 className="font-extrabold text-base sm:text-lg leading-tight">
                                Seleksi Area & Scan OCR Nameplate
                            </h3>
                            <p className="text-xs text-emerald-100">
                                Geser dan atur kotak seleksi (crop) pada area teks/angka yang ingin dibaca
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
                <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1">
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
                    {!cameraActive && (
                        <div>
                            {imageSrc ? (
                                <div className="space-y-4">
                                    {/* Crop Instructions & Actions Bar */}
                                    <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                        <div className="flex items-center gap-2 text-xs text-emerald-900 font-medium">
                                            <Crop className="h-4 w-4 text-emerald-600 shrink-0" />
                                            <span>Tarik & sesuaikan kotak crop pada kode Item / data spesifikasi motor.</span>
                                        </div>

                                        <div className="flex items-center gap-2 w-full sm:w-auto">
                                            <button
                                                type="button"
                                                onClick={() => fileInputRef.current?.click()}
                                                className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-100 flex items-center gap-1.5"
                                            >
                                                <RotateCw className="h-3.5 w-3.5" /> Ganti
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => processOcr(false)}
                                                disabled={isScanning}
                                                className="px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-semibold hover:bg-slate-900 flex items-center gap-1.5"
                                            >
                                                <Maximize2 className="h-3.5 w-3.5" /> Scan Full
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => processOcr(true)}
                                                disabled={isScanning}
                                                className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center gap-1.5 disabled:opacity-50"
                                            >
                                                <Sparkles className="h-3.5 w-3.5 text-amber-300" />
                                                <span>Scan Area Crop</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Crop Area Container */}
                                    <div className="relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-950 flex items-center justify-center p-2 max-h-[380px]">
                                        <ReactCrop
                                            crop={crop}
                                            onChange={(c) => setCrop(c)}
                                            onComplete={(c) => setCompletedCrop(c)}
                                            className="max-h-[360px]"
                                        >
                                            <img
                                                ref={imgRef}
                                                src={imageSrc}
                                                alt="Nameplate to Crop"
                                                onLoad={(e) => onImageLoaded(e.currentTarget)}
                                                className="max-h-[360px] w-auto object-contain rounded"
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
                                        <p className="text-xs text-slate-500 mt-1">Pilih file foto dari galeri / komputer</p>
                                    </div>

                                    <div
                                        onClick={startCamera}
                                        className="border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-3xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-teal-50/50 hover:bg-teal-50 group"
                                    >
                                        <div className="p-4 bg-teal-100 text-teal-700 rounded-2xl mb-3 group-hover:scale-105 transition">
                                            <Camera className="h-7 w-7" />
                                        </div>
                                        <h4 className="font-bold text-slate-800 text-sm">Buka Kamera Langsung</h4>
                                        <p className="text-xs text-slate-500 mt-1">Ambil foto fisik nameplate motor di lapangan</p>
                                    </div>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
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
                                    {statusText || 'Sedang memproses OCR...'}
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

                    {/* Extracted Data Display */}
                    {parsedData && !isScanning && (
                        <div className="space-y-4 pt-2 border-t border-slate-100">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-black uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                    <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Hasil Pembacaan OCR Area Terpilih
                                </span>
                                {parsedData.item && (
                                    <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-900 rounded-full border border-emerald-300">
                                        Item: {parsedData.item}
                                    </span>
                                )}
                            </div>

                            {/* Main Item Box */}
                            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                                <div>
                                    <div className="text-[11px] text-emerald-700 font-bold uppercase">KODE ITEM TERBACA:</div>
                                    <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                                        {parsedData.item || '(Teks item belum spesifik)'}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Klik tombol untuk langsung mencari atau mengisi kolom input form.
                                    </p>
                                </div>
                                <div className="flex gap-2 w-full sm:w-auto">
                                    {parsedData.item && onSelectResult && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onSelectResult(parsedData.item);
                                                handleClose();
                                            }}
                                            className="flex-1 sm:flex-initial px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                                        >
                                            <Check className="h-4 w-4" /> Gunakan Sebagai Item
                                        </button>
                                    )}
                                    {onPrefillForm && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onPrefillForm(parsedData);
                                                handleClose();
                                            }}
                                            className="flex-1 sm:flex-initial px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-xl shadow transition flex items-center justify-center gap-1.5"
                                        >
                                            <Zap className="h-4 w-4" /> Isi Semua Form
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Detected Parameters Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium text-[10px] uppercase">HP / kW</span>
                                    <span className="font-bold text-slate-800">{parsedData.hp_kw || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium text-[10px] uppercase">Voltage (V)</span>
                                    <span className="font-bold text-slate-800">{parsedData.voltage || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium text-[10px] uppercase">Ampere (A)</span>
                                    <span className="font-bold text-slate-800">{parsedData.ampere || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium text-[10px] uppercase">RPM</span>
                                    <span className="font-bold text-slate-800">{parsedData.rpm || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium text-[10px] uppercase">Manufacture</span>
                                    <span className="font-bold text-slate-800">{parsedData.manufacture || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium text-[10px] uppercase">IP Rating</span>
                                    <span className="font-bold text-slate-800">{parsedData.ip_rating || '-'}</span>
                                </div>
                            </div>

                            {/* Raw Extracted Text Details */}
                            <details className="text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-600">
                                <summary className="cursor-pointer font-semibold text-slate-700 flex items-center justify-between">
                                    <span>Teks Hasil OCR Lengkap</span>
                                    <span className="text-[10px] text-slate-400">({extractedText.length} karakter)</span>
                                </summary>
                                <pre className="mt-2.5 p-2.5 bg-white rounded-lg border border-slate-200 font-mono text-[11px] whitespace-pre-wrap max-h-32 overflow-y-auto">
                                    {extractedText || 'Tidak ada teks yang terbaca.'}
                                </pre>
                            </details>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
                    <span className="text-xs text-slate-400">
                        {imageSrc ? 'Gunakan kursor mouse untuk memilih area kotak crop.' : 'Pilih atau foto nameplate motor.'}
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
