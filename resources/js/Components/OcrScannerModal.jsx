import React, { useState, useRef } from 'react';
import { createWorker } from 'tesseract.js';
import { 
    Camera, 
    Upload, 
    X, 
    Sparkles, 
    Check, 
    RotateCw, 
    FileText, 
    Cpu, 
    Zap, 
    AlertCircle,
    Copy
} from 'lucide-react';

export default function OcrScannerModal({ isOpen, onClose, onSelectResult, onPrefillForm }) {
    const [imageSrc, setImageSrc] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState('');
    const [extractedText, setExtractedText] = useState('');
    const [parsedData, setParsedData] = useState(null);
    const [cameraActive, setCameraActive] = useState(false);
    
    const fileInputRef = useRef(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    if (!isOpen) return null;

    const resetState = () => {
        setImageSrc(null);
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
                processImageWithOcr(event.target.result);
            };
            reader.readAsDataURL(file);
        }
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
            processImageWithOcr(dataUrl);
        }
    };

    const parseMotorInfo = (text) => {
        const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
        
        let foundItem = '';
        let foundHpKw = '';
        let foundVolt = '';
        let foundAmp = '';
        let foundRpm = '';
        let foundMfg = '';
        let foundFrame = '';
        let foundIp = '';
        let foundFreq = '';

        // Match item code format like 2213-JA, 1102-FA, etc. or alphanumeric code
        const itemRegex = /\b([0-9]{3,4}\s*[-–_]\s*[A-Z]{1,3})\b/i;
        const itemMatch = text.match(itemRegex);
        if (itemMatch) {
            foundItem = itemMatch[1].replace(/\s+/g, '').toUpperCase();
        } else {
            // fallback look for "ITEM" keyword
            const itemKeywordMatch = text.match(/ITEM\s*[:=\-]?\s*([A-Z0-9\-_]+)/i);
            if (itemKeywordMatch) {
                foundItem = itemKeywordMatch[1].trim().toUpperCase();
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

        // Match Manufacturer (TECO, SIEMENS, ABB, TOSHIBA, WEG, MITSUBISHI, TATUNG)
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

    const processImageWithOcr = async (image) => {
        setIsScanning(true);
        setProgress(5);
        setStatusText('Memulai mesin OCR Tesseract...');

        try {
            const worker = await createWorker('ind+eng', 1, {
                logger: (m) => {
                    if (m.status === 'recognizing text') {
                        setProgress(Math.round(m.progress * 80) + 15);
                        setStatusText(`Membaca teks dari gambar... ${Math.round(m.progress * 100)}%`);
                    } else {
                        setStatusText(m.status);
                    }
                }
            });

            setStatusText('Menganalisis hasil pembacaan...');
            const ret = await worker.recognize(image);
            const recognizedText = ret.data.text;
            
            setExtractedText(recognizedText);
            const parsed = parseMotorInfo(recognizedText);
            setParsedData(parsed);

            await worker.terminate();
            setProgress(100);
            setStatusText('Selesai!');
        } catch (error) {
            console.error('OCR Error:', error);
            setStatusText('Gagal membaca gambar OCR: ' + (error.message || 'Error tidak diketahui'));
        } finally {
            setIsScanning(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 overflow-y-auto">
            <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl border border-slate-100 overflow-hidden my-8">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-white/10 backdrop-blur rounded-lg">
                            <Sparkles className="h-5 w-5 text-amber-300" />
                        </div>
                        <div>
                            <h3 className="font-bold text-lg leading-tight">OCR Pemindai Nameplate Motor</h3>
                            <p className="text-xs text-emerald-100">Pindai foto nameplate atau label motor untuk membaca teks / angka Item otomatis</p>
                        </div>
                    </div>
                    <button
                        onClick={handleClose}
                        className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Camera view if active */}
                    {cameraActive && (
                        <div className="relative rounded-xl overflow-hidden bg-black aspect-video flex flex-col items-center justify-center">
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

                    {/* Image Preview & Upload Buttons */}
                    {!cameraActive && (
                        <div>
                            {imageSrc ? (
                                <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-900 max-h-64 flex items-center justify-center group">
                                    <img
                                        src={imageSrc}
                                        alt="Preview Nameplate"
                                        className="max-h-64 w-auto object-contain"
                                    />
                                    <div className="absolute top-2 right-2 flex gap-2">
                                        <button
                                            onClick={() => fileInputRef.current?.click()}
                                            className="px-3 py-1.5 bg-slate-900/80 text-white text-xs rounded-lg hover:bg-slate-900 flex items-center gap-1.5 backdrop-blur"
                                        >
                                            <RotateCw className="h-3.5 w-3.5" /> Ganti Foto
                                        </button>
                                        <button
                                            onClick={() => processImageWithOcr(imageSrc)}
                                            disabled={isScanning}
                                            className="px-3 py-1.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 flex items-center gap-1.5 shadow"
                                        >
                                            <Sparkles className="h-3.5 w-3.5" /> Pindai Ulang
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Upload box */}
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="border-2 border-dashed border-emerald-300 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-emerald-50/50 hover:bg-emerald-50"
                                    >
                                        <div className="p-3 bg-emerald-100 text-emerald-700 rounded-full mb-3">
                                            <Upload className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800 text-sm">Pilih / Unggah Gambar</h4>
                                        <p className="text-xs text-slate-500 mt-1">PNG, JPG, JPEG dari komputer</p>
                                    </div>

                                    {/* Camera box */}
                                    <div
                                        onClick={startCamera}
                                        className="border-2 border-dashed border-teal-300 hover:border-teal-500 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-all bg-teal-50/50 hover:bg-teal-50"
                                    >
                                        <div className="p-3 bg-teal-100 text-teal-700 rounded-full mb-3">
                                            <Camera className="h-6 w-6" />
                                        </div>
                                        <h4 className="font-semibold text-slate-800 text-sm">Gunakan Kamera Langsung</h4>
                                        <p className="text-xs text-slate-500 mt-1">Foto langsung nameplate fisik motor</p>
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
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                            <div className="flex justify-between text-xs font-semibold text-slate-700">
                                <span className="flex items-center gap-1.5">
                                    <RotateCw className="h-3.5 w-3.5 animate-spin text-emerald-600" />
                                    {statusText || 'Sedang memproses OCR...'}
                                </span>
                                <span>{progress}%</span>
                            </div>
                            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                <div
                                    className="bg-gradient-to-r from-emerald-500 to-teal-600 h-2 rounded-full transition-all duration-300"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}

                    {/* Extracted Data Display */}
                    {parsedData && !isScanning && (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                                    <Sparkles className="h-4 w-4 text-emerald-600" /> Hasil Deteksi OCR Pintar
                                </span>
                                {parsedData.item && (
                                    <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                                        Item Terdeteksi: {parsedData.item}
                                    </span>
                                )}
                            </div>

                            {/* Main Item Highlight */}
                            <div className="p-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                                <div>
                                    <div className="text-xs text-emerald-700 font-semibold">KODE ITEM MOTOR:</div>
                                    <div className="text-2xl font-black text-slate-900 tracking-tight font-mono">
                                        {parsedData.item || '(Belum terdeteksi spesifik)'}
                                    </div>
                                    <p className="text-xs text-slate-500 mt-0.5">
                                        Klik tombol di samping untuk langsung mencari atau mengisi form.
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    {parsedData.item && onSelectResult && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                onSelectResult(parsedData.item);
                                                handleClose();
                                            }}
                                            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
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
                                            className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold rounded-lg shadow transition flex items-center gap-1.5"
                                        >
                                            <Zap className="h-4 w-4" /> Isi Semua Form
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Grid of detected parameters */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium">HP / kW</span>
                                    <span className="font-bold text-slate-800">{parsedData.hp_kw || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium">Voltage (V)</span>
                                    <span className="font-bold text-slate-800">{parsedData.voltage || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium">Ampere (A)</span>
                                    <span className="font-bold text-slate-800">{parsedData.ampere || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium">RPM</span>
                                    <span className="font-bold text-slate-800">{parsedData.rpm || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium">Manufacture</span>
                                    <span className="font-bold text-slate-800">{parsedData.manufacture || '-'}</span>
                                </div>
                                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200">
                                    <span className="text-slate-400 block font-medium">IP Rating</span>
                                    <span className="font-bold text-slate-800">{parsedData.ip_rating || '-'}</span>
                                </div>
                            </div>

                            {/* Raw extracted text accordion */}
                            <details className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 text-slate-600">
                                <summary className="cursor-pointer font-semibold text-slate-700 flex items-center justify-between">
                                    <span>Lihat Semua Teks Mentah yang Terbaca</span>
                                    <span className="text-[10px] text-slate-400">({extractedText.length} karakter)</span>
                                </summary>
                                <pre className="mt-2.5 p-2.5 bg-white rounded border border-slate-200 font-mono text-[11px] whitespace-pre-wrap max-h-36 overflow-y-auto">
                                    {extractedText || 'Tidak ada teks yang terbaca.'}
                                </pre>
                            </details>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                        type="button"
                        onClick={handleClose}
                        className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200/60 font-semibold text-sm transition"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
}
