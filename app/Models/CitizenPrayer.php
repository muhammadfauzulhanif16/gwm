<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CitizenPrayer extends Model
{
    use HasFactory;

    public $incrementing = false;

    public $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'citizen_id',
        'prayer_id',
        'choice_id',
    ];

    public function citizen()
    {
        return $this->belongsTo(Citizen::class);
    }

    public function prayer()
    {
        return $this->belongsTo(Prayer::class);
    }

    public function choices()
    {
        return $this->belongsTo(Choice::class);
    }
}
