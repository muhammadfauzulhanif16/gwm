<?php

    namespace Database\Seeders;

    use App\Models\SocialMedia;
    use Illuminate\Database\Seeder;
    use Illuminate\Support\Str;

    class SocialMediaSeeder extends Seeder
    {
        /**
         * Run the database seeds.
         */
        public function run(): void
        {
            $socialMedias = [
                'Facebook',
                'Instagram',
                'X/Twitter',
                'LinkedIn',
                'WhatsApp',
                'Telegram',
                'Snapchat',
                'TikTok',
                'Line',
                'WeChat',
            ];

            foreach ($socialMedias as $socialMedia) {
                SocialMedia::create([
                    'id' => Str::uuid(),
                    'name' => $socialMedia,
                ]);
            }
        }
    }
