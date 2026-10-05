<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class MotorChecklist extends Model
{
    use HasFactory;

    protected $fillable = [
        'motor_id',
        'no_form',
        'tanggal_masuk',
        'tanggal_selesai',
        'area_lapangan',
        'keluhan',
        'daya_spek',
        'tegangan_spek',
        'ampere_spek',
        'rpm_spek',
        'nama_teknisi',
        'nama_staf',
        'tanggal_approval_teknisi',
        'tanggal_approval_staf',
        'status_perbaikan',
        'items',
        'catatan_umum',
    ];

    protected $casts = [
        'items' => 'array',
        'tanggal_masuk' => 'date:Y-m-d',
        'tanggal_selesai' => 'date:Y-m-d',
    ];

    public function motor(): BelongsTo
    {
        return $this->belongsTo(Motor::class);
    }

    public static function getDefaultTemplate(?Motor $motor = null): array
    {
        $today = date('Y-m-d');
        $itemCode = $motor ? $motor->item : '';
        $spekDaya = $motor ? ($motor->hp_kw . ', ' . $motor->voltage . ', ' . $motor->ampere . ($motor->rpm ? ', ' . $motor->rpm : '')) : '';
        $area = $motor ? ($motor->area ?: 'Alamat: ' . $motor->alamat_motor) : '';

        return [
            [
                'no' => '1',
                'section' => 'Penerimaan dan Identifikasi',
                'tasks' => [
                    ['sub' => '1.1', 'task' => 'Catat Tanggal datang Motor', 'checked' => true, 'notes' => 'Tgl: ' . date('d/m/Y'), 'status' => 'OK'],
                    ['sub' => '1.2', 'task' => 'Catat Nama Item Motor', 'checked' => true, 'notes' => $itemCode, 'status' => 'OK'],
                    ['sub' => '1.3', 'task' => 'Catat daya (KW/HP), Tegangan, Ampere, RPM', 'checked' => true, 'notes' => $spekDaya, 'status' => 'OK'],
                    ['sub' => '1.4', 'task' => 'Catat Area Motor Di lapangan', 'checked' => true, 'notes' => $area, 'status' => 'OK'],
                    ['sub' => '1.5', 'task' => 'Catat keluhan di lapangan', 'checked' => true, 'notes' => '', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '2',
                'section' => 'Pemeriksaan Awal',
                'tasks' => [
                    ['sub' => '2.1', 'task' => 'Ukur Resistan isolasi (Megger)', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '2.2', 'task' => 'Ukur Tahanan Lilitan antar Fhasa (Ohm Meter)', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '2.3', 'task' => 'Tes Putaran Rotor/Bearing (Macet/Tidak)', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '3',
                'section' => 'Pembongkaran',
                'tasks' => [
                    ['sub' => '3.1', 'task' => 'Lepas Coupling/Pulley', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '3.2', 'task' => 'Buka Cover fan, Fan', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '3.3', 'task' => 'Keluarkan Rotor dari Stator', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '3.4', 'task' => 'Lepas Bearing dari Rotor', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '4',
                'section' => 'Pembersihan',
                'tasks' => [
                    ['sub' => '4.1', 'task' => 'Pembersihan Rotor dan Stator', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '4.2', 'task' => 'Keringkan Lilitan (Oven)', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '5',
                'section' => 'Perbaikan Mekanis',
                'tasks' => [
                    ['sub' => '5.1', 'task' => 'Ganti Bearing sesuai Spek', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '5.2', 'task' => 'Perbaikan Rotor', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '5.3', 'task' => 'Perbaikan Stator', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '5.4', 'task' => 'Perbaikan fan dan Cover Fan', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '6',
                'section' => 'Perakitan',
                'tasks' => [
                    ['sub' => '6.1', 'task' => 'Pasang Bearing Baru', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '6.2', 'task' => 'Pasang Rotor ke Stator', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '6.3', 'task' => 'Pasang Housing Bearing', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '6.4', 'task' => 'Pasang Fan & Cover Fan', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '6.5', 'task' => 'Pasang Coupling/Pulley', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '6.6', 'task' => 'Pengecatan Motor', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                ]
            ],
            [
                'no' => '7',
                'section' => 'Pengetesan',
                'tasks' => [
                    ['sub' => '7.1', 'task' => 'Cek Ampere Tes Running', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '7.2', 'task' => 'Cek Vibrasi (Insfeksi) sisi H,V,A', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                    ['sub' => '7.3', 'task' => 'Tanggal Selesai Perbaikan', 'checked' => false, 'notes' => '', 'status' => 'OK'],
                ]
            ]
        ];
    }
}
