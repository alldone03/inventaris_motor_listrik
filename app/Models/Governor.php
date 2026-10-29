<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Governor extends Model
{
    protected $fillable = [
        'item_no',
        'governor_type',
        'rotation',
        'speed_range_rpm',
        'part_no',
        'serial_no',
        'ket',
        'stock_code',
        'area',
        'pabrik',
    ];

    public function histories()
    {
        return $this->hasMany(GovernorHistory::class);
    }
}
