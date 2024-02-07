<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use App\Models\Prayer;

class PrayerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $prayers = [
            [
                'name' => 'Akikah',
                'choices' => ['Alhamdulillah selalu ada yang lahiran', 'Kadang-kadang jika ada rezeki', 'Jarang', 'Insya Allah'],
            ],
            [
                'name' => 'Kurban',
                'choices' => ['Setiap tahun', 'Kadang-kadang 2 sampai 3 tahun sekali', 'Jarang', 'Insya Allah'],
            ],
            [
                'name' => 'Umrah',
                'choices' => ['Alhamdulillah pernah', 'Ada rencana sedang menabung', 'Insya Allah'],
            ],
            [
                'name' => 'Haji',
                'choices' => ['Alhamdulillah pernah', 'Sudah daftar, menunggu keberangakatan', 'Insya Allah'],
            ]
        ];

        foreach ($prayers as $prayer) {
            $p = Prayer::create([
                'id' => Str::uuid(),
                'name' => $prayer['name'],
            ]);

            foreach ($prayer['choices'] as $choice) {
                $p->choices()->create([
                    'id' => Str::uuid(),
                    'name' => $choice,
                ]);
            }
        }
    }
}
