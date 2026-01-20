<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('gastos', function (Blueprint $table) {
            // 1. Clave primaria personalizada
            // Como tu modelo define 'IdGasto', pasamos ese nombre al método id()
            $table->id('IdGasto');

            // 2. Claves foráneas (Foreign Keys)
            // Definimos las columnas con el mismo tipo que las tablas padre (usualmente BigInteger)
            $table->unsignedBigInteger('IdUsuario');
            $table->unsignedBigInteger('IdPiso');

            // 3. Campo Cantidad
            // Usamos decimal con precisión (10 dígitos en total, 2 decimales)
            // Ejemplo: 12345678.99
            $table->decimal('Cantidad', 10, 2);

            // 4. Timestamps (created_at, updated_at)
            $table->timestamps();

            // --- Restricciones de Clave Foránea ---
            
            // Relación con la tabla 'users' (o 'usuarios' si cambiaste el nombre)
            $table->foreign('IdUsuario')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade'); // Opcional: borra el gasto si se borra el usuario

            // Relación con la tabla 'pisos'
            $table->foreign('IdPiso')
                  ->references('id') // Asumiendo que la PK de pisos es 'id'
                  ->on('pisos')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('gastos');
    }
};