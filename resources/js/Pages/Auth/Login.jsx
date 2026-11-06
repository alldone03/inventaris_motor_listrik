
import React, { useState } from 'react';
import { Head, useForm } from '@inertiajs/react';
import { Mail, LockKeyhole, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function Login({ status, canResetPassword }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const [showPassword, setShowPassword] = useState(false);

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Login - WLI Management System" />

            <div
                className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat relative"
                style={{
                    backgroundImage: "url('/PUPUKKUJANG.jpg')",
                }}
            >

                {/* Background Overlay */}
                <div className="absolute inset-0 bg-slate-950/20" />

                {/* Login Card */}
                <div className="relative z-10 w-full max-w-md">

                    <div className="bg-white/95 backdrop-blur-x1 rounded-[2rem] shadow-2xl border border-white/50 p-7 sm:p-9">

                        {/* Company Logo */}
                        <div className="flex flex-col items-center text-center mb-7">

                            <img
                                src="/LOGOKUJANG.jpg"
                                alt="Logo Pupuk Kujang"
                                className="w-20 h-20 object-contain mb-2"
                            />

                            <h1 className="text-2xl font-black tracking-tight text-slate-900">
                                PUPUK KUJANG
                            </h1>

                            <p className="text-xs font-medium text-slate-500 mt-1">
                                Member of Pupuk Indonesia
                            </p>

                            <div className="w-20 h-1 bg-emerald-600 rounded-full mt-5" />

                        </div>

                        {/* Login Heading */}
                        <div className="text-center mb-7">

                            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Login to WLI System
                            </h2>

                            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                Workshop Listrik & Instrument
                                <br />
                                Management System
                            </p>

                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="mb-5 rounded-xl bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm font-medium text-emerald-700">
                                {status}
                            </div>
                        )}

                        {/* Login Form */}
                        <form onSubmit={submit} className="space-y-5">

                            {/* Email */}
                            <div>

                                <label
                                    htmlFor="email"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Email
                                </label>

                                <div className={`flex items-center gap-3 px-4 rounded-xl border bg-white transition-all ${errors.email
                                        ? 'border-red-400 ring-2 ring-red-100'
                                        : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100'
                                    }`}>

                                    <Mail className="w-5 h-5 text-slate-400 shrink-0" />

                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={data.email}
                                        autoComplete="username"
                                        autoFocus
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="nama@email.com"
                                        className="w-full py-4 bg-transparent outline-none border-none focus:ring-0 text-sm text-slate-800 placeholder:text-slate-400"
                                    />

                                </div>

                                {errors.email && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {errors.email}
                                    </p>
                                )}

                            </div>

                            {/* Password */}
                            <div>

                                <label
                                    htmlFor="password"
                                    className="block text-sm font-semibold text-slate-700 mb-2"
                                >
                                    Password
                                </label>

                                <div className={`flex items-center gap-3 px-4 rounded-xl border bg-white transition-all ${errors.password
                                        ? 'border-red-400 ring-2 ring-red-100'
                                        : 'border-slate-200 focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-100'
                                    }`}>

                                    <LockKeyhole className="w-5 h-5 text-slate-400 shrink-0" />

                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={data.password}
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                        placeholder="Masukkan password"
                                        className="w-full py-4 bg-transparent outline-none border-none focus:ring-0 text-sm text-slate-800 placeholder:text-slate-400"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-slate-400 hover:text-emerald-600 transition-colors"
                                        aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                                    >
                                        {showPassword
                                            ? <EyeOff className="w-5 h-5" />
                                            : <Eye className="w-5 h-5" />
                                        }
                                    </button>

                                </div>

                                {errors.password && (
                                    <p className="text-xs text-red-600 mt-2">
                                        {errors.password}
                                    </p>
                                )}

                            </div>

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">

                                <label className="flex items-center gap-2.5 cursor-pointer">

                                    <input
                                        type="checkbox"
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                                    />

                                    <span className="text-sm font-medium text-slate-600">
                                        Remember me
                                    </span>

                                </label>

                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full flex items-center justify-center gap-3 py-4 px-5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm shadow-lg shadow-emerald-700/20 hover:shadow-xl transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                            >

                                {processing ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm" />
                                        Logging in...
                                    </>
                                ) : (
                                    <>
                                        Log in
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}

                            </button>

                        </form>

                        {/* Footer */}
                        <div className="mt-7 pt-5 border-t border-slate-100 text-center">

                            <p className="text-xs text-slate-400">
                                © 2026 PT Pupuk Kujang
                            </p>

                            <p className="text-xs text-slate-400 mt-1">
                                Workshop Listrik & Instrument
                            </p>

                        </div>

                    </div>

                </div>

            </div>
        </>
    );
}
