<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('zereginak', function (Blueprint $table) {
            $table->id();

            $table->string('izena');
            $table->text('deskripzioa')->nullable();


            // Ajusta 'pisua' si tu tabla real tiene otro nombre.
            $table->foreignId('pisua_id')
                  ->constrained('pisua') // Apunta a la tabla 'pisua'
                  ->onDelete('cascade'); // Si borras el piso, se borran las tareas

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('zereginak');
    }
};
