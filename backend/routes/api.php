<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('guest')->group(function () {
    Route::post('login', [AuthController::class, 'login'])->name('login');
    Route::post('refresh-token', [AuthController::class, 'refreshToken'])->name('refreshToken');
});

Route::middleware('auth:api')->group(function () {
    Route::post('logout', [AuthController::class, 'logout'])->name('logout');

    // User Resource Endpoints
    Route::resource('users', UserController::class);
    Route::group(['prefix' => 'users'], function () {
        Route::put('/{user}/change-password', [UserController::class, 'changePassword']);
        Route::put('/{user}/update-password', [UserController::class, 'updatePassword']);
    });

    // User Profile Endpoint
    Route::get('/profile', ProfileController::class);
});
