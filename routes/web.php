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
use App\Models\CitizenConsumption;
use App\Models\CitizenJob;
use App\Models\CitizenPrayer;
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
            }),
        'data' => [
            [
                'title' => 'Warga',
                'citizen_count' => Citizen::count(),
                'subData' => Citizen::get()->groupBy('gender')->map(function ($items, $gender) {
                    return [
                        'name' => $gender,
                        'citizen_count' => $items->count()
                    ];
                })->values()
            ],
            [
                'title' => 'Pekerjaan',
                'citizen_count' => Citizen::count(),
                'subData' => Citizen::get()->groupBy('job_id')->map(function ($items, $job) {
                    return [
                        'name' => Job::find($job)->name,
                        'citizen_count' => $items->count()
                    ];
                })->values()
            ],
            [
                'title' => 'Konsumsi',
                'citizen_count' => CitizenConsumption::count(),
                'subData' => CitizenConsumption::get()->groupBy('time_period')->map(function ($items, $time_period) {
                    return [
                        'name' => $time_period,
                        'consumptions' => $items->groupBy('consumption_id')->map(function ($consumptionItems, $consumption_id) {
                            return [
                                'name' => Consumption::find($consumption_id)->name,
                                'citizen_count' => $consumptionItems->count()
                            ];
                        })->values()
                    ];
                })->values()
            ],
            [
                'title' => 'Ibadah',
                'citizen_count' => CitizenPrayer::count(),
                'subData' => Prayer::with([
                    'choices' => function ($query) {
                        $query->withCount('citizenPrayers')
                            ->having('citizen_prayers_count', '>', 0);
                    },
                ])->get()
            ],
            [
                'title' => 'Media Sosial',
                'citizen_count' => CitizenSocialMedia::count(),
                'subData' => CitizenSocialMedia::get()->groupBy('social_media_id')->map(function ($items, $social_media) {
                    return [
                        'name' => SocialMedia::find($social_media)->name,
                        'citizen_count' => $items->count()
                    ];
                })->values()
            ]
        ]
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
