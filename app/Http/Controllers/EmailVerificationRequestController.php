<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;

class EmailVerificationRequestController extends Controller
{
    public function index(EmailVerificationRequest $request)
    {

        $request->fulfill();
        return redirect('/');
    }

    public function email_verify(Request $request)
    {

        if ($request->user()->hasVerifiedEmail()) {
            return redirect()->route('');
        } else {
            return inertia('Guest/Email/VerifyEmail');
        }
    }
    public function resend_email(Request $request)
    {
        $request->user()->sendEmailVerificationNotification();
    }
}
