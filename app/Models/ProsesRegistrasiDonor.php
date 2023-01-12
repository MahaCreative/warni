<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProsesRegistrasiDonor extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function registrasi_donor()
    {
        return $this->belongsTo(RegistrasiDonor::class);
    }
    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }
}
