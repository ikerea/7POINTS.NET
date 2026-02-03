<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Gasto extends Model
{
    use HasFactory;

    /**
     * El nombre de la tabla asociada al modelo.
     */
    protected $table = 'gastos';

    /**
     * La clave primaria de la tabla.
     */
    protected $primaryKey = 'IdGasto';

    /**
     * Indica si la clave primaria es auto-incremental.
     */
    public $incrementing = true;

    /**
     * Los atributos que son asignables masivamente.
     */
    protected $fillable = [
        'IdGasto',
        'IdUsuario',
        'IdPiso',
        'Cantidad',
        'Nombre', // Nuevo campo para el nombre o concepto del gasto
        'Fecha',
        'odoo_id',
        'synced',
        'sync_error'  // Nuevo campo para el día del gasto
    ];

    /**
     * Los atributos que deben ser convertidos a tipos nativos.
     */
    protected $casts = [
        'IdGasto'   => 'integer',
        'IdUsuario' => 'integer',
        'IdPiso'    => 'integer',
        'Cantidad'  => 'decimal:2',
        'Fecha'     => 'date', // Convierte el dato en un objeto Carbon automáticamente
    ];

    public function usuario()
    {
        return $this->belongsTo(User::class, 'IdUsuario');
    }

    public function piso()
    {
        return $this->belongsTo(Piso::class, 'IdPiso');
    }
}
