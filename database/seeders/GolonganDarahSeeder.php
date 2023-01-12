<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class GolonganDarahSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('golongan_darahs')->insert([
            ['golongan_darah' => 'A'],
            ['golongan_darah' => 'A+'],
            ['golongan_darah' => 'B'],
            ['golongan_darah' => 'B+'],
            ['golongan_darah' => 'AB'],
            ['golongan_darah' => 'AB+'],
            ['golongan_darah' => 'O'],
            ['golongan_darah' => 'O+'],
        ]);
    }
}
