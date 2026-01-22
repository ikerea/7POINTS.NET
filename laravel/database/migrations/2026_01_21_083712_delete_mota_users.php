<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('piso_user', function (Blueprint $table) {
            $table->string('mota')->default('normala')->after('user_id');
        });

        // 2. Eliminamos la columna 'mota' de la tabla de usuarios
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('mota');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('mota')->nullable();
        });

        Schema::table('piso_user', function (Blueprint $table) {
            $table->dropColumn('mota');
        });
    }
};
