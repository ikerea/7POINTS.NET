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
            // 1. Clave primaria
            $table->id('IdGasto');

            // 2. Claves foráneas
            $table->unsignedBigInteger('IdUsuario');
            $table->unsignedBigInteger('IdPiso');

            // 3. Campos de datos
            $table->decimal('Cantidad', 10, 2);
            
            // --- AÑADIDO: Los campos que te faltaban ---
            $table->string('Nombre'); // El "izenburua"
            $table->date('Fecha');    // La "data"
            // -------------------------------------------

            // 4. Timestamps
            $table->timestamps();

            // --- Restricciones de Clave Foránea ---
            
            // Relación con 'users'
            $table->foreign('IdUsuario')
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');

            // Relación con 'pisua' (AQUÍ ESTABA EL ERROR)
            $table->foreign('IdPiso')
                  ->references('id')   // <--- Asegúrate que la PK de 'pisua' sea 'id'. Si es 'IdPiso', pon 'IdPiso' aquí.
                  ->on('pisua')        // <--- CAMBIO IMPORTANTE: de 'pisos' a 'pisua'
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