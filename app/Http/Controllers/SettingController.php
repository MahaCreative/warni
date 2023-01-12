<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        // dd($user);
        return inertia('Auth/Setting/Setting', compact('user'));
    }
    public function update(Request $request)
    {
        $email = $request->email === null ? $request->user()->email : $request->email;
        $name = $request->name === null ? $request->user()->name : $request->name;
        $request->validate([
            'password' => 'required|confirmed',
            'password_confirmation' => 'same:password'
        ]);
        $request->user()->update([
            'name' => $name,
            'email' => $email,
            'password' => $request->password,
        ]);
        return redirect()->back()->with([
            'type' => 'success',
            'message' => 'Berhasil Merubah Data'
        ]);
    }
}
