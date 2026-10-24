<?php

namespace Database\Seeders;

use App\Models\Bagian;
use App\Models\Jabatan;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class PegawaiSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        

        // 3. Data User dari tabel Anda
        $usersData = [
            [
                'name' => 'Nugraha Agung Wibowo',
                'jabatan' => 'VP',
                'bagian' => 'DeptHarListrikInstrumentAlatBerat',
                'email' => 'nugrahaagungwibowo@pupuk-kujang.com',
            ],
            [
                'name' => 'Erik T. Nugraha',
                'jabatan' => 'AVP',
                'bagian' => 'WLI',
                'email' => 'eriktnugraha@pupuk-kujang.com',
            ],
            [
                'name' => 'Endin Komarudin',
                'jabatan' => 'AVP',
                'bagian' => 'BengkelInstrumen',
                'email' => 'endinkomarudin@pupuk-kujang.com',
            ],
            [
                'name' => 'Egi Andrian',
                'jabatan' => 'SPV',
                'bagian' => 'BengkelInstrumen',
                'email' => 'egiandrian@pupuk-kujang.com',
            ],
            [
                'name' => 'Erwin Priatna Suhendar',
                'jabatan' => 'SPV',
                'bagian' => 'BengkelListrik',
                'email' => 'erwinpriatnasuhendar@pupuk-kujang.com',
            ],
            [
                'name' => 'Djapar Sidik',
                'jabatan' => 'SPV',
                'bagian' => 'BengkelInstrumen',
                'email' => 'djaparsidik@pupuk-kujang.com',
            ],
            [
                'name' => 'Ahmad Jaelani',
                'jabatan' => 'SPV',
                'bagian' => 'BengkelInstrumen',
                'email' => 'ahmadjaelani@pupuk-kujang.com',
            ],
            [
                'name' => 'Ipan Apian M.',
                'jabatan' => 'Staff',
                'bagian' => 'BengkelInstrumen',
                'email' => 'ipanapianm@pupuk-kujang.com',
            ],
            [
                'name' => 'Lindra Suhindratno',
                'jabatan' => 'Staff',
                'bagian' => 'BengkelListrik',
                'email' => 'lindrasuhindratno@pupuk-kujang.com',
            ],
            [
                'name' => 'Angga Septiadi',
                'jabatan' => 'Staff',
                'bagian' => 'BengkelListrik',
                'email' => 'anggaseptiadi@pupuk-kujang.com',
            ],
            [
                'name' => 'Iman',
                'jabatan' => 'Staff',
                'bagian' => 'BengkelInstrumen',
                'email' => 'iman@pupuk-kujang.com',
            ],
            [
                'name' => 'Firman Maulana',
                'jabatan' => 'Staff',
                'bagian' => 'BengkelInstrumen',
                'email' => 'firmanmaulana@pupuk-kujang.com',
            ],
            [
                'name' => 'user',
                'jabatan' => 'user',
                'bagian' => 'user',
                'email' => 'user@pupuk-kujang.com',
            ],
        ];

        // 4. Masukkan data ke tabel users
        foreach ($usersData as $data) {
            User::updateOrCreate(
                ['email' => $data['email']], // Cek berdasarkan email agar tidak duplikat
                [
                    'name' => $data['name'],
                    'password' => Hash::make('password123'), // Password default, silakan ubah
                    'jabatan' => $data['jabatan'],
                    'bagian' => $data['bagian'],
                ]
            );
        }
    }
}
