<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\UpdateCitizenRequest;
    use App\Models\Citizen;
    use App\Models\Consumption;
    use App\Models\Job;
    use App\Models\Prayer;
    use App\Models\SocialMedia;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Cache;
    use Inertia\Inertia;
    use Illuminate\Support\Str;

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
            $citizens = Cache::remember('citizens', 60, function () {
                return Citizen::all();
            });
            $citizens->transform(function ($consumption) {
                return [
                    'id' => $consumption->id,
                    'name' => $consumption->name,
                    'gender' => $consumption->gender,
                    'age' => $consumption->age,
                    'phone_number' => $consumption->phone_number,
                    'neighborhood' => $consumption->neighborhood,
                    'hamlet' => $consumption->hamlet,
                    'urban_village' => $consumption->urban_village,
                    'sub_district' => $consumption->sub_district,
                    'latitude' => $consumption->latitude,
                    'longitude' => $consumption->longitude,
                    'job' => $consumption->job->name,
                    'income' => $consumption->income,
                    'dependents' => $consumption->dependents,
                    'workplace' => $consumption->workplace,
                    'field' => $consumption->field,
                    'scale' => $consumption->scale,
                    'description' => $consumption->description,
                    'created_at' => $consumption->created_at->format('d-m-Y H:i:s'),
                    'updated_at' => $consumption->updated_at->format('d-m-Y H:i:s'),
                ];
            });

            return Inertia::render('Citizen/Index', [
                'title' => 'Daftar Warga',
                'description' => 'Daftar warga yang terdaftar.',
                'meta' => session('meta'),
                'citizens' => $citizens
            ]);
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(Request $request)
        {
            foreach ($request->citizens as $citizen) {
                $c = Citizen::create([
                    'id' => Str::uuid(),
                    'name' => $citizen['personal']['name'],
                    'gender' => $citizen['personal']['gender'],
                    'age' => $citizen['personal']['age'],
                    'phone_number' => $citizen['personal']['phone_number'],
                    'neighborhood' => $citizen['personal']['neighborhood'],
                    'hamlet' => $citizen['personal']['hamlet'],
                    'urban_village' => $citizen['personal']['urban_village'],
                    'sub_district' => $citizen['personal']['sub_district'],
                    'latitude' => $citizen['personal']['latitude'],
                    'longitude' => $citizen['personal']['longitude'],
                    'job_id' => $citizen['job']['profession_id'],
                    'income' => $citizen['job']['income'],
                    'dependents' => $citizen['job']['dependents'],
                    'workplace' => $citizen['job']['workplace'],
                    'field' => $citizen['job']['field'],
                    'scale' => $citizen['job']['scale'],
                    'description' => $citizen['job']['description'],
                ]);

                foreach ($citizen['social_medias'] as $social_media) {
                    $c->socialMedias()->create(
                        [
                            'citizen_id' => $c['id'],
                            'social_media_id' => $social_media
                        ]
                    );
                }
            }
        }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {
//            $citizens = Cache::remember('citizens', 60, function () {
//                return Citizen::all();
//            });

            return Inertia::render('Citizen/Create', [
                'title' => 'Tambah Warga',
                'description' => 'Tambahkan satu atau lebih warga secara sekaligus.',
                'professions' => Job::all(),
                'consumptions' => Consumption::all(),
                'prayers' => Prayer::with('choices')->get(),
                'socialMedias' => SocialMedia::all(),
//                'citizens' => $citizens
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
            //
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(UpdateCitizenRequest $request, Citizen $citizen)
        {
            //
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Citizen $citizen)
        {
            //
        }
    }
