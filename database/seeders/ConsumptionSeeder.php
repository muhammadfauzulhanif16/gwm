<?php

    namespace Database\Seeders;

    use App\Models\Consumption;
    use Illuminate\Database\Seeder;
    use Illuminate\Support\Str;

    class ConsumptionSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {

            $consumptions = [
                'Beras',
                'Umbi-umbian',
                'Ikan',
                'Daging',
                'Telur',
                'Susu',
                'Udang',
                'Cumi',
                'Kerang',
                'Kacang-kacangan',
                'Buah-buahan',
                'Sayur-sayuran',
                'Minyak',
                'Kelapa',
                'Bahan minuman',
                'Bumbu-bumbu',
                'Makanan dan minuman jadi',
                'Rokok',
                'Pulsa',
                'Kuota',
                'Pakaian',
                'Alas kaki',
                'Alat tulis',
            ];

            foreach ($consumptions as $consumption) {
                Consumption::create([
                    'id' => Str::uuid(),
                    'name' => $consumption,
                ]);
            }
        }
    }
