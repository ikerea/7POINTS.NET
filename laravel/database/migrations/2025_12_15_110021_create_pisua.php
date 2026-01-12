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
        Schema::create('pisua', function(Blueprint $table){
            $table->id();
            $table->string('izena');
            $table->string('kodigoa');
            $table->unsignedBigInteger('odoo_id')->nullable();
            $table->boolean('synced')->default(false);
            $table->text('sync_error')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pisua');
    }
};
