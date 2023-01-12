<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRegistrasiDonorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('registrasi_donors', function (Blueprint $table) {
            $table->id();
            $table->string('kode_registrasi');
            $table->foreignId('pendonor_id')->nullable();
            $table->date('tanggal_donor_darah');
            $table->time('jam_donor_darah')->nullable();
            $table->string('jenis_donor')->nullable();
            $table->string('status_donor');
            $table->foreignId('golongan_darah');
            $table->string('keterangan')->nullable();
            $table->string('status_dilihat')->default('belum dilihat')->nullable();
            $table->foreignId('petugas_id')->nullable();
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
        Schema::dropIfExists('registrasi_donors');
    }
}
