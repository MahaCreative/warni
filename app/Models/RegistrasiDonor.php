<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RegistrasiDonor extends Model
{
    use HasFactory;
    protected $guarded = [];
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function petugas()
    {
        return $this->belongsTo(User::class, 'petugas_id');
    }

    public function pendonor()
    {
        return $this->hasOne(Pendonor::class, 'id', 'pendonor_id');
    }
    public function darah()
    {
        return $this->belongsTo(GolonganDarah::class, 'golongan_darah');
    }
    public function proses()
    {
        return $this->hasOne(ProsesRegistrasiDonor::class);
    }
}
