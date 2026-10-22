import React, { useState } from 'react';
import AuthenticatedLayout from '@/Pages/Listrik/ListrikLayout';
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
import InstrumentLayout from './InstrumentLayout';


export default function InstrumentDashboard() {

    const { auth } = usePage().props;
    const user = auth.user;


    return (
        <InstrumentLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
                            <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                                <Activity className="h-6 w-6" />
                            </span>
                            Dashboard Instrument
                        </h2>

                    </div>


                </div>
            }
        >
            <Head title="Dashboard - Bengkel Listrik Pupuk Kujang" />



            {/* OCR Scanner Modal */}

        </InstrumentLayout>
    );
}
