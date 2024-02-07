<?php

    namespace App\Models;

    use Illuminate\Database\Eloquent\Factories\HasFactory;
    use Illuminate\Database\Eloquent\Model;
    use Illuminate\Database\Eloquent\Relations\HasMany;

    class Prayer extends Model
    {
        use HasFactory;

        public $incrementing = false;
        public $keyType = 'string';

        protected $fillable = ['id', 'name'];

        public function choices(): HasMany
        {
            return $this->hasMany(Choice::class);
        }
    }
