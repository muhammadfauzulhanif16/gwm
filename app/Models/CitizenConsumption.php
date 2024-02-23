<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CitizenConsumption extends Model
{
    use HasFactory;

    public $incrementing = false;

    public $keyType = 'string';

    public $timestamps = false;

    protected $fillable = [
        'citizen_id',
        'consumption_id',
        'time_period',
    ];

    public function citizen()
    {
        return $this->belongsTo(Citizen::class);
    }

    public function consumption()
    {
        return $this->belongsTo(Consumption::class);
    }
}
