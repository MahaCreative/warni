<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\GolonganDarah;
use App\Models\Pendonor;
use App\Models\RegistrasiDonor;
use Carbon\Carbon;
use Illuminate\Http\Request;

class RegistrasiDonorController extends Controller
{
    public function query()
    {

        return RegistrasiDonor::join('users', 'registrasi_donors.petugas_id', 'users.id')
            ->join('pendonors', 'pendonors.id', 'registrasi_donors.pendonor_id')
            ->join('golongan_darahs', 'registrasi_donors.golongan_darah', 'golongan_darahs.id')
            ->leftJoin('proses_registrasi_donors', 'registrasi_donors.id', 'proses_registrasi_donors.registrasi_donor_id')
            ->select([
                'registrasi_donors.*',
                'proses_registrasi_donors.*',
                'pendonors.*',
                'golongan_darahs.golongan_darah',
                'users.name'
            ]);
    }
    public function index(Request $request)
    {

        $registrasi = [];
        if ($request->j != null and $request->search == null) {
            if ($request->dari_tanggal or $request->sampai_tanggal) {
                $registrasi = $this->query()
                    ->where('registrasi_donors.jenis_donor', $request->j)
                    ->whereBetween('registrasi_donors.created_at', [$request->dari_tanggal, $request->sampai_tanggal])
                    ->orderByDesc('registrasi_donors.created_at')
                    ->get();
            } else {
                $registrasi = $this->query()
                    ->where('registrasi_donors.jenis_donor', $request->j)
                    ->orderByDesc('registrasi_donors.created_at')
                    ->get();
            }
        } else if ($request->search !== null and $request->j == null) {
            if ($request->dari_tanggal != null or $request->sampai_tanggal != null) {
                $registrasi = $this->query()
                    ->orWhere('registrasi_donors.tanggal_donor_darah', 'like', '%' . $request->search . '%')
                    ->orWhere('pendonors.nama', 'like', '%' . $request->search . '%')
                    ->orWhere('registrasi_donors.status_donor', 'like', '%' . $request->search . '%')
                    ->whereBetween('registrasi_donors.created_at', [$request->dari_tanggal, $request->sampai_tanggal])
                    ->orderByDesc('registrasi_donors.created_at')
                    ->get();
            } else {
                $registrasi = $this->query()
                    ->orWhere('registrasi_donors.tanggal_donor_darah', 'like', '%' . $request->search . '%')
                    ->orWhere('pendonors.nama', 'like', '%' . $request->search . '%')
                    ->orWhere('registrasi_donors.status_donor', 'like', '%' . $request->search . '%')
                    ->orderByDesc('registrasi_donors.created_at')
                    ->get();
            }
        } else if ($request->j == null and $request->search == null) {
            if ($request->dari_tanggal != null or $request->sampai_tanggal != null) {
                $registrasi = $this->query()->orderByDesc('registrasi_donors.created_at')
                    ->whereBetween('registrasi_donors.created_at', [$request->dari_tanggal, $request->sampai_tanggal])
                    ->get();
            } else {
                $registrasi = $this->query()->orderByDesc('registrasi_donors.created_at')
                    ->get();
            }
        } else if ($request->j !== null and $request->search !== null) {
            $registrasi = $this->query()
                ->where([['registrasi_donors.tanggal_donor_darah', 'like', '%' . $request->search . '%'], ['registrasi_donors.jenis_donor', $request->j]])
                ->orWhere([['pendonors.nama', 'like', '%' . $request->search . '%'], ['registrasi_donors.jenis_donor', $request->j]])
                ->orWhere([['profiles.nama', 'like', '%' . $request->search . '%'], ['registrasi_donors.jenis_donor', $request->j]])
                ->orWhere([['registrasi_donors.status_donor', 'like', '%' . $request->search . '%'], ['registrasi_donors.jenis_donor', $request->j]])
                // ->orderByDesc('registrasi_donors.created_at')
                ->get();
        }
        $pengganti = RegistrasiDonor::where('jenis_donor', 'pengganti')->count();
        $sukarela = RegistrasiDonor::where('jenis_donor', 'sukarela')->count();
        $bayaran = RegistrasiDonor::where('jenis_donor', 'bayaran')->count();
        // $count = DB::table('registrasi_donors')->select(DB::raw('jenis_donor as jenis'), DB::raw('count(jenis_donor) as total'))->groupBy(DB::raw('jenis_donor'))->get();
        // dd($registrasi);
        // dd($registrasi);
        $request->session()->put('cetak', $registrasi);
        return inertia('Auth/RegistrasiDonor/RegistrasiDonor', ['pengganti' => $pengganti, 'sukarela' => $sukarela, 'bayaran' => $bayaran, 'registrasi' => $registrasi]);
    }
    public function store(Request $request)
    {
        $petugas = $request->user()->id;

        $attr = $request->validate([
            'email' => 'required|email|min:6',
            'nama' => 'required|min:6',
            'tempat_lahir' => 'required|min:6',
            'tanggal_lahir' => 'required|date|before:now',
            'telp' => 'required|min:12',
            'alamat' => 'required|min:6',
            'jenis_kelamin' => 'required',
            'berat_badan' => 'min:2|max:4',
            'tinggi_badan' => 'min:2|max:4',
            'gol_darah' => 'required',
            'pekerjaan' => 'min:6',
            'riwayat_penyakit' => 'min:6',
            'tanggal_donor' => 'date|after:now',
            'jenis_donor' => 'required',

        ]);
        $CekPendonor = Pendonor::where('nama', 'like', '%' . $attr['nama'] . '%')
            ->where('email', 'like', '%' . $attr['email'] . '%')
            ->where('tanggal_lahir', 'like', '%' . $attr['tanggal_lahir'] . '%')
            ->where('tempat_lahir', 'like', '%' . $attr['tempat_lahir'] . '%')
            ->whereMonth('created_at', Carbon::now()->format('m'))
            ->count();
        if ($CekPendonor >= 3) {
            return redirect()->back()->with([
                'type' => 'error',
                'message' => 'Gagal Melakukan Donor Karena, Pendonor telah melakukan donor 3 kali dalam bulan ini'
            ]);
        }
        $pendonor = Pendonor::create([
            'email' => $request->email,
            'nama' => $request->nama,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'gol_darah' => $request->gol_darah,
            'pekerjaan' => $request->pekerjaan,
            'riwayat_penyakit' => $request->riwayat_penyakit,
        ]);

        $countRegis = RegistrasiDonor::count();
        $registrasiDonor = RegistrasiDonor::create([
            'kode_registrasi' => 'DD-' . Carbon::now()->format('d-m-Y') . 'NO-' . ($countRegis + 1),
            'pendonor_id' => $pendonor->id,
            'tanggal_donor_darah' => $request->tanggal_donor,
            'jam_donor_darah' => $request->jam_donor,
            'status_donor' => 'verifikasi',
            'golongan_darah' => $pendonor->gol_darah,
            'jenis_donor' => $request->jenis_donor,
            'petugas_id' => $petugas
        ]);

        if ($pendonor) {
            return redirect()->back()->with([
                'type' => 'success',
                'message' => 'Berhasil Melakukan Registrasi, Silahkan Tunggu Email Balasan'
            ]);
        } else {
            return redirect()->back()->with([
                'type' => 'error',
                'message' => 'Gagal Melakukan Registrasi'
            ]);
        }
    }
    public function update(Request $request)
    {
        $registrasi = RegistrasiDonor::where('id', $request->id)->first();
        $pendonor = $registrasi->pendonor;
        $pendonor->update([
            'email' => $request->email,
            'nama' => $request->nama,
            'tempat_lahir' => $request->tempat_lahir,
            'tanggal_lahir' => $request->tanggal_lahir,
            'telp' => $request->telp,
            'alamat' => $request->alamat,
            'jenis_kelamin' => $request->jenis_kelamin,
            'berat_badan' => $request->berat_badan,
            'tinggi_badan' => $request->tinggi_badan,
            'gol_darah' => $request->gol_darah,
            'pekerjaan' => $request->pekerjaan,
            'riwayat_penyakit' => $request->riwayat_penyakit,
        ]);
        $registrasi->update([

            'pendonor_id' => $pendonor->id,
            'tanggal_donor_darah' => $request->tanggal_donor,
            'jam_donor_darah' => $request->jam_donor,
            'status_donor' => 'verifikasi',
            'golongan_darah' => $pendonor->gol_darah,
            'jenis_donor' => $request->jenis_donor,
            'petugas_id' => 1
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Mengedit Data'
        ]);
    }
    public function delete($id)
    {
        // dd($id);
        $register = RegistrasiDonor::with('proses', 'darah')->where('kode_registrasi', $id)->first();
        if ($register->proses) {
            $register->darah->stok()->update(
                ['stok' => $register->darah->stok->stok - $register->proses->jumlah_darah]
            );
            $register->proses()->delete();
        }

        $register->delete();
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Menghapus Data'
        ]);
    }
}
