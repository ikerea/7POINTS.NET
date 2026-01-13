<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('egin', function (Blueprint $table) {
            $table->id();


            $table->foreignId('erabiltzailea_id')
                  ->constrained('users')
                  ->onDelete('cascade');


            $table->foreignId('zereginak_id')
                  ->constrained('zereginak')
                  ->onDelete('cascade');


            $table->dateTime('hasiera_data');
            $table->dateTime('amaiera_data')->nullable();

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('egin');
    }
};
