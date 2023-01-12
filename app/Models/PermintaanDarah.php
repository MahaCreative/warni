<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PermintaanDarah extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function darah()
    {
        return $this->belongsTo(GolonganDarah::class);
    }
}
