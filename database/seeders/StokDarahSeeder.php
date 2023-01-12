<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class StokDarahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('stok_darahs')->insert([
            ['darah_id' => 1, 'stok' => 0],
            ['darah_id' => 2, 'stok' => 0],
            ['darah_id' => 3, 'stok' => 0],
            ['darah_id' => 4, 'stok' => 0],
            ['darah_id' => 5, 'stok' => 0],
            ['darah_id' => 6, 'stok' => 0],
            ['darah_id' => 7, 'stok' => 0],
            ['darah_id' => 8, 'stok' => 0],
        ]);
    }
}
