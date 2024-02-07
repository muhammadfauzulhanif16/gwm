<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;

    class Choice extends Model
    {
        use HasFactory;

        public $incrementing = false;
        public $keyType = 'string';
        public $timestamps = false;

        protected $fillable = ['id', 'prayer_id', 'name'];

        public function prayer(): BelongsTo
        {
            return $this->belongsTo(Prayer::class);
        }
    }

