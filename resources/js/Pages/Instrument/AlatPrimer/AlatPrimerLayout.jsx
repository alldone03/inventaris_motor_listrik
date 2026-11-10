
import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import {
    House,
    LayoutDashboard,
    List,
    Menu,
    X,
    ChevronLeft,
    ChevronRight,
    User,
    LogOut,
    FileCheck,
} from 'lucide-react';

export default function AlatPrimerLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setIsMobileOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navItems = [
        {
            name: 'Dashboard',
            href: route('alatprimer_dashboard'),
            icon: LayoutDashboard,
            active: route().current('alatprimer_dashboard'),
        },

        {
            name: 'Daftar Alat Primer',
            href: route('alatprimer.index'),
            icon: List,
            active: route().current('alatprimer.index'),
        },
      ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased print:bg-white">

            {/* MOBILE OVERLAY */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div className="flex flex-1 min-h-screen">

                {/* SIDEBAR */}
                <aside
                    className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300
                        ${isMobileOpen
                            ? 'translate-x-0 w-72'
                            : '-translate-x-full lg:translate-x-0'}
                        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
                    `}
                >

                    {/* LOGO */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800 bg-slate-950/50">

                        <Link
                            href={route('dashboard')}
                            className="flex items-center gap-3 overflow-hidden"
                        >
                            <img
                                src="/logo_pkc_white.webp"
                                alt="Logo Pupuk Kujang"
                                className="h-11 w-auto shrink-0 object-contain"
                            />

                            {(!isCollapsed || isMobileOpen) && (
                                <span className="font-extrabold text-sm tracking-wider text-white uppercase">
                                    PUPUK KUJANG
                                </span>
                            )}
                        </Link>

                        <button
                            type="button"
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* MENU SIDEBAR */}
                    <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">

                        {/* HALAMAN UTAMA */}
                        <Link
                            href={route('dashboard')}
                            onClick={() => setIsMobileOpen(false)}
                            className={`flex items-center gap-3 px-3.5 py-3 mb-5 rounded-xl font-medium text-sm transition-all
                                ${route().current('dashboard')
                                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                                ${isCollapsed && !isMobileOpen
                                    ? 'justify-center px-0'
                                    : ''}
                            `}
                        >
                            <House className="h-5 w-5 shrink-0" />

                            {(!isCollapsed || isMobileOpen) && (
                                <span>Halaman Utama</span>
                            )}
                        </Link>

                        {/* MENU UTAMA */}
                        <div className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400
                            ${isCollapsed && !isMobileOpen
                                ? 'text-center'
                                : ''}
                        `}>
                            {isCollapsed && !isMobileOpen
                                ? '•••'
                                : 'Menu Utama'}
                        </div>

                        {navItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all group
                                        ${item.active
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                                            : 'text-slate-300 hover:bg-slate-800 hover:text-white'}
                                        ${isCollapsed && !isMobileOpen
                                            ? 'justify-center px-0'
                                            : ''}
                                    `}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <Icon className="h-5 w-5 shrink-0" />

                                    {(!isCollapsed || isMobileOpen) && (
                                        <span>{item.name}</span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* COLLAPSE SIDEBAR */}
                    <div className="p-3 border-t border-slate-800 bg-slate-950/40">

                        <button
                            type="button"
                            onClick={() => setIsCollapsed(!isCollapsed)}
                            className="hidden lg:flex w-full py-2 items-center justify-center gap-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs transition"
                        >
                            {isCollapsed ? (
                                <ChevronRight size={16} />
                            ) : (
                                <>
                                    <ChevronLeft size={16} />
                                    <span>Sembunyikan Sidebar</span>
                                </>
                            )}
                        </button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <div
                    className={`flex-1 flex flex-col min-w-0 transition-all duration-300
                        ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
                    `}
                >

                    {/* TOP NAVBAR */}
                    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">

                        <div className="flex items-center gap-3">

                            <button
                                type="button"
                                onClick={() => setIsMobileOpen(true)}
                                className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
                            >
                                <Menu size={24} />
                            </button>

                            <button
                                type="button"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:bg-slate-100"
                            >
                                <Menu size={20} />
                            </button>

                            <span className="hidden sm:inline-block font-semibold text-slate-700 text-xs">
                                PT PUPUK KUJANG
                            </span>
                        </div>

                        {/* USER DROPDOWN */}
                        <div className="relative">

                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100"
                            >
                                <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>

                                <div className="hidden md:flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-800">
                                        {user.name}
                                    </span>

                                    <span className="text-[10px] text-slate-500">
                                        Jabatan : {user.jabatan}
                                    </span>

                                    <span className="text-[10px] text-slate-500">
                                        Bagian : {user.bagian}
                                    </span>
                                </div>
                            </button>

                            {userMenuOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setUserMenuOpen(false)}
                                    />

                                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-slate-100 py-2 z-50">

                                        <div className="px-4 py-2 border-b border-slate-100">
                                            <p className="text-xs font-bold text-slate-800">
                                                {user.name}
                                            </p>

                                            <p className="text-[10px] text-slate-500">
                                                Jabatan : {user.jabatan}
                                            </p>

                                            <p className="text-[10px] text-slate-500">
                                                Bagian : {user.bagian}
                                            </p>

                                            <p className="text-[10px] text-slate-500 break-all">
                                                {user.email}
                                            </p>
                                        </div>

                                        <Link
                                            href={route('profile.edit')}
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-emerald-600"
                                        >
                                            <User size={16} />
                                            Profil Pengguna
                                        </Link>

                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50"
                                        >
                                            <LogOut size={16} />
                                            Keluar (Log Out)
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </header>

                    {/* PAGE HEADER */}
                    {header && (
                        <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-5">
                            <div className="max-w-7xl mx-auto">
                                {header}
                            </div>
                        </div>
                    )}

                    {/* FLASH MESSAGE */}
                    {flash?.success && (
                        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-4">
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center gap-2">
                                <FileCheck size={20} />
                                {flash.success}
                            </div>
                        </div>
                    )}

                    {/* CONTENT */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                        {children}
                    </main>

                    {/* FOOTER */}
                    <footer className="mt-auto py-4 px-6 border-t border-slate-200 text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} PT PUPUK KUJANG
                    </footer>
                </div>
            </div>
        </div>
    );
}
