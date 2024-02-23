<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateCitizenRequest;
use App\Models\Choice;
use App\Models\Citizen;
use App\Models\CitizenConsumption;
use App\Models\CitizenPrayer;
use App\Models\CitizenSocialMedia;
use App\Models\Consumption;
use App\Models\Job;
use App\Models\Prayer;
use App\Models\SocialMedia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class CitizenController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth')->except('index');
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $citizens = Cache::rememberForever('citizens', function () {
            return Citizen::with(['job', 'consumptions', 'prayers', 'socialMedias'])
                ->get()
                ->sortBy('gender')
                ->map(function ($citizen) {
                    return array_merge($citizen->toArray(), [
                        'created_at' => $citizen->created_at->format('d-m-Y H:i:s'),
                        'updated_at' => $citizen->updated_at->format('d-m-Y H:i:s'),
                        'consumptions' => $citizen->consumptions->groupBy('time_period')->map(function ($consumptionItems, $time_period) {
                            return [
                                'time_period' => $time_period,
                                'items' => $consumptionItems->pluck('consumption.name')->join(', '),
                            ];
                        })->values(),
                        'prayers' => $citizen->prayers->groupBy('prayer_id')->map(function ($prayerItems, $prayer_id) {
                            $prayer = Prayer::find($prayer_id);
                            return [
                                'name' => $prayer ? $prayer->name : 'N/A',
                                'choice' => optional($prayer->choices->whereIn('id', $prayerItems->pluck('choice_id'))->first())->name,
                            ];
                        })->values(),
                        'social_medias' => $citizen->socialMedias->pluck('socialMedia.name')->join(', '),
                    ]);
                });
        });

        $genderCounts = Cache::rememberForever('genderCounts', function () use ($citizens) {
            return $citizens->countBy('gender')->map(function ($count, $gender) {
                return [
                    'name' => $gender,
                    'citizen_genders_count' => $count
                ];
            })->values();
        });

        return Inertia::render('Citizen/Index', [
            'title' => 'Daftar Warga',
            'description' => 'Daftar warga yang terdaftar.',
            'meta' => session('meta'),
            'citizens' => $citizens->values(),
            'genders' => $genderCounts,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            foreach ($request->citizens as $citizen) {
                $ctzn = Citizen::create(array_merge(
                    $citizen['personal'],
                    $citizen['job'],
                    ['id' => Str::uuid(), 'job_id' => $citizen['job']['profession_id']]
                ));

                $ctzn->consumptions()->createMany(array_map(function ($consumption) use ($ctzn) {
                    return [
                        'citizen_id' => $ctzn['id'],
                        'consumption_id' => Consumption::where('name', $consumption['value'])->pluck('id')->first(),
                        'time_period' => $consumption['time_period']
                    ];
                }, $citizen['consumptions']));

                $ctzn->prayers()->createMany(array_map(function ($prayer) use ($ctzn) {
                    return [
                        'citizen_id' => $ctzn['id'],
                        'prayer_id' => $prayer['prayer_id'],
                        'choice_id' => $prayer['choice_id']
                    ];
                }, $citizen['prayers']));

                $ctzn->socialMedias()->createMany(array_map(function ($social_media) use ($ctzn) {
                    return [
                        'citizen_id' => $ctzn['id'],
                        'social_media_id' => $social_media
                    ];
                }, $citizen['social_medias']));
            }

            return to_route('citizens.index')->with('meta', [
                'status' => true,
                'title' => 'Warga berhasil ditambahkan',
            ]);
        } catch (\Exception $e) {
            // Handle the exception
            return to_route('citizens.index')->with('meta', [
                'status' => false,
                'title' => 'Warga gagal ditambahkan',
            ]);
        }
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Citizen/Create', [
            'title' => 'Tambah Warga',
            'description' => 'Tambahkan satu atau lebih warga secara sekaligus dalam satu lokasi.',
            'professions' => Cache::rememberForever('professions', function () {
                return Job::all();
            }),
            'consumptions' => Cache::rememberForever('consumptions', function () {
                return Consumption::all();
            }),
            'prayers' => Cache::rememberForever('prayers', function () {
                return Prayer::with('choices')->get();
            }),
            'socialMedias' => Cache::rememberForever('socialMedias', function () {
                return SocialMedia::all();
            }),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Citizen $citizen)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Citizen $citizen)
    {
        $citizen->load(['job', 'prayers.choices', 'socialMedias', 'consumptions.consumption']);

        $groupedConsumptions = $citizen->consumptions->groupBy('time_period')->map(function ($consumptions, $time_period) {
            return [
                'time_period' => $time_period,
                'values' => $consumptions->map(function ($consumption) {
                    return $consumption->consumption->name;
                }),
            ];
        })->values();

        $transformedPrayers = $citizen->prayers->map(function ($prayer) {
            return [
                'name' => $prayer->prayer->name,
                'choice' => Choice::find($prayer->choice_id)->name,
            ];
        });

        $transformedSocialMedias = $citizen->socialMedias->map(function ($socialMedia) {
            return SocialMedia::find($socialMedia->social_media_id)->name;
        });

        return Inertia::render('Citizen/Edit', [
            'title' => "Ubah Warga ($citizen->name)",
            'description' => 'Ubah rincian warga.',
            'citizen' => array_merge($citizen->toArray(), [
                'consumptions' => $groupedConsumptions,
                'prayers' => $transformedPrayers,
                'social_medias' => $transformedSocialMedias
            ]),
            'professions' => Cache::rememberForever('professions', fn () => Job::all()),
            'consumptions' => Cache::rememberForever('consumptions', fn () => Consumption::all()),
            'prayers' => Cache::rememberForever('prayers', fn () => Prayer::with('choices')->get()),
            'socialMedias' => Cache::rememberForever('socialMedias', fn () => SocialMedia::all()),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Citizen $citizen)
    {
        // Cache::flush();

        try {
            $personal = $request->input('personal');
            $job = $request->input('job');

            $job['job_id'] = Job::where('name', $job['profession'])->firstOrFail()->id;

            $citizen->update(array_merge($personal, $job));

            $citizen->consumptions()->delete();
            $citizen->prayers()->delete();
            $citizen->socialMedias()->delete();

            foreach ($request->input('consumptions') as $consumption) {
                $citizen->consumptions()->create([
                    'consumption_id' => Consumption::where('name', $consumption['value'])->firstOrFail()->id,
                    'time_period' => $consumption['time_period']
                ]);
            }

            foreach ($request->input('prayers') as $prayer) {
                $prayerId = Prayer::where('name', $prayer['name'])->firstOrFail()->id;

                $choiceId = Choice::where([
                    ['name', '=', $prayer['choice']],
                    ['prayer_id', '=', $prayerId]
                ])->firstOrFail()->id;

                $citizen->prayers()->create([
                    'prayer_id' => $prayerId,
                    'choice_id' => $choiceId
                ]);
            }

            foreach ($request->input('social_medias') as $socialMedia) {
                $citizen->socialMedias()->create([
                    'social_media_id' => SocialMedia::where('name', $socialMedia)->firstOrFail()->id
                ]);
            }

            return redirect()->route('citizens.index')->with('meta', [
                'status' => true,
                'title' => 'Warga berhasil diperbarui',
            ]);
        } catch (\Exception $e) {
            return redirect()->route('citizens.index')->with('meta', [
                'status' => false,
                'title' => 'Warga gagal diperbarui',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Citizen $citizen)
    {
        try {
            $citizen->delete();
            return redirect()->route('citizens.index')->with('meta', [
                'status' => true,
                'title' => 'Warga berhasil dihapus',
            ]);
        } catch (\Exception $e) {
            return redirect()->route('citizens.index')->with('meta', [
                'status' => false,
                'title' => 'Warga gagal dihapus',
            ]);
        }
    }
}
