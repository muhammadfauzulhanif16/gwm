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
        Schema::create('citizen_consumptions', function (Blueprint $table) {
            $table->foreignUuid('citizen_id')->constrained('citizens')->cascadeOnDelete();
            $table->foreignUuid('consumption_id')->constrained('consumptions')->cascadeOnDelete();
            $table->string('time_period');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('citizen_consumptions');
    }
};
