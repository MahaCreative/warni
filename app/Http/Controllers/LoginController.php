<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LoginController extends Controller
{
    public function index()
    {
        return inertia('Guest/Login/Login');
    }
    public function store(Request $request)
    {
        // dd($request->all());
        // sleep(3);
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'confirmed'],
            'password_confirmation' => ['required', 'same:password'],
        ]);

        if (Auth::attempt($request->only('email', 'password_confirmation', 'password'))) {
            session()->regenerate();
            return redirect()->back()->with([
                'type' => 'success',
                'message' => 'Berhasil Login'
            ]);
        } else {
            return redirect()->back()->with([
                'type' => 'error',
                'message' => 'Email atau password anda salah'
            ]);
        }
    }
}
