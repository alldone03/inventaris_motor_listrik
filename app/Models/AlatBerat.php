<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlatBerat extends Model
{
    protected $table = 'alat_berats';

    protected $fillable = [
        'nama_alat',
        'merk',
        'model',
        'nomor_unit',
        'kapasitas',
        'lokasi',
        'status',
        'keterangan',
    ];
}
