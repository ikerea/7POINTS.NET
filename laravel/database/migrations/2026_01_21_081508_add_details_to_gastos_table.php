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
        Schema::table('gastos', function (Blueprint $table) {
            $table->string('Nombre')->after('IdPiso')->nullable(); // Texto corto
            $table->date('Fecha')->after('Nombre')->nullable();    // Solo fecha (sin hora)
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::table('gastos', function (Blueprint $table) {
            $table->dropColumn(['Nombre', 'Fecha']);
        });
    }
};
