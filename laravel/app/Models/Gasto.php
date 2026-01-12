<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;

    /**
     * El nombre de la tabla asociada al modelo.
     * (Opcional si tu tabla se llama 'gastos', pero mejor asegurarlo).
     */
    protected $table = 'gastos';

    /**
     * La clave primaria de la tabla.
     * Laravel asume por defecto que es 'id', por eso debemos definirla.
     */
    protected $primaryKey = 'IdGasto';

    /**
     * Indica si la clave primaria es auto-incremental.
     * Si 'IdGasto' no es auto-incremental, cambia esto a false.
     */
    public $incrementing = true;

    /**
     * Los atributos que son asignables masivamente.
     */
    protected $fillable = [
        'IdGasto',   // Si es auto-incremental, a veces se omite aquí, pero no hace daño
        'IdUsuario',
        'IdPiso',
        'Cantidad',
    ];

    /**
     * Los atributos que deben ser convertidos a tipos nativos.
     * Importante para manejar el decimal correctamente.
     */
    protected $casts = [
        'IdGasto' => 'integer',
        'IdUsuario' => 'integer',
        'IdPiso' => 'integer',
        'Cantidad' => 'decimal:2', // Asegura que PHP lo trate con 2 decimales
    ];

    public function usuario()
    {
        // Asumiendo que tienes un modelo User o Usuario
        return $this->belongsTo(User::class, 'IdUsuario'); 
    }

    public function piso()
    {
        // Asumiendo que tienes un modelo Piso
        return $this->belongsTo(Piso::class, 'IdPiso');
    }
}