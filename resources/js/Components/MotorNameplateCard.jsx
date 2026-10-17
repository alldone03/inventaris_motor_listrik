import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function MotorNameplateCard({ motor, className = '', id, style = {}, ...props }) {
    if (!motor) return null;

    return (
        <div
            id={id}
            style={{
                width: '8.5cm',
                height: '5cm',
                boxSizing: 'border-box',
                ...style,
            }}
            className={`bg-white border-2 border-black p-2 flex flex-col justify-between text-black font-sans select-none overflow-hidden print-nameplate-item ${className}`}
            {...props}
        >
            {/* Header Tag */}
            <div className="border-b-2 border-black pb-1 mb-1 flex items-center justify-between">
                <div>
                    <div className="text-[11px] font-black uppercase tracking-wider leading-none">
                        PT PUPUK KUJANG CIKAMPEK
                    </div>
                    <div className="text-[8px] font-bold text-slate-700 tracking-tight leading-tight mt-0.5">
                        BAGIAN BENGKEL LISTRIK - NAMEPLATE MOTOR
                    </div>
                </div>
                <ApplicationLogo invert={true} className="h-10" />
            </div>

            {/* 3-Column Content Layout */}
            <div className="grid grid-cols-3 gap-1.5 flex-1 items-stretch text-[9px] leading-tight">
                {/* KOLOM 1: LABEL KE */}
                <div className="border-r border-black pr-1.5 flex flex-col justify-center items-center text-center bg-slate-50/50">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-black mb-0.5">
                        LABEL KE
                    </span>
                    <div className="font-black font-mono text-3xl leading-none tracking-tight my-auto text-black">
                        {motor.label_ke || '-'}
                    </div>
                    <span className="text-[7.5px] font-bold uppercase text-black">
                        No. Identitas
                    </span>
                </div>

                {/* KOLOM 2: ITEM, ALAMAT, DAYA */}
                <div className="border-r border-black pr-1.5 pl-0.5 flex flex-col justify-between">
                    {/* Item */}
                    <div className="border-b border-dashed border-slate-300 pb-0.5">
                        <div className="text-[7.5px] font-bold uppercase text-black leading-none">
                            Item
                        </div>
                        <div className="font-black font-mono text-[11px] text-black truncate leading-tight mt-0.5" title={motor.item}>
                            {motor.item || '-'}
                        </div>
                    </div>

                    {/* Alamat */}
                    <div className="border-b border-dashed border-slate-300 py-0.5">
                        <div className="text-[7.5px] font-bold uppercase text-black leading-none">
                            Alamat
                        </div>
                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.alamat_motor}>
                            {motor.alamat_motor || '-'}
                        </div>
                    </div>

                    {/* Daya */}
                    <div className="pt-0.5">
                        <div className="text-[7.5px] font-bold uppercase text-black leading-none">
                            Daya
                        </div>
                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.hp_kw}>
                            {motor.hp_kw || '-'}
                        </div>
                    </div>
                </div>

                {/* KOLOM 3: MOUNTING, VOLTAGE & AMPERE, FRAME */}
                <div className="pl-0.5 flex flex-col justify-between">
                    {/* Mounting */}
                    <div className="border-b border-dashed border-slate-300 pb-0.5">
                        <div className="text-[7.5px] font-bold uppercase text-black leading-none">
                            Mounting
                        </div>
                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.mounting}>
                            {motor.mounting || '-'}
                        </div>
                    </div>

                    {/* Voltage & Ampere */}
                    <div className="border-b border-dashed border-slate-300 py-0.5">
                        <div className="text-[7.5px] font-bold uppercase text-black leading-none">
                            Volt & Amp
                        </div>
                        <div className="font-bold text-[9px] text-black truncate leading-tight mt-0.5">
                            {motor.voltage || '-'} / {motor.ampere || '-'}
                        </div>
                    </div>

                    {/* Frame */}
                    <div className="pt-0.5">
                        <div className="text-[7.5px] font-bold uppercase text-black leading-none">
                            Frame
                        </div>
                        <div className="font-bold text-[9.5px] text-black truncate leading-tight mt-0.5" title={motor.frame}>
                            {motor.frame || '-'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Status & Note */}
            <div className="border-t border-black pt-0.5 mt-1 flex justify-between items-center text-[7.5px] font-semibold text-black">
                <span>Status: {motor.status || 'Di Workshop'}</span>
                <span>Bengkel Listrik PKC</span>
            </div>
        </div>
    );
}
