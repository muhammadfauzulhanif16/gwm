<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        User::create([
            'id' => Str::uuid(),
            'name' => 'Admin',
            'username' => 'admin',
            'password' => bcrypt('admin'),
        ]);

        $this->call([
            SocialMediaSeeder::class,
            JobSeeder::class,
            ConsumptionSeeder::class,
            PrayerSeeder::class,
        ]);
    }
}
