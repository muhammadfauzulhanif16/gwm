<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\BelongsTo;

    class CitizenSocialMedia extends Model
    {
        use HasFactory;

        public $incrementing = false;

        public $table = 'citizen_social_medias';
        public $keyType = 'string';

        public $timestamps = false;

        protected $fillable = [
            'citizen_id',
            'social_media_id',
        ];

        public function citizen(): BelongsTo
        {
            return $this->belongsTo(Citizen::class);
        }

        public function socialMedia(): BelongsTo
        {
            return $this->belongsTo(SocialMedia::class);
        }
    }
