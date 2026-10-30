<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\GovernorHistory;

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
        'pdf_path'
    ];

    public function histories()
    {
        return $this->hasMany(GovernorHistory::class);
    }
}
