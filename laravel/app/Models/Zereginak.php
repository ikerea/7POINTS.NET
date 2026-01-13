<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Piso;
use App\Models\User;


class Zereginak extends Model
{
    protected $table = 'zereginak';

    protected $fillable = ['izena', 'deskripzioa', 'pisua_id'];


    public function pisua(): BelongsTo
    {
       return $this->belongsTo(Piso::class, 'pisua_id');
    }

    // Relación: Una tarea es realizada por muchos usuarios (a través de 'egin')
    public function erabiltzaileak(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'egin', 'zereginak_id', 'erabiltzailea_id')
                    ->withPivot(['hasiera_data', 'amaiera_data']) // Para acceder a las fechas
                    ->withTimestamps();
    }
}
