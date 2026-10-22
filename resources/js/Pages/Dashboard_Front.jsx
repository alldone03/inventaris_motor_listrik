import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router, usePoll, usePage } from '@inertiajs/react';
import OcrScannerModal from '@/Components/OcrScannerModal';
import {
    Zap,
    FileCheck,
    CheckCircle2,
    Clock,
    PlusCircle,
    Search,
    Camera,
    ArrowRight,
    Wrench,
    Activity,
    Layers,
    Sparkles,
    Eye,
    ChevronRight
} from 'lucide-react';

export default function Dashboard({ nama, motor }) {
    console.log(motor);
    const aplikasi = [
        { nama: "Listrik", url: "/listrik", gambar: "/Listrik.png", deskripsi: "Database inventaris motor listrik dan peralatan kelistrikan workshop." },
        { nama: "Instrumen", url: "/instrumen", gambar: "/Instrumen.png", deskripsi: "Database instrumen, informasi peralatan, dan kegiatan kalibrasi." },
        { nama: "Alat Berat", url: "/alat-berat", gambar: "/Alat Berat.png", deskripsi: "Database inventaris alat berat dan informasi kondisi unit." }
    ]
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                <Activity className="h-6 w-6" />
                            </span>
                            WORKSHOP LISTRIK INSTRUMEN (WLI)
                        </h2>
                        <p className="text-[15px] text-slate-500 mt-1">
                            Sistem Monitoring & Database Inventaris dan Form Checklist Perbaikan Alat Listrik dan Instrumen di  PT Pupuk Kujang
                        </p>
                    </div>

                </div>
            }
        >
            <Head title="Dashboard - Bengkel Listrik Pupuk Kujang" />
            <div className="flex gap-20">
                {aplikasi.map((item, index) => (
                    <Link
                        className="card bg-base-100 w-96 shadow-sm "
                        href={item.url}>
                        <div className="flex justify-center items-center w-full">
                            <img className="card-figure h-32 w-full flex items-center justify-center bg-white p-4"
                                src={item.gambar}
                                alt={item.nama}
                                className='h-80 w-80 object-contain'
                            />
                        </div>
                        <div className="card-body">
                            <h2 className="card-title">{item.nama}</h2>
                            <p>{item.deskripsi}</p>
                            <div className="card-actions justify-end">
                                <button className="btn btn-primary text-lg">Click Here</button>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>


          {  <div className='p-10
            
            '>}


                <p>nama = {nama}</p>
                <table>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Item Code</th>
                            <th>Location</th>
                            <th>HP/KW</th>
                            <th>Voltage</th>
                            <th>Ampere</th>
                            <th>Frame</th>
                            <th>IP Rating</th>
                            <th>Frequency</th>
                            <th>Manufacture</th>
                            <th>RPM</th>
                            <th>Area</th>
                            <th>Keterangan</th>
                            <th>Status</th>
                            <th>Mounting</th>
                        </tr>
                    </thead>
                    <tbody>
                        {motor.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.item}</td>
                                <td>{item.alamat_motor}</td>
                                <td>{item.hp_kw}</td>
                                <td>{item.voltage}</td>
                                <td>{item.ampere}</td>
                                <td>{item.frame}</td>
                                <td>{item.ip_rating}</td>
                                <td>{item.frequency}</td>
                                <td>{item.manufacture}</td>
                                <td>{item.rpm}</td>
                                <td>{item.area}</td>
                                <td>{item.keterangan}</td>
                                <td>{item.status}</td>
                                <td>{item.mounting}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </AuthenticatedLayout>
    );
}
