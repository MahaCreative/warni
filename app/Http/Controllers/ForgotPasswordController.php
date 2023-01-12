<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;

class ForgotPasswordController extends Controller
{
    public function index()
    {
        return inertia('Guest/ForgotPassword/ForgotPassword');
    }

    public function email_store(Request $request)
    {
        $attr = $request->validate(['email' => 'required', 'email']);
        $user = User::where('email', $request->email)->first();

        if ($user) {
            $status = Password::sendResetLink($request->only('email'));
            return $status === Password::RESET_LINK_SENT
                ? back()->with(['status' => __($status)])
                : back()->withErrors(['email' => __($status)]);
        }
    }
    public function reset_password($token)
    {
        return inertia('Guest/ForgotPassword/ResetPassword', ['token' => $token]);
    }

    public function reset_password_store(Request $request)
    {

        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);


        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password)
                ])->setRememberToken(\Str::random(60));

                $user->save();
                event(new PasswordReset($user));
            }
        );
        Auth::attempt($request->only('email', 'password'));


        return $status === Password::PASSWORD_RESET
            ? redirect()->route('home')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);
    }
}
