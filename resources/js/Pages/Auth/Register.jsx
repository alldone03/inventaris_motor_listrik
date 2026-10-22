import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from 'postcss';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
                <fieldset className='fielset'>
                    <legend className="fieldset-legend font-semibold text-base-content text-black">Nama Lengkap</legend>

                    <input
                        id="name"
                        name="name"
                        value={data.name}
                        className={`input input-bordered w-full text-base-content ${errors.name ? 'input-error' : ''}`}
                        autoComplete="name"
                        isFocused={true}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </fieldset>

                <fieldset className='fielset'>
                    <legend className="fieldset-legend font-semibold text-base-content text-black">Email</legend>

                    <input
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className={`input input-bordered w-full text-base-content ${errors.email ? 'input-error' : ''}`}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </fieldset>

                <fieldset className='fielset'>
                    <legend className="fieldset-legend font-semibold text-base-content text-black">Password</legend>

                    <input
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className={`input input-bordered w-full text-base-content ${errors.password ? 'input-error' : ''}`}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </fieldset>

                <fieldset className='fielset'>
                    <legend className="fieldset-legend font-semibold text-base-content text-black">Konfirmasi Password</legend>

                    <input
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className={`input input-bordered w-full text-base-content ${errors.password_confirmation ? 'input-error' : ''}`}
                        autoComplete="new-password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                        required
                    />

                    <InputError
                        message={errors.password_confirmation}
                        className="mt-2" />
                </fieldset>



                <div className="mt-4 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Already registered?
                    </Link>

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Register
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}
