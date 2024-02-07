<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\StoreSocialMediaRequest;
    use App\Http\Requests\UpdateSocialMediaRequest;
    use App\Models\CitizenSocialMedia;
    use App\Models\SocialMedia;
    use Illuminate\Support\Facades\Cache;
    use Illuminate\Support\Facades\DB;
    use Illuminate\Support\Str;
    use Inertia\Inertia;

    class SocialMediaController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function index()
        {
            $socialMedias = Cache::remember('socialMedias', 60, function () {
                return SocialMedia::all();
            });
            $socialMedias->transform(function ($socialMedia) {
                return [
                    'id' => $socialMedia->id,
                    'name' => $socialMedia->name,
                    'created_at' => $socialMedia->created_at->format('d-m-Y H:i:s'),
                    'updated_at' => $socialMedia->updated_at->format('d-m-Y H:i:s'),
                ];
            });

            return Inertia::render('SocialMedia/Index', [
                'title' => 'Daftar Media Sosial',
                'description' => 'Daftar media sosial yang digunakan oleh warga.',
                'meta' => session('meta'),
                'socialMedias' => $socialMedias,
                'citizens' => CitizenSocialMedia::select('social_media_id', DB::raw('count(citizen_id) as citizen_count'))
                    ->groupBy('social_media_id')
                    ->get()->map(function ($citizen) {
                        return [
                            'social_media_name' => $citizen->socialMedia->name,
                            'citizen_count' => $citizen->citizen_count
                        ];
                    })
            ]);
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(StoreSocialMediaRequest $request)
        {
            Cache::forget('socialMedias');

            foreach ($request->socialMedias as $socialMedia) {
                SocialMedia::create([
                    'id' => Str::uuid(),
                    'name' => $socialMedia['name'],
                ]);

//                event(new SocialMediaEvent($socialMedia));
            }

            return to_route('social-medias.index')->with('meta', [
                'status' => true,
                'title' => 'Media sosial berhasil ditambahkan'
            ]);
        }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {
            $socialMedias = Cache::remember('socialMedias', 60, function () {
                return SocialMedia::all();
            });

            return Inertia::render('SocialMedia/Create', [
                'title' => 'Tambah Media Sosial',
                'description' => 'Tambahkan satu atau lebih media sosial secara sekaligus.',
                'socialMedias' => $socialMedias
            ]);
        }

        /**
         * Display the specified resource.
         */
        public function show(SocialMedia $socialMedia)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         */
        public function edit(SocialMedia $socialMedia)
        {
            $socialMedias = Cache::remember('socialMedias', 60, function () {
                return SocialMedia::all();
            });

            return Inertia::render('SocialMedia/Edit', [
                'title' => "Ubah Media Sosial ($socialMedia->name)",
                'description' => 'Ubah rincian media sosial.',
                'socialMedias' => $socialMedias,
                'socialMedia' => $socialMedia
            ]);
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(UpdateSocialMediaRequest $request, SocialMedia $socialMedia)
        {
            Cache::forget('socialMedias');

            $socialMedia->update($request->all());

            return to_route('social-medias.index')->with('meta', [
                'status' => true,
                'title' => 'Media sosial berhasil diubah'
            ]);

//            event(new SocialMediaEvent($socialMedia));
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(SocialMedia $socialMedia)
        {
            Cache::forget('socialMedias');

            $socialMedia->delete();

            return to_route('social-medias.index')->with('meta', [
                'status' => true,
                'title' => 'Media sosial berhasil dihapus'
            ]);

//            event(new SocialMediaEvent($socialMedia));
        }
    }
