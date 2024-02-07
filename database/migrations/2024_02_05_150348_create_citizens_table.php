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
            Schema::create('citizens', function (Blueprint $table) {
                $table->uuid('id')->primary();
                $table->string('name');
                $table->string('gender');
                $table->string('age');
                $table->string('phone_number');
                $table->string('neighborhood');
                $table->string('hamlet');
                $table->string('urban_village');
                $table->string('sub_district');
                $table->text('latitude')->nullable();
                $table->text('longitude')->nullable();
                $table->foreignUuid('job_id')->constrained()->cascadeOnDelete();
                $table->string('income');
                $table->string('dependents');
                $table->string('workplace');
                $table->string('field');
                $table->string('scale');
                $table->text('description');
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('citizens');
        }
    };
