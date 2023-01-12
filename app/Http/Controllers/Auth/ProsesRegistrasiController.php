<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\ProsesRegistrasiDonor;
use App\Models\StokDarah;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ProsesRegistrasiController extends Controller
{
    public function query()
    {
        return ProsesRegistrasiDonor::join('users', 'users.id', 'proses_registrasi_donors.petugas_id')
            ->join('registrasi_donors', 'proses_registrasi_donors.registrasi_donor_id', 'registrasi_donors.id')
            ->join('pendonors', 'pendonors.id', 'registrasi_donors.pendonor_id')
            ->join('golongan_darahs', 'registrasi_donors.golongan_darah', 'golongan_darahs.id')
            ->select(
                'users.name',
                'registrasi_donors.kode_registrasi',
                'proses_registrasi_donors.*',
                'pendonors.nama',
                'golongan_darahs.golongan_darah'
            );
    }
    public function index(Request $req)
    {
        $dataproses = [];
        $startDate =  Carbon::now()->startOfMonth()->format('Y-m-d');
        $endDate = Carbon::now()->endOfMonth()->format('Y-m-d');
        // dd($endDate);
        $status = $req->q;
        $search = $req->search;
        $dari_tanggal = $req->dari_tanggal ? $req->dari_tanggal : $startDate;
        $sampai_tanggal = $req->sampai_tanggal ? $req->sampai_tanggal : $endDate;
        if ($req->q != null and $req->search == null) {
            // dd($sampai_tanggal);
            $dataproses = $this->query()
                // ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                // ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->where('proses_registrasi_donors.status', $status)
                ->get();
        } else if ($req->q == null and $req->search !== null) {
            $dataproses = $this->query()
                ->where('pendonors.nama', 'like', '%' . $search . '%')
                ->orWhere('golongan_darahs.golongan_darah', 'like', '%' . $search . '%')
                ->orWhere('users.name', 'like', '%' . $search . '%')
                ->orderByDesc('proses_registrasi_donors.created_at')
                // ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                // ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->get();
        } else if ($req->q !== null and $req->search !== null) {
            $dataproses = $this->query()
                ->where([['pendonors.nama', 'like', '%' . $search . '%'], ['proses_registrasi_donors.status', $status]])
                ->orWhere([['golongan_darahs.golongan_darah', 'like', '%' . $search . '%'], ['proses_registrasi_donors.status', $status]])
                ->orWhere([['users.name', 'like', '%' . $search . '%'], ['proses_registrasi_donors.status', $status]])
                // ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                // ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->orderByDesc('proses_registrasi_donors.created_at')
                ->get();
        } else {

            $dataproses = $this->query()
                ->where('proses_registrasi_donors.created_at', '>=', $dari_tanggal)
                ->where('proses_registrasi_donors.created_at', '<=', $sampai_tanggal)
                ->orderByDesc('proses_registrasi_donors.created_at')
                ->get();
        }


        $berhasil = ProsesRegistrasiDonor::where('status', 'berhasil')->count();
        $gagal = ProsesRegistrasiDonor::where('status', 'gagal')->count();
        $req->session()->put('cetak', $dataproses);
        return inertia('Auth/Proses/index', compact('dataproses', 'berhasil', 'gagal', 'endDate', 'startDate'));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $attr = $request->validate(
            [
                'jumlah_darah' => 'required|numeric',
                'tekanan_darah' => 'required',
                'status' => 'required'
            ]
        );
        $jumlahDarah = $request->status === 'berhasil' ? $request->jumlah_darah : 0;

        $proses = ProsesRegistrasiDonor::create([
            'registrasi_donor_id' => $request->registrasi_id,
            'pendonor_id' => $request->pendonor_id,
            'petugas_id' => $request->user()->id,
            'status' => $request->status,
            'jumlah_darah' => $jumlahDarah,
            'tekanan_darah' => $request->tekanan_darah,
            'keterangan' => $request->keterangan
        ]);
        $darah = $proses->registrasi_donor->golongan_darah;
        // dd($darah);
        $stock_darah = StokDarah::findOrFail($darah);
        $stock_darah->stok = $stock_darah->stok + $proses->jumlah_darah;
        $stock_darah->save();
        $proses->registrasi_donor()->update([
            'status_donor' => 'berhasil'
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menambah Data'
        ]);
    }
    public function update($id, Request $request)
    {
        $proses = ProsesRegistrasiDonor::findOrFail($id);
        // dd($request->all());
        $darah_sebelumnya = $proses->jumlah_darah;
        $attr = $request->validate(
            [
                'jumlah_darah' => 'required|numeric',
                'tekanan_darah' => 'required',
                'status' => 'required'
            ]
        );
        $jumlahDarah = $request->status === 'berhasil' ? $request->jumlah_darah : 0;

        if ($request->status === 'berhasil') {
            $proses->update([
                'petugas_id' => $request->user()->id,
                'status' => $request->status,
                'jumlah_darah' => $jumlahDarah,
                'tekanan_darah' => $request->tekanan_darah,
                'keterangan' => $request->keterangan
            ]);
            $data = $proses->registrasi_donor->darah->stok;
            $data
                ->update(
                    ['stok' => $proses->registrasi_donor->darah->stok->stok - $darah_sebelumnya]
                );

            $stok = StokDarah::findOrFail($proses->registrasi_donor->golongan_darah);
            $stok['stok'] = $stok->stok + $request->jumlah_darah;
            $stok->save();
        } else {
            $proses->update([
                'petugas_id' => $request->user()->id,
                'status' => $request->status,
                'jumlah_darah' => 0,
                'tekanan_darah' => $request->tekanan_darah,
                'keterangan' => $request->keterangan
            ]);
            $data = $proses->registrasi_donor->darah->stok;
            $data
                ->update(
                    ['stok' => $proses->registrasi_donor->darah->stok->stok - $darah_sebelumnya]
                );
            $stok = StokDarah::findOrFail($proses->registrasi_donor->golongan_darah);
            $stok['stok'] = $stok->stok + $request->jumlah_darah;
            $stok->save();
        }
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Mengedit Data'
        ]);
    }
    public function delete($id)
    {
        $proses = ProsesRegistrasiDonor::with('registrasi_donor')->where('id', $id)->first();
        // $proses->registrasi_donor->darah->stok->stok = $proses->registrasi_donor->darah->stok->stok - $proses->jumlah_darah;
        $proses->registrasi_donor->darah->stok()
            ->update(
                ['stok' => $proses->registrasi_donor->darah->stok->stok - $proses->jumlah_darah]
            );
        $proses->registrasi_donor()->update([
            'status_donor' => 'verifikasi'
        ]);

        $proses->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menghapus Data'
        ]);
    }
}
