<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

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
        'user_id', //IDENTIFICAR QUE USUARIO HA CREADO ESTE PISO
    ];

    //Esto es como poner un FOREIGN KEY
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function inquilinos(){
        return $this->belongsToMany(User::class, 'piso_user', 'piso_id', 'user_id')
        ->withPivot('mota')
        ->withTimestamps();
    }


}
