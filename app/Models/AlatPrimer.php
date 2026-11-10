<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AlatPrimer extends Model
{
    protected $fillable = [
        'nama',
        'merk',
        'serial_number',
        'range',
    ];
}
