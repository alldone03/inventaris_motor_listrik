<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CheckAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  Closure(Request): (Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$allowedRoles): Response
{
    $user = $request->user();

    if (!$user || !$user->jabatan || !$user->bagian) {
        abort(403, 'Unauthorized action.');
    }

    $namaJabatan = $user->jabatan;
    $namaBagian = $user->bagian;

    $isAuthorized = false;

    // Loop setiap pasangan yang dikirim dari route (misal: "VP|DeptHarListrikInstrumentAlatBerat")
    foreach ($allowedRoles as $roleGroup) {
        $parts = explode('|', $roleGroup);
        
        $allowedJabatan = $parts[0] ?? null;
        $allowedBagian = $parts[1] ?? null;

        // Cek apakah jabatan user cocok
        $matchJabatan = ($allowedJabatan === '*' || $allowedJabatan === $namaJabatan);
        
        // Cek apakah bagian cocok (jika parameter bagian di-set, atau jika tidak ada bagian yang disyaratkan)
        $matchBagian = true;
        if ($allowedBagian !== null) {
            $matchBagian = ($allowedBagian === '*' || $allowedBagian === $namaBagian);
        }

        // Jika ada salah satu pasangan yang cocok, berikan akses
        if ($matchJabatan && $matchBagian) {
            $isAuthorized = true;
            break;
        }
    }

    // Jika tidak ada satu pun pasangan yang cocok, tolak
    if (!$isAuthorized) {
        abort(403, 'Anda tidak memiliki hak akses untuk bagian atau jabatan ini.');
    }

    return $next($request);
}
}
