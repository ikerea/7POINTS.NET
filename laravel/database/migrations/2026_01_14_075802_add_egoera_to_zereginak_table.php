<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   public function up()
{
    Schema::table('zereginak', function (Blueprint $table) {

        $table->enum('egoera', ['egiten', 'egiteko', 'eginda'])
              ->default('egiteko')
              ->after('deskripzioa');
    });
}

public function down()
{
    Schema::table('zereginak', function (Blueprint $table) {
        $table->dropColumn('egoera');
    });
}
};
