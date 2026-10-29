<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
   
public function store(LoginRequest $request): RedirectResponse
{
    $request->authenticate();

    $request->session()->regenerate();

    $user = Auth::user();

    // Staff langsung masuk ke dashboard sesuai bagian
    if ($user->jabatan === 'Staff') {
        if ($user->bagian === 'BengkelInstrumen') {
            return redirect()->route('instrument_dashboard');
        }

        if ($user->bagian === 'BengkelListrik') {
            return redirect()->route('listrik_dashboard');
        }

        if ($user->bagian === 'BengkelAlatBerat') {
            return redirect()->route('alatberat_dashboard');
        }
    }

    // SPV, AVP, VP, dan user lainnya ke Dashboard Main WLI
    return redirect()->route('dashboard');
}

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
