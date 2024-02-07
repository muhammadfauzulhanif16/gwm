<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;

    class Citizen extends Model
    {
        use HasFactory;

        public $incrementing = false;
        public $keyType = 'string';

        protected $fillable = [
            'id',
            'name',
            'gender',
            'age',
            'phone_number',
            'neighborhood',
            'hamlet',
            'urban_village',
            'sub_district',
            'latitude',
            'longitude',
            'job_id',
            'income',
            'dependents',
            'workplace',
            'field',
            'scale',
            'description',
        ];

        public function job()
        {
            return $this->belongsTo(Job::class);
        }

        public function socialMedias()
        {
            return $this->hasOne(CitizenSocialMedia::class);
        }
    }
