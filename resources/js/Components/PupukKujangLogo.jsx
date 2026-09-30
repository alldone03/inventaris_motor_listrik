import React from 'react';

export default function PupukKujangLogo({ className = 'h-12 w-auto', showText = true, textColor = 'text-slate-800' }) {
    return (
        <div className="flex items-center gap-3">
            {/* Kujang Emblem Graphic */}
            <div className="relative flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white shadow-md shadow-emerald-500/20 p-2">
                <svg
                    viewBox="0 0 100 100"
                    fill="currentColor"
                    className="w-full h-full drop-shadow"
                >
                    {/* Stylized Kujang Weapon Emblem */}
                    <path
                        d="M50 8 C48 15 42 22 36 28 C28 36 24 46 25 56 C26 66 32 75 42 82 C48 86 52 89 54 94 C56 89 60 86 66 82 C76 75 82 66 83 56 C84 46 80 36 72 28 C66 22 60 15 58 8 C55 12 53 12 50 8 Z"
                        fill="rgba(255,255,255,0.2)"
                    />
                    <path
                        d="M50 12 C44 24 32 34 32 50 C32 64 42 76 50 82 C58 76 68 64 68 50 C68 34 56 24 50 12 Z"
                        fill="currentColor"
                    />
                    <circle cx="50" cy="42" r="6" fill="#f59e0b" />
                    <circle cx="50" cy="56" r="4.5" fill="#ffffff" />
                    <circle cx="50" cy="67" r="3.5" fill="#f59e0b" />
                </svg>
            </div>

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
