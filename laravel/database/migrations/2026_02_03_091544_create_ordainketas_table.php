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
    Schema::create('ordainketas', function (Blueprint $table) {
        $table->id();
        $table->foreignId('piso_id')->constrained('pisua')->onDelete('cascade');
        $table->foreignId('deudor_id')->constrained('users');   // El que paga (ordaintzen duena)
        $table->foreignId('acreedor_id')->constrained('users'); // El que recibe (jasotzen duena)
        $table->decimal('cantidad', 10, 2);
        $table->timestamps();
    });
}

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ordainketas');
    }
};
