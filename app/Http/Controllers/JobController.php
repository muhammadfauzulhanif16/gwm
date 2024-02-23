<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Models\Citizen;
use App\Models\Job;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Str;
use Inertia\Inertia;

class JobController extends Controller
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
        $jobs = Cache::remember('jobs', 60, function () {
            return Job::all();
        });
        $jobs->transform(function ($job) {
            return [
                'id' => $job->id,
                'name' => $job->name,
                'created_at' => $job->created_at->format('d-m-Y H:i:s'),
                'updated_at' => $job->updated_at->format('d-m-Y H:i:s'),
            ];
        });

        return Inertia::render('Job/Index', [
            'title' => 'Daftar Pekerjaan',
            'description' => 'Daftar pekerjaan yang dilakukan oleh warga.',
            'meta' => session('meta'),
            'jobs' => $jobs,
            'citizens' => Job::withCount('citizenJobs')->having('citizen_jobs_count', '>', 0)->get()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreJobRequest $request)
    {
        Cache::forget('jobs');

        foreach ($request->jobs as $job) {
            Job::create([
                'id' => Str::uuid(),
                'name' => $job['name'],
            ]);
        }

        return to_route('jobs.store')->with('meta', [
            'status' => true,
            'title' => 'Pekerjaan berhasil ditambahkan'
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $jobs = Cache::remember('jobs', 60, function () {
            return Job::all();
        });

        return Inertia::render('Job/Create', [
            'title' => 'Tambah Pekerjaan',
            'description' => 'Tambahkan satu atau lebih pekerjaan secara sekaligus.',
            'jobs' => $jobs
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Job $job)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Job $job)
    {
        $jobs = Cache::remember('jobs', 60, function () {
            return Job::all();
        });

        return Inertia::render('Job/Edit', [
            'title' => "Ubah Pekerjaan ($job->name)",
            'description' => 'Ubah rincian pekerjaan.',
            'jobs' => $jobs,
            'job' => $job
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateJobRequest $request, Job $job)
    {
        Cache::forget('jobs');

        $job->update($request->all());

        return to_route('jobs.index')->with('meta', [
            'status' => true,
            'title' => 'Pekerjaan berhasil diubah'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Job $job)
    {
        Cache::forget('jobs');

        $job->delete();

        return to_route('jobs.index')->with('meta', [
            'status' => true,
            'title' => 'Pekerjaan berhasil dihapus'
        ]);
    }
}
