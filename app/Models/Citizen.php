<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

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

    public function consumptions()
    {
        return $this->hasMany(CitizenConsumption::class);
    }

    public function prayers()
    {
        return $this->hasMany(CitizenPrayer::class);
    }

    public function socialMedias()
    {
        return $this->hasMany(CitizenSocialMedia::class);
    }

    protected static function booted()
    {
        static::updated(function () {
            Cache::forget('citizens');
            Cache::forget('genderCounts');
        });

        static::created(function () {
            Cache::forget('citizens');
            Cache::forget('genderCounts');
        });

        static::deleted(function () {
            Cache::forget('citizens');
            Cache::forget('genderCounts');
        });
    }
}
