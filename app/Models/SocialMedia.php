<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialMedia extends Model
{
    use HasFactory;

    public $incrementing = false;
    public $keyType = 'string';
    protected $table = 'social_medias';
    protected $fillable = ['id', 'name'];

    public function citizenSocialMedias()
    {
        return $this->hasMany(CitizenSocialMedia::class, 'social_media_id', 'id');
    }
}
