<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\GolonganDarah;
use App\Models\ProsesPermintaanDarah;
use App\Models\ProsesRegistrasiDonor;
use App\Models\RegistrasiDonor;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DarahController extends Controller
{
    public function index()
    {
        $darah = GolonganDarah::with('stok')->get();
        return inertia('Auth/Darah/DataDarah', ['darah' => $darah]);
    }
    public function darahmasuk(Request $request)
    {


        $bulan = Carbon::now()->format('m');
        $tahun = Carbon::now()->format('Y');
        // dd($tahun);
        $getBulan = $request->bulan ? $request->bulan : $bulan;
        $getTahun = $request->tahun ? $request->tahun : $tahun;

        // dd($getBulan);
        $darahmasuk = [];
        if ($request->search) {
            $darahmasuk = RegistrasiDonor::join(
                'proses_registrasi_donors',
                'proses_registrasi_donors.registrasi_donor_id',
                'registrasi_donors.id'
            )
                ->join('golongan_darahs', 'golongan_darahs.id', 'registrasi_donors.golongan_darah')
                ->select([
                    // 'golongan_darahs.golongan_darah as golongan',
                    DB::raw('golongan_darahs.golongan_darah as golongan'),
                    DB::raw('sum(proses_registrasi_donors.jumlah_darah) as total_darah'),
                    DB::raw('DATE_FORMAT(proses_registrasi_donors.created_at, "%m %Y") as month'),
                ])
                ->where('golongan_darahs.golongan_darah', $request->search)
                ->whereYear('proses_registrasi_donors.created_at', $tahun)
                ->whereMonth('proses_registrasi_donors.created_at', $bulan)
                ->groupBy('golongan', 'month')
                // ->orderBy('golongan')
                ->get();
        } else {
            $darahmasuk = RegistrasiDonor::join(
                'proses_registrasi_donors',
                'proses_registrasi_donors.registrasi_donor_id',
                'registrasi_donors.id'
            )
                ->join('golongan_darahs', 'golongan_darahs.id', 'registrasi_donors.golongan_darah')
                ->select([
                    // 'golongan_darahs.golongan_darah as golongan',
                    DB::raw('golongan_darahs.golongan_darah as golongan'),
                    DB::raw('sum(proses_registrasi_donors.jumlah_darah) as total_darah'),
                    DB::raw('DATE_FORMAT(proses_registrasi_donors.created_at, "%m %Y") as month'),
                ])
                ->where('proses_registrasi_donors.status', 'berhasil')
                ->whereYear('proses_registrasi_donors.created_at', $getTahun)
                ->whereMonth('proses_registrasi_donors.created_at', $getBulan)

                ->groupBy('golongan', 'month')
                // ->orderBy('golongan')
                ->get();
        }

        $request->session()->put('cetak', $darahmasuk);
        return inertia('Auth/Darah/DarahMasuk', compact('darahmasuk', 'bulan', 'tahun'));
        // dd($darahmasuk);
    }
    public function darahkeluar(Request $request)
    {
        $bulan = Carbon::now()->format('m');
        $tahun = Carbon::now()->format('Y');
        // dd($tahun);
        $getBulan = $request->bulan ? $request->bulan : $bulan;
        $getTahun = $request->tahun ? $request->tahun : $tahun;

        if ($request->search) {
            $darahkeluar = ProsesPermintaanDarah::join('permintaan_darahs', 'permintaan_darahs.id', 'proses_permintaan_darahs.permintaan_darah_id')
                ->join('golongan_darahs', 'golongan_darahs.id', 'permintaan_darahs.golongan_darah_id')
                ->select([
                    'golongan_darahs.golongan_darah as golongan',
                    DB::raw('sum(jumlah_permintaan) as jumlah_darah_keluar'),
                    DB::raw('DATE_FORMAT(proses_permintaan_darahs.created_at, "%m %Y") as month'),
                ])
                ->where('golongan_darahs.golongan_darah', $request->search)
                ->whereYear('proses_permintaan_darahs.created_at', $tahun)
                ->whereMonth('proses_permintaan_darahs.created_at', $bulan)
                ->groupBy('golongan', 'month')
                ->get();
        } else {
            $darahkeluar = ProsesPermintaanDarah::join('permintaan_darahs', 'permintaan_darahs.id', 'proses_permintaan_darahs.permintaan_darah_id')
                ->join('golongan_darahs', 'golongan_darahs.id', 'permintaan_darahs.golongan_darah_id')
                ->select([
                    'golongan_darahs.golongan_darah as golongan',
                    DB::raw('sum(jumlah_permintaan) as jumlah_darah_keluar'),
                    DB::raw('DATE_FORMAT(proses_permintaan_darahs.created_at, "%m %Y") as month'),
                ])
                ->whereYear('proses_permintaan_darahs.created_at', $tahun)
                ->whereMonth('proses_permintaan_darahs.created_at', $bulan)
                ->groupBy('golongan', 'month')
                ->get();
        }
        $request->session()->put('cetak', $darahkeluar);
        return inertia('Auth/Darah/DarahKeluar', compact('darahkeluar', 'bulan', 'tahun'));
    }
}
