import React from 'react';

export default function PupukKujangLogo({ className = 'h-12 w-auto', showText = true, textColor = 'text-slate-800' }) {
    return (
        <div className="flex items-center gap-3">
            {/* Kujang Emblem Graphic */}
            <img
                src="/logo_pkc_white.webp"
                alt="Logo Pupuk Kujang"
                className={`${className} object-contain `}
            />


            {showText && (
                <div className="flex flex-col">
                    <span className={`text-base font-black tracking-wider uppercase font-sans ${textColor}`}>
                        PT PUPUK KUJANG
                    </span>
                    <span className="text-xs font-semibold tracking-wide text-emerald-600 uppercase">
                        Pupuk Indonesia Holding
                    </span>
                </div>
            )}
        </div>
    );
}
