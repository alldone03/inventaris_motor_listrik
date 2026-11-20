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
        'status',
        'nomor_register_depnaker',
        'tanggal_surat_keluar',
        'tanggal_habis_berlaku',
        'status_silo',
        'keterangan',
        'pdf_path'
    ];
}
