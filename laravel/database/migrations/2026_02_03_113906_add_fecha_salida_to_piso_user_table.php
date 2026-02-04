<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
    Schema::table('piso_user', function (Blueprint $table) {
        // Añadimos la columna fecha_salida (puede ser nula si vive allí)
        $table->timestamp('fecha_salida')->nullable()->after('mota');
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('piso_user', function (Blueprint $table) {
            //
        });
    }
};
