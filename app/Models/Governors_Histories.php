<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Governors_Histories extends Model
{
    protected $table = 'governors_histories';

    protected $fillable = [
        'governor_id',
        'date',
        'type',
        'pdf_link',
    ];

    public function governor()
    {
        return $this->belongsTo(Governor::class);
    }
}
