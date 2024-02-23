<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreConsumptionRequest;
use App\Http\Requests\UpdateConsumptionRequest;
use App\Models\Consumption;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ConsumptionController extends Controller
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
        $consumptions = Cache::remember('consumptions', 60, function () {
            return Consumption::all();
        });
        $consumptions->transform(function ($consumption) {
            return [
                'id' => $consumption->id,
                'name' => $consumption->name,
                'created_at' => $consumption->created_at->format('d-m-Y H:i:s'),
                'updated_at' => $consumption->updated_at->format('d-m-Y H:i:s'),
            ];
        });

        return Inertia::render('Consumption/Index', [
            'title' => 'Daftar Konsumsi',
            'description' => 'Daftar konsumsi yang digunakan oleh warga.',
            'meta' => session('meta'),
            'consumptions' => $consumptions,
            'citizens' => []
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreConsumptionRequest $request)
    {
        Cache::forget('consumptions');

        foreach ($request->consumptions as $consumption) {
            Consumption::create([
                'id' => Str::uuid(),
                'name' => $consumption['name'],
            ]);

            //                event(new SocialMediaEvent($socialMedia));
        }

        return to_route('consumptions.store')->with('meta', [
            'status' => true,
            'title' => 'Konsumsi berhasil ditambahkan'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $consumptions = Cache::remember('consumptions', 60, function () {
            return Consumption::all();
        });

        return Inertia::render('Consumption/Create', [
            'title' => 'Tambah Konsumsi',
            'description' => 'Tambahkan satu atau lebih konsumsi secara sekaligus.',
            'consumptions' => $consumptions
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Consumption $consumption)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Consumption $consumption)
    {
        $consumptions = Cache::remember('consumptions', 60, function () {
            return Consumption::all();
        });

        return Inertia::render('Consumption/Edit', [
            'title' => "Ubah Konsumsi ($consumption->name)",
            'description' => 'Ubah rincian konsumsi.',
            'consumptions' => $consumptions,
            'consumption' => $consumption
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateConsumptionRequest $request, Consumption $consumption)
    {
        Cache::forget('consumptions');

        $consumption->update($request->all());

        return to_route('consumptions.index')->with('meta', [
            'status' => true,
            'title' => 'Konsumsi berhasil diubah'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Consumption $consumption)
    {
        Cache::forget('consumptions');

        $consumption->delete();

        return to_route('consumptions.index')->with('meta', [
            'status' => true,
            'title' => 'Konsumsi berhasil dihapus'
        ]);
    }
}
