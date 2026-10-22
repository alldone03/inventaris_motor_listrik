import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                {/* Fieldset Email */}
                <fieldset className="fieldset">
                    <legend className="fieldset-legend font-semibold text-base-content text-black">Email</legend>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`input input-bordered w-full text-base-content ${errors.email ? 'input-error' : ''}`}
                        autoComplete="username"
                        autoFocus={true}
                        onChange={(e) => setData('email', e.target.value)}
                        placeholder="nama@email.com"
                    />
                    {errors.email && (
                        <p className="label text-error text-xs mt-1">{errors.email}</p>
                    )}
                </fieldset>

                {/* Fieldset Password */}
                <fieldset className="fieldset mt-4">
                    <legend className="fieldset-legend font-semibold text-base-content text-black">Password</legend>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`input input-bordered w-full text-base-content ${errors.password ? 'input-error' : ''}`}
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                        placeholder="••••••••"
                    />
                    {errors.password && (
                        <p className="label text-error text-xs mt-1">{errors.password}</p>
                    )}
                </fieldset>

                {/* Remember Me Checkbox */}
                <div className="mt-4">
                    <label className="cursor-pointer label justify-start gap-2 ">
                        <input
                            type="checkbox"
                            name="remember"
                            className="checkbox checkbox-primary checkbox-sm"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="label-text text-base-content text-black">Remember me</span>
                    </label>
                </div>

                {/* Action Buttons: Forgot Password & Submit */}
                <div className="mt-6 flex items-center justify-center bg-red-500">

                    <div className="w-full">
                        <button
                            type="submit"
                            className={`btn btn-primary w-full ${processing ? 'loading' : ''}`}
                            disabled={processing}
                        >
                            {processing ? 'Logging in...' : 'Log in'}
                        </button>
                    </div>
                </div>
            </form>
        </GuestLayout>
    );
}
