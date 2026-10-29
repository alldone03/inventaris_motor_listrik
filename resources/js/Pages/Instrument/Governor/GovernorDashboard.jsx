
import React from 'react';
import GovernorLayout from '@/Pages/Instrument/Governor/GovernorLayout';

const GovernorDashboard = ({ stats }) => {
    const cards = [
        {
            title: 'Total Governor',
            value: stats.total,
            description: 'Total seluruh data governor',
            icon: '⚙️',
            color: 'blue',
        },
        {
            title: 'Governor 1A',
            value: stats.governor_1a,
            description: 'Jumlah governor pabrik 1A',
            icon: '🔧',
            color: 'indigo',
        },
        {
            title: 'Governor 1B',
            value: stats.governor_1b,
            description: 'Jumlah governor pabrik 1B',
            icon: '🛠️',
            color: 'cyan',
        },
    ];

    const colorStyles = {
        blue: {
            icon: 'bg-blue-100 text-blue-700',
            accent: 'bg-blue-600',
            value: 'text-blue-700',
        },
        indigo: {
            icon: 'bg-indigo-100 text-indigo-700',
            accent: 'bg-indigo-600',
            value: 'text-indigo-700',
        },
        cyan: {
            icon: 'bg-cyan-100 text-cyan-700',
            accent: 'bg-cyan-600',
            value: 'text-cyan-700',
        },
    };

    return (
        <GovernorLayout>
            <div className="min-h-screen space-y-7 bg-slate-50/60 p-4 sm:p-6 lg:p-8">

                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
                            Instrument Management System
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
                            Governor Dashboard
                        </h1>

                        <p className="mt-2 text-sm text-slate-500 sm:text-base">
                            Ringkasan inventaris dan data peralatan governor.
                        </p>
                    </div>

                    <div className="flex w-fit items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-emerald-700">
                            Data Terhubung
                        </span>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                    {cards.map((card) => {
                        const styles = colorStyles[card.color];

                        return (
                            <div
                                key={card.title}
                                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Accent bar */}
                                <div
                                    className={`absolute left-0 top-0 h-1 w-full ${styles.accent}`}
                                />

                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            {card.title}
                                        </p>

                                        <p className={`mt-4 text-4xl font-bold tracking-tight ${styles.value}`}>
                                            {Number(card.value ?? 0).toLocaleString('id-ID')}
                                        </p>

                                        <p className="mt-3 text-sm text-slate-500">
                                            {card.description}
                                        </p>
                                    </div>

                                    <div
                                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${styles.icon}`}
                                    >
                                        {card.icon}
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-slate-100 pt-4">
                                    <p className="text-xs font-medium text-slate-400">
                                        INVENTORY OVERVIEW
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Information Section */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                    <div className="flex items-start gap-4">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xl">
                            📊
                        </div>

                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Ringkasan Inventaris Governor
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Dashboard ini menampilkan jumlah data governor
                                berdasarkan database. Tambahkan atau hapus data
                                melalui halaman data peralatan untuk memperbarui
                                jumlah inventaris yang ditampilkan.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </GovernorLayout>
    );
};

export default GovernorDashboard;
