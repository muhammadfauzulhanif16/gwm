<?php

    namespace Database\Seeders;

    use App\Models\Job;
    use Illuminate\Database\Seeder;
    use Illuminate\Support\Str;

    class JobSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {
            $jobs = [
                'Ibu Rumah Tangga',
                'Wirausaha',
                'Buruh',
                'Karyawan',
                'Petani',
                'Mahasiswa',
                'Pelajar',
                'Guru',
                'Dosen',
                'Pedagang',
                'Nelayan',
                'Sopir',
                'Ojek',
                'Freelancer',
                'Serabutan'
            ];

            foreach ($jobs as $job) {
                Job::create([
                    'id' => Str::uuid(),
                    'name' => $job,
                ]);
            }
        }
    }
