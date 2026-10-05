<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Motor extends Model
{
    use HasFactory;

    protected $fillable = [
        'item',
        'label_ke',
        'alamat_motor',
        'hp_kw',
        'voltage',
        'ampere',
        'frame',
        'ip_rating',
        'frequency',
        'manufacture',
        'rpm',
        'area',
        'keterangan',
        'status',
    ];

    public function checklists(): HasMany
    {
        return $this->hasMany(MotorChecklist::class)->orderBy('created_at', 'desc');
    }
}
