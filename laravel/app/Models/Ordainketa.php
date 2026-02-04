<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ordainketa extends Model
{
    use HasFactory;

    protected $fillable = ['piso_id', 'deudor_id', 'acreedor_id', 'cantidad'];
    
}
