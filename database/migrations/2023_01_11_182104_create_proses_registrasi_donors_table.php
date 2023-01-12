<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProsesRegistrasiDonorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('proses_registrasi_donors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('registrasi_donor_id');
            $table->foreignId('pendonor_id')->nullable();
            $table->foreignId('petugas_id');
            $table->string('status');
            $table->integer('jumlah_darah')->default(0);
            $table->string('tekanan_darah')->nullable();
            $table->string('keterangan')->nullable();
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
        Schema::dropIfExists('proses_registrasi_donors');
    }
}
