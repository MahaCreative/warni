<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class Cetak extends Controller
{
    public function registrasi(Request $request)
    {
        $registrasi = $request->session()->get('cetak');
        // dd($registrasi);
        return inertia('Auth/Cetak/Registrasi', ['registrasi' => $registrasi]);
    }
    public function prosesRegistrasi(Request $request)
    {
        $proses_registrasi = $request->session()->get('cetak');
        return inertia('Auth/Cetak/ProsesRegistrasi', ['dataproses' => $proses_registrasi]);
    }
    public function permintaan_darah(Request $request)
    {
        $permintaan = $request->session()->get('cetak');
        return inertia('Auth/Cetak/PermintaanDarah', ['permintaan' => $permintaan]);
    }
    public function proses_permintaan_darah(Request $request)
    {
        $permintaan = $request->session()->get('cetak');
        return inertia('Auth/Cetak/ProsesPermintaanDarah', ['permintaan' => $permintaan]);
    }
    public function pendonor(Request $request)
    {
        $pendonor = $request->session()->get('cetak');

        return inertia('Auth/Cetak/Pendonor', ['pendonor' => $pendonor]);
    }
    public function darahmasuk(Request $request)
    {
        $darahmasuk = $request->session()->get('cetak');
        // dd($darahmasuk);
        return inertia('Auth/Cetak/DarahMasuk', ['darahmasuk' => $darahmasuk]);
    }
    public function darahkeluar(Request $request)
    {
        $darahkeluar = $request->session()->get('cetak');

        return inertia('Auth/Cetak/Pendonor', ['darahkeluar' => $darahkeluar]);
    }
}
