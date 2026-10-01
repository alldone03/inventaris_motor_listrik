<?php

namespace Database\Seeders;

use App\Models\Motor;
use App\Models\MotorChecklist;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create demo user
        User::firstOrCreate(
            ['email' => 'admin@pupuk-kujang.co.id'],
            [
                'name' => 'Bengkel Listrik Admin',
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'admin@kujang.com'],
            [
                'name' => 'Admin',
                'role' => 'admin',
                'password' => bcrypt('password'),
            ]
        );

        User::firstOrCreate(
            ['email' => 'user@kujang.com'],
            [
                'name' => 'User',
                'role' => 'user',
                'password' => bcrypt('password'),
            ]
        );

        $defaultTemplate = [
            [
                'no' => '1',
                'section' => 'Penerimaan dan Identifikasi',
                'tasks' => [
                    ['sub' => '1.1', 'task' => 'Catat Tanggal datang Motor', 'checked' => true, 'notes' => 'Datang: 25 September 2026', 'status' => 'OK'],
                    ['sub' => '1.2', 'task' => 'Catat Nama Item Motor', 'checked' => true, 'notes' => '2213-JA', 'status' => 'OK'],
                    ['sub' => '1.3', 'task' => 'Catat daya (KW/HP), Tegangan, Ampere, RPM', 'checked' => true, 'notes' => '75 HP / 55 kW, 440 V, 91 A, 1480 RPM', 'status' => 'OK'],
                    ['sub' => '1.4', 'task' => 'Catat Area Motor Di lapangan', 'checked' => true, 'notes' => 'Area Produksi 25 (Pompa Sirkulasi)', 'status' => 'OK'],
                    ['sub' => '1.5', 'task' => 'Catat keluhan di lapangan', 'checked' => true, 'notes' => 'Vibrasi sisi DE tinggi dan suhu bearing panas', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '2',
                'section' => 'Pemeriksaan Awal',
                'tasks' => [
                    ['sub' => '2.1', 'task' => 'Ukur Resistan isolasi (Megger)', 'checked' => true, 'notes' => '> 500 MΩ (Megger 1000V DC)', 'status' => 'OK'],
                    ['sub' => '2.2', 'task' => 'Ukur Tahanan Lilitan antar Fhasa (Ohm Meter)', 'checked' => true, 'notes' => 'U-V: 0.125 Ω, V-W: 0.125 Ω, W-U: 0.124 Ω', 'status' => 'OK'],
                    ['sub' => '2.3', 'task' => 'Tes Putaran Rotor/Bearing (Macet/Tidak)', 'checked' => true, 'notes' => 'Putaran rotor tersendat dan berdecit di DE', 'status' => 'NO'],
                ]
            ],
            [
                'no' => '3',
                'section' => 'Pembongkaran',
                'tasks' => [
                    ['sub' => '3.1', 'task' => 'Lepas Coupling/Pulley', 'checked' => true, 'notes' => 'Coupling dilepas menggunakan hydraulic puller', 'status' => 'OK'],
                    ['sub' => '3.2', 'task' => 'Buka Cover fan, Fan', 'checked' => true, 'notes' => 'Cover fan & cooling fan dilepas, utuh', 'status' => 'OK'],
                    ['sub' => '3.3', 'raw' => 'Keluarkan Rotor dari Stator', 'task' => 'Keluarkan Rotor dari Stator', 'checked' => true, 'notes' => 'Rotor dikeluarkan dengan hati-hati menggunakan crane', 'status' => 'OK'],
                    ['sub' => '3.4', 'task' => 'Lepas Bearing dari Rotor', 'checked' => true, 'notes' => 'Bearing DE 6314 & NDE 6312 telah dilepas', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '4',
                'section' => 'Pembersihan',
                'tasks' => [
                    ['sub' => '4.1', 'task' => 'Pembersihan Rotor dan Stator', 'checked' => true, 'notes' => 'Dibersihkan dengan solvent contact cleaner elektrik', 'status' => 'OK'],
                    ['sub' => '4.2', 'task' => 'Keringkan Lilitan (Oven)', 'checked' => true, 'notes' => 'Di-oven suhu 105°C selama 8 jam', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '5',
                'section' => 'Perbaikan Mekanis',
                'tasks' => [
                    ['sub' => '5.1', 'task' => 'Ganti Bearing sesuai Spek', 'checked' => true, 'notes' => 'Bearing baru SKF 6314 C3 & 6312 C3', 'status' => 'OK'],
                    ['sub' => '5.2', 'task' => 'Perbaikan Rotor', 'checked' => true, 'notes' => 'Journal shaft run-out < 0.02 mm (Standar)', 'status' => 'OK'],
                    ['sub' => '5.3', 'task' => 'Perbaikan Stator', 'checked' => true, 'notes' => 'Coating insulating varnish ulang', 'status' => 'OK'],
                    ['sub' => '5.4', 'task' => 'Perbaikan fan dan Cover Fan', 'checked' => true, 'notes' => 'Cover fan diluruskan dan dibersihkan', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '6',
                'section' => 'Perakitan',
                'tasks' => [
                    ['sub' => '6.1', 'task' => 'Pasang Bearing Baru', 'checked' => true, 'notes' => 'Dipanaskan dengan induction heater 110°C, presisi', 'status' => 'OK'],
                    ['sub' => '6.2', 'task' => 'Pasang Rotor ke Stator', 'checked' => true, 'notes' => 'Rotor terpasang center ke stator core', 'status' => 'OK'],
                    ['sub' => '6.3', 'task' => 'Pasang Housing Bearing', 'checked' => true, 'notes' => 'End shield baut dikencangkan merata', 'status' => 'OK'],
                    ['sub' => '6.4', 'task' => 'Pasang Fan & Cover Fan', 'checked' => true, 'notes' => 'Fan cover terkunci aman', 'status' => 'OK'],
                    ['sub' => '6.5', 'task' => 'Pasang Coupling/Pulley', 'checked' => true, 'notes' => 'Coupling dipasang sesuai tanda batas shaft', 'status' => 'OK'],
                    ['sub' => '6.6', 'task' => 'Pengecatan Motor', 'checked' => true, 'notes' => 'Pengecatan primer & finishing biru industri', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '7',
                'section' => 'Pengetesan',
                'tasks' => [
                    ['sub' => '7.1', 'task' => 'Cek Ampere Tes Running', 'checked' => true, 'notes' => 'No Load: U=24.5A, V=24.8A, W=24.4A', 'status' => 'OK'],
                    ['sub' => '7.2', 'task' => 'Cek Vibrasi (Insfeksi) sisi H,V,A', 'checked' => true, 'notes' => 'H: 1.15 mm/s, V: 0.95 mm/s, A: 0.80 mm/s (Sangat Baik)', 'status' => 'OK'],
                    ['sub' => '7.3', 'task' => 'Tanggal Selesai Perbaikan', 'checked' => true, 'notes' => '30 September 2026', 'status' => 'OK'],
                ]
            ]
        ];

        // Seed Motor 1
        $motor1 = Motor::create([
            'item' => '2213-JA',
            'label_ke' => '61',
            'alamat_motor' => '25',
            'hp_kw' => '75 HP / 55 kW',
            'voltage' => '440 V',
            'ampere' => '91 A',
            'frame' => '250M',
            'ip_rating' => '55',
            'frequency' => '50 Hz',
            'manufacture' => 'TECO',
            'rpm' => '1480 RPM',
            'area' => 'Area Pabrik 1B (Ammonia Plant)',
            'keterangan' => 'Motor Pompa Sirkulasi Utama Pabrik 1B. Overhaul periodik & penggantian bearing DE/NDE.',
        ]);

        MotorChecklist::create([
            'motor_id' => $motor1->id,
            'no_form' => 'PK-BL-CHK-2026-001',
            'tanggal_masuk' => '2026-09-25',
            'tanggal_selesai' => '2026-09-30',
            'area_lapangan' => 'Area 25 - Pabrik 1B',
            'keluhan' => 'Vibrasi tinggi dan bearing bersuara kasar saat operasi beban penuh',
            'daya_spek' => '75 HP / 55 kW',
            'tegangan_spek' => '440 V',
            'ampere_spek' => '91 A',
            'rpm_spek' => '1480 RPM',
            'nama_teknisi' => 'Rahmat Hidayat',
            'nama_staf' => 'Ir. Bambang S.',
            'status_perbaikan' => 'Selesai',
            'items' => $defaultTemplate,
            'catatan_umum' => 'Motor telah selesai direkondisi dan lolos uji tes running tanpa beban. Siap dipasang kembali di lapangan.',
        ]);

        // Seed Motor 2
        $motor2 = Motor::create([
            'item' => '1102-FA',
            'label_ke' => '14',
            'alamat_motor' => '12',
            'hp_kw' => '150 kW',
            'voltage' => '380 V / 660 V',
            'ampere' => '280 A',
            'frame' => '315M',
            'ip_rating' => '56',
            'frequency' => '50 Hz',
            'manufacture' => 'SIEMENS',
            'rpm' => '2950 RPM',
            'area' => 'Boiler Feed Water Pump',
            'keterangan' => 'Blower motor draft fan unit 2',
        ]);

        // Seed Motor 3
        $motor3 = Motor::create([
            'item' => '3305-MB',
            'label_ke' => '88',
            'alamat_motor' => '40',
            'hp_kw' => '37 kW',
            'voltage' => '380 V',
            'ampere' => '72 A',
            'frame' => '200L',
            'ip_rating' => '55',
            'frequency' => '50 Hz',
            'manufacture' => 'ABB',
            'rpm' => '1450 RPM',
            'area' => 'Cooling Water Tower',
            'keterangan' => 'Motor penggerak kipas pendingin cooling water',
        ]);
    }
}
