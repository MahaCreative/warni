<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProsesPermintaanDarah extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function permintaan_darah()
    {
        return $this->belongsTo(PermintaanDarah::class);
    }
}
