<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;
use App\Jobs\SyncUserToOdoo;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $coord = User::create([
            'name' => 'Igor koordinatzailea',
            'email' => 'igor@pisos.com',
            'password' => Hash::make('password'),
            'mota' => 'koordinatzailea',
        ]);

        SyncUserToOdoo::dispatch($coord);

        echo "Se ha enviado el nuevo usuario coordinador con exito";
    }
}
