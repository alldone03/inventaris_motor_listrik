<?php

namespace Database\Seeders;

use App\Models\Bagian;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class MasterSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Seeder Jabatan
        $jabatans = ['VP', 'AVP', 'SPV', 'ENGINEERING', 'STAFF'];
        $createdJabatans = [];
        foreach ($jabatans as $jabatan) {
            $createdJabatans[$jabatan] = Jabatan::firstOrCreate(['nama_jabatan' => $jabatan]);
        }

        // 2. Seeder Bagian/Divisi
        $bagians = ['Listrik', 'Instrument', 'AlatBerat', 'WLI', 'Instrumen', 'Bengkel Listrik', 'Bengkel Instrumen', 'VP'];
        $createdBagians = [];
        foreach ($bagians as $bagian) {
            $createdBagians[$bagian] = Bagian::firstOrCreate(['nama_bagian' => $bagian]);
        }

        // 3. Data Pegawai / Karyawan
        $pegawais = [
            ['nama' => 'Nugraha Agung Wibowo', 'jabatan' => 'VP', 'divisi' => 'VP', 'email' => 'nugrahaagungwibowo@pupuk-kujang.com'],
            ['nama' => 'Erik T. Nugraha', 'jabatan' => 'AVP', 'divisi' => 'WLI', 'email' => 'eriktnugraha@pupuk-kujang.com'],
            ['nama' => 'Endin Komarudin', 'jabatan' => 'AVP', 'divisi' => 'Instrumen', 'email' => 'endinkomarudin@pupuk-kujang.com'],
            ['nama' => 'Egi Andrian', 'jabatan' => 'SPV', 'divisi' => 'Instrumen', 'email' => 'egiandrian@pupuk-kujang.com'],
            ['nama' => 'Erwin Priatna Suhendar', 'jabatan' => 'SPV', 'divisi' => 'Bengkel Listrik', 'email' => 'erwinpriatnasuhendar@pupuk-kujang.com'],
            ['nama' => 'Djapar Sidik', 'jabatan' => 'SPV', 'divisi' => 'Bengkel Instrumen', 'email' => 'djaparsidik@pupuk-kujang.com'],
            ['nama' => 'Ahmad Jaelani', 'jabatan' => 'SPV', 'divisi' => 'Bengkel Instrumen', 'email' => 'ahmadjaelani@pupuk-kujang.com'],
            ['nama' => 'Ipan Apian M.', 'jabatan' => 'Staff', 'divisi' => 'Instrumen', 'email' => 'ipanapianm@pupuk-kujang.com'],
            ['nama' => 'Lindra Suhindratno', 'jabatan' => 'Staff', 'divisi' => 'Bengkel Listrik', 'email' => 'lindrasuhindratno@pupuk-kujang.com'],
            ['nama' => 'Angga Septiadi', 'jabatan' => 'Staff', 'divisi' => 'Bengkel Listrik', 'email' => 'anggaseptiadi@pupuk-kujang.com'],
            ['nama' => 'Iman', 'jabatan' => 'Staff', 'divisi' => 'Bengkel Instrumen', 'email' => 'iman@pupuk-kujang.com'],
            ['nama' => 'Firman Maulana', 'jabatan' => 'Staff', 'divisi' => 'Bengkel Instrumen', 'email' => 'firmanmaulana@pupuk-kujang.com'],
        ];

        foreach ($pegawais as $p) {
            // Jika jabatan di data menggunakan "Staff" tapi di master ada "STAFF", gunakan uppercase agar cocok
            $jabatanKey = strtoupper($p['jabatan']);
            
            // Simpan data pegawai (sesuaikan nama kolom tabel database Anda)
            User::updateOrCreate(
                ['email' => $p['email']], // Cek berdasarkan email agar tidak duplikat
                [
                    'name' => $p['nama'],
                    // Sesuaikan foreign key jika menggunakan relasi ID, contoh:
                    // 'jabatan_id' => $createdJabatans[$jabatanKey]->id ?? null,
                    // 'bagian_id' => $createdBagians[$p['divisi']]->id ?? null,
                    
                    // Atau jika kolomnya langsung string:
                    'jabatan' => $p['jabatan'],
                    'divisi' => $p['divisi'],
                ]
            );
        }
    }
}
