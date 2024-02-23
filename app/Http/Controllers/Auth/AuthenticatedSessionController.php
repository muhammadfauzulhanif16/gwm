<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Providers\RouteServiceProvider;
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
            'title' => 'Masuk Akun',
            'canResetPassword' => Route::has('password.request'),
            'meta' => session('meta'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        try {
            $request->authenticate();
            $request->session()->regenerate();

            return to_route('home')->with('meta', [
                'status' => true,
                'title' => 'Berhasil masuk akun',
                'message' => "Terautentikasi sebagai " . Auth::user()->username,
            ]);
        } catch (\Exception $e) {
            return to_route('login')->with('meta', [
                'status' => false,
                'title' => 'Gagal masuk akun',
                'message' => "Nama pengguna atau kata sandi salah",
            ]);
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return to_route('home')->with('meta', [
            'status' => true,
            'title' => 'Berhasil keluar akun',
            'message' => "Sampai jumpa kembali!",
        ]);
    }
}
