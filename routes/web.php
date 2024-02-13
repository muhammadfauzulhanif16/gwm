<?php

use App\Http\Controllers\CitizenController;
use App\Http\Controllers\ConsumptionController;
use App\Http\Controllers\JobController;
use App\Http\Controllers\PermissionController;
use App\Http\Controllers\PrayerController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\SocialMediaController;
use App\Http\Controllers\UserController;
use App\Models\Citizen;
use App\Models\CitizenSocialMedia;
use App\Models\Consumption;
use App\Models\Job;
use App\Models\SocialMedia;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Prayer;

/*
    |--------------------------------------------------------------------------
    | Web Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register web routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | contains the "web" middleware group. Now create something great!
    |
    */

Route::get('/', function () {
    return Inertia::render('Home', [
        'meta' => session('meta'),
        //            'canLogin' => Route::has('login'),
        //            'canRegister' => Route::has('register'),
        //            'laravelVersion' => Application::VERSION,
        //            'phpVersion' => PHP_VERSION,
        'title' => 'Beranda',
        'description' => 'Ringkasan data dari warga, pekerjaan, konsumsi, ibadah dan media sosial.',
        'citizens' => Citizen::all(),
        'jobs' => Job::all(),
        'consumptions' => Consumption::all(),
        'prayers' => Prayer::all(),
        'socialMedias' => SocialMedia::all(),
        'citizenSocialMedias' => CitizenSocialMedia::select('social_media_id', DB::raw('count(citizen_id) as citizen_count'))
            ->groupBy('social_media_id')
            ->get()->map(function ($citizen) {
                return [
                    'social_media_name' => $citizen->socialMedia->name,
                    'citizen_count' => $citizen->citizen_count
                ];
            })
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::resources([
    'citizens' => CitizenController::class,
    'jobs' => JobController::class,
    'consumptions' => ConsumptionController::class,
    'prayers' => PrayerController::class,
    'social-medias' => SocialMediaController::class,
]);

require __DIR__ . '/auth.php';
