<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Gasto; // Importante tener esto

class Piso extends Model
{
    use HasFactory;

    protected $table = 'pisua';

    protected $fillable = [
        'izena',
        'kodigoa',
        'odoo_id',
        'synced',
        'sync_error',
        'user_id',
    ];

    // Relación con el Creador del piso
    public function user(){
        return $this->belongsTo(User::class);
    }

    // Relación con los Inquilinos
    public function inquilinos(){
        return $this->belongsToMany(User::class, 'piso_user', 'piso_id', 'user_id')
        ->withPivot('mota')
        ->withTimestamps();
    }

    public function gastos(){
        // Busca gastos donde la columna 'IdPiso' coincida con el id de este piso
        return $this->hasMany(Gasto::class, 'IdPiso', 'id');
    }

}
