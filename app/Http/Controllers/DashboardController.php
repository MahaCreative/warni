<?php

namespace App\Http\Controllers;

use App\Models\EvenDonor;
use App\Models\ProsesRegistrasiDonor;
use App\Models\StockDarah;
use App\Models\StokDarah;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function __invoke()
    {
        $darah = ProsesRegistrasiDonor::leftJoin('registrasi_donors', 'registrasi_donors.id', '=', 'proses_registrasi_donors.registrasi_donor_id')
            ->leftJoin('golongan_darahs', 'golongan_darahs.id', '=', 'registrasi_donors.golongan_darah')
            ->select(
                DB::raw('DATE_FORMAT(proses_registrasi_donors.created_at, "%m-%y") as tanggal'),
                DB::raw('golongan_darahs.golongan_darah as darah'),
                DB::raw('sum(proses_registrasi_donors.jumlah_darah) as jumlah_donor')
            )
            ->groupBy('tanggal', 'darah')
            ->orderBy('darah')
            ->get();

        $stokDarah = StokDarah::with('darah')->get();
        $jumlahPendonorBulan = ProsesRegistrasiDonor::select(DB::raw('sum(jumlah_darah) as jumlah'), DB::raw('DATE_FORMAT(updated_at, "%M %Y") as month'))->groupBy('month')->orderBy('month')->get();

        return inertia('Auth/Dashboard', ['darah' => $darah, 'stok' => $stokDarah, 'jumlahPendonorBulan' => $jumlahPendonorBulan]);
    }
}
