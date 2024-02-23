<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('citizen_prayers', function (Blueprint $table) {
            $table->foreignUuid('citizen_id')->constrained('citizens')->cascadeOnDelete();
            $table->foreignUuid('prayer_id')->constrained('prayers')->cascadeOnDelete();
            $table->foreignUuid('choice_id')->constrained('choices')->cascadeOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citizen_prayers');
    }
};
