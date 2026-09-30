import React, { useState, useEffect } from 'react';
import { Link, usePage } from '@inertiajs/react';
import PupukKujangLogo from '@/Components/PupukKujangLogo';
import { 
    LayoutDashboard, 
    Zap, 
    List, 
    PlusCircle, 
    Menu, 
    X, 
    ChevronLeft, 
    ChevronRight, 
    User, 
    LogOut, 
    FileCheck, 
    Settings,
    Search,
    ShieldCheck,
    Wrench
} from 'lucide-react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, flash } = usePage().props;
    const user = auth.user;

    // Sidebar states:
    // On desktop: collapsed (compact icon-only) vs expanded
    // On mobile: isMobileOpen (drawer open) vs closed
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    // Auto-close mobile sidebar on window resize
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
            href: route('dashboard'),
            icon: LayoutDashboard,
            active: route().current('dashboard'),
        },
        {
            name: 'Daftar Motor',
            href: route('motors.index'),
            icon: Zap,
            active: route().current('motors.*') || route().current('checklists.*'),
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            <div className="flex flex-1 min-h-screen">
                {/* SIDEBAR */}
                <aside
                    className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-300 ease-in-out
                        ${isMobileOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'}
                        ${isCollapsed ? 'lg:w-20' : 'lg:w-64'}
                    `}
                >
                    {/* Brand Header */}
                    <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800/80 bg-slate-950/50">
                        <Link href={route('dashboard')} className="flex items-center gap-3 overflow-hidden">
                            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md shadow-emerald-500/20 shrink-0">
                                <Wrench className="h-5 w-5" />
                            </div>
                            {(!isCollapsed || isMobileOpen) && (
                                <div className="flex flex-col truncate">
                                    <span className="font-extrabold text-sm tracking-wider text-white uppercase font-sans">
                                        PUPUK KUJANG
                                    </span>
                                    <span className="text-[10px] font-semibold text-emerald-400 tracking-wide">
                                        Bengkel Motor Listrik
                                    </span>
                                </div>
                            )}
                        </Link>

                        {/* Mobile Close Button */}
                        <button
                            type="button"
                            onClick={() => setIsMobileOpen(false)}
                            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <div className="flex-1 py-6 px-3 space-y-1.5 overflow-y-auto">
                        <div className={`px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400 ${isCollapsed && !isMobileOpen ? 'text-center' : ''}`}>
                            {isCollapsed && !isMobileOpen ? '•••' : 'Menu Utama'}
                        </div>

                        {navItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    onClick={() => setIsMobileOpen(false)}
                                    className={`flex items-center gap-3 px-3.5 py-3 rounded-xl font-medium text-sm transition-all group relative
                                        ${item.active 
                                            ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-900/30' 
                                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                                        }
                                        ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}
                                    `}
                                    title={isCollapsed ? item.name : undefined}
                                >
                                    <Icon className={`h-5 w-5 shrink-0 ${item.active ? 'text-white' : 'text-slate-400 group-hover:text-emerald-400'}`} />
                                    {(!isCollapsed || isMobileOpen) && (
                                        <span className="truncate">{item.name}</span>
                                    )}
                                    {isCollapsed && !isMobileOpen && (
                                        <div className="absolute left-full ml-2 px-2.5 py-1 bg-slate-800 text-white text-xs rounded-md shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                                            {item.name}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}

                        {/* Action shortcut: Tambah Motor */}
                        <div className="pt-4 mt-4 border-t border-slate-800/80">
                            {(!isCollapsed || isMobileOpen) && (
                                <div className="px-3 mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                    Aksi Cepat
                                </div>
                            )}
                            <Link
                                href={route('motors.create')}
                                onClick={() => setIsMobileOpen(false)}
                                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 border border-emerald-800/40 hover:bg-emerald-900/50 hover:text-emerald-200 transition group
                                    ${isCollapsed && !isMobileOpen ? 'justify-center px-0' : ''}
                                `}
                                title={isCollapsed ? 'Tambah Motor Baru' : undefined}
                            >
                                <PlusCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                                {(!isCollapsed || isMobileOpen) && <span>Tambah Motor Baru</span>}
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar Footer & Collapse Toggle */}
                    <div className="p-3 border-t border-slate-800/80 bg-slate-950/40">
                        <div className="hidden lg:flex items-center justify-end">
                            <button
                                type="button"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="w-full py-2 flex items-center justify-center gap-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 text-xs font-medium transition"
                            >
                                {isCollapsed ? (
                                    <ChevronRight className="h-4 w-4" />
                                ) : (
                                    <>
                                        <ChevronLeft className="h-4 w-4" />
                                        <span>Sembunyikan Sidebar</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* MAIN CONTENT WRAPPER */}
                <div
                    className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out
                        ${isCollapsed ? 'lg:pl-20' : 'lg:pl-64'}
                    `}
                >
                    {/* Top Navbar */}
                    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {/* Mobile Hamburger */}
                            <button
                                type="button"
                                onClick={() => setIsMobileOpen(true)}
                                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition"
                            >
                                <Menu className="h-6 w-6" />
                            </button>

                            {/* Desktop Sidebar Toggle Icon */}
                            <button
                                type="button"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="hidden lg:flex p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition"
                                title="Toggle Sidebar"
                            >
                                <Menu className="h-5 w-5" />
                            </button>

                            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                                <span className="hidden sm:inline-block font-semibold text-slate-700">PT PUPUK KUJANG</span>
                                <span className="hidden sm:inline-block">•</span>
                                <span className="text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 font-semibold">
                                    Sistem Inventaris & Form Checklist Motor Listrik
                                </span>
                            </div>
                        </div>

                        {/* User Menu Dropdown */}
                        <div className="relative">
                            <button
                                type="button"
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition focus:outline-none"
                            >
                                <div className="h-8 w-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shadow-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="hidden md:flex flex-col text-left">
                                    <span className="text-xs font-bold text-slate-800 leading-tight">{user.name}</span>
                                    <span className="text-[10px] text-slate-500">{user.email}</span>
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
                                            <p className="text-xs font-bold text-slate-800">{user.name}</p>
                                            <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                                        </div>
                                        <Link
                                            href={route('profile.edit')}
                                            onClick={() => setUserMenuOpen(false)}
                                            className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition"
                                        >
                                            <User className="h-4 w-4" /> Profil Pengguna
                                        </Link>
                                        <Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                            onClick={() => setUserMenuOpen(false)}
                                            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 transition text-left"
                                        >
                                            <LogOut className="h-4 w-4" /> Keluar (Log Out)
                                        </Link>
                                    </div>
                                </>
                            )}
                        </div>
                    </header>

                    {/* Page Header (if any) */}
                    {header && (
                        <div className="bg-white border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-5">
                            <div className="max-w-7xl mx-auto">{header}</div>
                        </div>
                    )}

                    {/* Flash messages */}
                    {flash?.success && (
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
                            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm flex items-center justify-between shadow-sm">
                                <div className="flex items-center gap-2">
                                    <FileCheck className="h-5 w-5 text-emerald-600 shrink-0" />
                                    <span>{flash.success}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Children */}
                    <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                        {children}
                    </main>

                    {/* Footer */}
                    <footer className="mt-auto py-4 px-6 border-t border-slate-200/70 text-center text-xs text-slate-400">
                        &copy; {new Date().getFullYear()} PT PUPUK KUJANG — Bengkel Listrik & Inventaris Motor Listrik
                    </footer>
                </div>
            </div>
        </div>
    );
}
