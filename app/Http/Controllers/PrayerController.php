<?php

    namespace App\Http\Controllers;

    use App\Http\Requests\StorePrayerRequest;
    use App\Http\Requests\UpdatePrayerRequest;
    use App\Models\Prayer;
    use Illuminate\Support\Facades\Cache;
    use Illuminate\Support\Str;
    use Inertia\Inertia;

    class PrayerController extends Controller
    {
        /**
         * Display a listing of the resource.
         */
        public function index()
        {
            $prayers = Cache::remember('prayers', 60, function () {
                return Prayer::with('choices')->get();
            });
            $prayers->transform(function ($prayer) {
                return [
                    'id' => $prayer->id,
                    'name' => $prayer->name,
                    'created_at' => $prayer->created_at->format('d-m-Y H:i:s'),
                    'updated_at' => $prayer->updated_at->format('d-m-Y H:i:s'),
                    'choices' => $prayer->choices
                ];
            });

            return Inertia::render('Prayer/Index', [
                'title' => 'Daftar Ibadah',
                'description' => 'Daftar ibadah yang dilakukan oleh warga.',
                'meta' => session('meta'),
                'prayers' => $prayers
            ]);
        }

        /**
         * Store a newly created resource in storage.
         */
        public function store(StorePrayerRequest $request)
        {
            Cache::forget('prayers');

            foreach ($request->prayers as $prayer) {
                $p = Prayer::create([
                    'id' => Str::uuid(),
                    'name' => $prayer['name']
                ]);

                foreach ($prayer['choices'] as $choice) {
                    $p->choices()->create([
                        'id' => Str::uuid(),
                        'prayer_id' => $p->id,
                        'name' => $choice['name']
                    ]);
                }
            }

            return to_route('prayers.index')->with('meta', [
                'status' => true,
                'title' => 'Ibadah berhasil ditambahkan.'
            ]);
        }

        /**
         * Show the form for creating a new resource.
         */
        public function create()
        {
            $prayers = Cache::remember('prayers', 60, function () {
                return Prayer::with('choices')->get();
            });

            return Inertia::render('Prayer/Create', [
                'title' => 'Tambah Ibadah',
                'description' => 'Tambahkan satu atau lebih ibadah secara sekaligus.',
                'prayers' => $prayers
            ]);
        }

        /**
         * Display the specified resource.
         */
        public function show(Prayer $prayer)
        {
            //
        }

        /**
         * Show the form for editing the specified resource.
         */
        public function edit(Prayer $prayer)
        {
            $prayers = Cache::remember('prayers', 60, function () {
                return Prayer::with('choices')->get();
            });

            return Inertia::render('Prayer/Edit', [
                'title' => "Ubah Ibadah ($prayer->name)",
                'description' => 'Ubah rincian ibadah.',
                'prayers' => $prayers,
                'prayer' => $prayer->load('choices')
            ]);
        }

        /**
         * Update the specified resource in storage.
         */
        public function update(UpdatePrayerRequest $request, Prayer $prayer)
        {
            $prayer->update([
                'name' => $request->name
            ]);

            $prayer->choices()->delete();

            foreach ($request->choices as $choice) {
                $prayer->choices()->create([
                    'id' => Str::uuid(),
                    'name' => $choice['name']
                ]);
            }

            $prayer->touch();

            Cache::forget('prayers');

            return to_route('prayers.index')->with('meta', [
                'status' => true,
                'title' => 'Ibadah berhasil diperbarui.'
            ]);
        }

        /**
         * Remove the specified resource from storage.
         */
        public function destroy(Prayer $prayer)
        {
            Cache::forget('prayers');

            $prayer->delete();

            return to_route('prayers.index')->with('meta', [
                'status' => true,
                'title' => 'Ibadah berhasil dihapus.'
            ]);
        }
    }
