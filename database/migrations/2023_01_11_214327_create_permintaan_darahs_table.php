<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePermintaanDarahsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('permintaan_darahs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('golongan_darah_id');
            $table->foreignId('petugas_id')->nullable();
            $table->string('kode_permintaan');
            $table->string('nama');
            $table->date('tanggal_lahir');
            $table->string('jumlah_permintaan');
            $table->string('keterangan');
            $table->string('status')->default('verifikasi');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('permintaan_darahs');
    }
}
