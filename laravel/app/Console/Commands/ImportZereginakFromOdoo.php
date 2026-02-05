<?php

namespace App\Console\Commands;

use App\Models\Piso;
use App\Models\Zereginak;
use App\Models\User;
use Exception;
use Illuminate\Console\Command;
use App\Services\OdooService;
use Illuminate\Support\Facades\Log;

class ImportZereginakFromOdoo extends Command
{
    protected $signature = 'odoo:import-zereginak';
    protected $description = 'Importar tareas desde Odoo (Versión Definitiva con Ira)';

    public function handle(OdooService $odoo)
    {
        $this->info("🕵️‍♂️ INICIANDO INVESTIGACIÓN FINAL...");

        try {
            // 1. Pedimos TODO a Odoo (Añadido 'asignado_ids' que faltaba en tu código)
            $odooTareas = $odoo->search('pisua.zeregina', [
                'id',
                'name',
                'pisua_id',
                'date',
                'asignado_ids',
                'state',
                'description'
            ]);


            $total = count($odooTareas);
            $this->warn("Odoo ha respondido con $total tareas en total.");

            foreach ($odooTareas as $t) {
                $pisoInfo = $t['pisua_id'] ? "Piso ID: " . $t['pisua_id'][0] : "SIN PISO";
                $this->line("Tarea ID {$t['id']}: '{$t['name']}' | $pisoInfo");
            }
            $this->info("------------------------------------------------");

            $count = 0;
            foreach ($odooTareas as $remoteTask) {

                $odooPisoId = $remoteTask['pisua_id'] ? $remoteTask['pisua_id'][0] : null;
                if (!$odooPisoId)
                    continue;

                $localPiso = Piso::where('odoo_id', $odooPisoId)->first();
                if (!$localPiso) {
                    $this->error("ALERTA: Ignorando '{$remoteTask['name']}' -> No tengo el piso {$odooPisoId}.");
                    continue;
                }
                $localTask = Zereginak::updateOrCreate(
                    ['odoo_id' => $remoteTask['id']],
                    [
                        'izena' => $remoteTask['name'],
                        'deskripzioa' => $remoteTask['description'] ?? '',
                        'egoera' => $remoteTask['state'],
                        'pisua_id' => $localPiso->id,
                        'synced' => true,
                        'hasiera_data' => $remoteTask['date']
                    ]
                );

                if (!empty($remoteTask['asignado_ids'])) {
                    $usuariosIds = User::whereIn('odoo_id', $remoteTask['asignado_ids'])->pluck('id');

                    $pivotData = [];
                    foreach ($usuariosIds as $uid) {
                        $pivotData[$uid] = ['hasiera_data' => $remoteTask['date']];
                    }

                    $localTask->erabiltzaileak()->sync($pivotData);
                }

                $count++;
            }

            $this->info("FINAL: $count tareas guardadas (Con fecha y usuario).");

        } catch (Exception $e) {
            $this->error("ERROR GORDO: " . $e->getMessage());
        }
    }
}
