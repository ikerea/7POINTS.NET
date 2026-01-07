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
        Schema::table('users', function(Blueprint $table){
            $table->string('mota')->default('pisukide');
            //ID del usuario de sistema de odoo (SOLO PARA COORDINADORES)
            $table->unsignedBigInteger('odoo_id')->nullable();
            $table->boolean('synced')->default(false);
            $table->text('sync_error')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
