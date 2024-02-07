<?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    return new class extends Migration {
        /**
         * Run the migrations.
         */
        public function up(): void
        {
            Schema::create('citizen_social_medias', function (Blueprint $table) {
//                $table->id();
                $table->foreignUuid('citizen_id')->constrained('citizens')->cascadeOnDelete();
                $table->foreignUuid('social_media_id')->constrained('social_medias')->cascadeOnDelete();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('citizen_social_medias');
        }
    };
