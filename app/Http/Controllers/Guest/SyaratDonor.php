<?php

namespace App\Http\Controllers\Guest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class SyaratDonor extends Controller
{
    public function index()
    {
        return inertia('Guest/SyaratDonor/Index');
    }
}
