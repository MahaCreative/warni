<?php

use App\Http\Controllers\Auth\Cetak;
use App\Http\Controllers\Auth\DarahController;
use App\Http\Controllers\Auth\DataPendonor;
use App\Http\Controllers\Auth\PermintaanDarahController;
use App\Http\Controllers\Auth\RegistrasiDonorController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EmailVerificationRequestController;
use App\Http\Controllers\ForgotPasswordController;
use App\Http\Controllers\Guest\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\Auth\ProsesRegistrasiController;
use App\Http\Controllers\Auth\EventController;
use App\Http\Controllers\Guest\EventDonor;
use App\Http\Controllers\Guest\SyaratDonor;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\SettingController;
use Illuminate\Support\Facades\Route;

Route::get('', [HomeController::class, 'index'])->name('home');
Route::get('syarat-donor', [SyaratDonor::class, 'index'])->name('syarat-donor');
Route::get('login', [LoginController::class, 'index'])->name('login');
Route::post('login', [LoginController::class, 'store']);
Route::get('event-donor', [EventDonor::class, 'index'])->name('event-donor');
Route::get('event-donor/{slug}', [EventDonor::class, 'show'])->name('event-show');


Route::get('register', [RegisterController::class, 'index'])->name('register');
Route::post('register', [RegisterController::class, 'store']);

Route::middleware('auth')->group(function () {
    Route::get('email/verify/{id}/{hash}', [EmailVerificationRequestController::class, 'index'])->name('verification.verify');
    Route::get('email/verify', [EmailVerificationRequestController::class, 'email_verify'])->name('verification.notice');
    Route::get('email/verification-notification', [EmailVerificationRequestController::class, 'resend_email'])->name('resend')->middleware('throttle:6,1');
});

Route::get('forgot-password', [ForgotPasswordController::class, 'index'])->name('forgot_password');
Route::post('forgot-password', [ForgotPasswordController::class, 'email_store']);
Route::get('reset-password/{token}', [ForgotPasswordController::class, 'reset_password'])->name('password.reset');
Route::post('reset-password-store', [ForgotPasswordController::class, 'reset_password_store'])->name('password.update');
Route::post('permintaan-darah', [PermintaanDarahController::class, 'store'])->name('permintaan-user');

Route::middleware('auth')->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // Auth
    Route::get('registrasi-donor', [RegistrasiDonorController::class, 'index'])->name('registrasi-donor');
    Route::post('registrasi-donor', [RegistrasiDonorController::class, 'store'])->name('registrasi-donor-store');
    Route::put('registrasi-donor/{id}', [RegistrasiDonorController::class, 'update'])->name('registrasi-donor-update');
    Route::delete('registrasi-donor/{id}', [RegistrasiDonorController::class, 'delete'])->name('registrasi-donor-delete');

    Route::get('admin/proses-registrasi-donor', [ProsesRegistrasiController::class, 'index'])->name('proses-donor');
    Route::post('admin/proses-registrasi', [ProsesRegistrasiController::class, 'store'])->name('store-proses-registrasi');
    Route::patch('admin/update-proses-registrasi/{id}', [ProsesRegistrasiController::class, 'update'])->name('update-proses-registrasi');
    Route::delete('admin/delete-proses-registrasi/{id}', [ProsesRegistrasiController::class, 'delete'])->name('delete-proses-registrasi');


    Route::get('admin/data-pendonor', [DataPendonor::class, 'index'])->name('admin-data-pendonor');
    Route::get('admin/data-pendonor/{id}', [DataPendonor::class, 'getData'])->name('admin-get-data-pendonor');

    // Darah 
    Route::get('admin/data-darah', [DarahController::class, 'index'])->name('data-darah');
    Route::get('admin/data-darah-masuk', [DarahController::class, 'darahmasuk'])->name('data-darah-masuk');
    Route::get('admin/data-darah-keluar', [DarahController::class, 'darahkeluar'])->name('data-darah-keluar');

    // Permintaan Darah
    Route::get('admin/permintaan-darah', [PermintaanDarahController::class, 'index'])->name('permintaan-darah');
    Route::post('admin/permintaan-darah', [PermintaanDarahController::class, 'store']);
    Route::put('admin/permintaan-darah/{id}', [PermintaanDarahController::class, 'update'])->name('permintaan-darah-update');
    Route::delete('admin/permintaan-darah/{id}', [PermintaanDarahController::class, 'delete'])->name('permintaan-darah-delete');
    Route::post('admin/permintaan-darah/proses-permintaan', [PermintaanDarahController::class, 'proses_permintaan'])->name('permintaan-darah-proses');

    // Proses Permintaan Darah
    Route::get('cetak-registrasi', [Cetak::class, 'registrasi'])->name('cetak-registrasi');
    Route::get('cetak-proses-registrasi', [Cetak::class, 'prosesRegistrasi'])->name('cetak-proses-registrasi');
    Route::get('cetak-permintaan-darah', [Cetak::class, 'permintaan_darah'])->name('cetak-permintaan-darah');
    Route::get('cetak-proses-permintaan-darah', [Cetak::class, 'proses_permintaan_darah'])->name('cetak-proses-permintaan-darah');
    Route::get('cetak-pendonor', [Cetak::class, 'pendonor'])->name('cetak-pendonor');
    Route::get('cetak-darah-masuk', [Cetak::class, 'darahmasuk'])->name('cetak-darah-masuk');
    Route::get('cetak-darah-keluar', [Cetak::class, 'darahkeluar'])->name('cetak-darah-keluar');

    Route::get('users', [UserController::class, 'index'])->name('admin-users');
    Route::put('users-update', [UserController::class, 'update'])->name('admin-users-update');

    Route::get('data-event', [EventController::class, 'index'])->name('event');
    Route::get('data-event-create', [EventController::class, 'create'])->name('event-create');
    Route::post('data-event-create', [EventController::class, 'store']);
    Route::get('data-event-update/{slug}', [EventController::class, 'update'])->name('event-update');
    Route::patch('data-event-update', [EventController::class, 'store_update'])->name('event-update-patch');
    Route::delete('data-event-delete/{slug}', [EventController::class, 'delete'])->name('event-delete');

    Route::get('setting-profile', [SettingController::class, 'index'])->name('setting');
    Route::put('setting-profile', [SettingController::class, 'update'])->name('setting-put');
});

Route::get('register', [RegisterController::class, 'index'])->name('register');
Route::post('register', [RegisterController::class, 'store']);

Route::get('logout', LogoutController::class)->name('logout');
