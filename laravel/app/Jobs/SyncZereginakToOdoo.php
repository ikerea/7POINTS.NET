<?php

namespace App\Jobs;

use App\Models\Zereginak;
use App\Services\OdooService;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
class SyncZereginakToOdoo implements ShouldQueue
{
    use Queueable;

    protected $zeregina;

    /**
     * Create a new job instance.
     */
    public function __construct(Zereginak $zeregina)
    {
        $this->zeregina = $zeregina;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        Log::info("Sincronizando la Tarea con Odoo: " . $this->zeregina->id);

        try {
            //Cargamos relaciones: Piso y usuarios asignados
            $this->zeregina->load(['pisua', 'erabiltzaileak']);

            if (!$this->zeregina->pisua->odoo_id) {
                throw new Exception("El piso no esta sincronizado con Odoo");
            }

            // 2. Gestionar los Usuarios Asignados (Many2Many)
            $asignadosOdooIds = [];
            foreach ($this->zeregina->erabiltzaileak as $usuario) {
                // Sincronizamos cada usuario para asegurarnos de tener su ID
                $asignadosOdooIds[] = $odoo->syncUserContact($usuario);
            }

            // 3. Preparar los datos
            $data = [
                'name' => $this->zeregina->izena,
                'description' => $this->zeregina->deskripzioa ?? '',
                'state' => $this->zeregina->egoera,
                'date' => Carbon::parse($this->zeregina->created_at)->format('Y-m-d'),
                'pisua_id' => (int) $this->zeregina->pisua->odoo_id,

                // SINTAXIS ESPECIAL ODOO PARA MANY2MANY: [[6, 0, [IDs]]]
                // El comando 6 significa "Reemplazar toda la lista por estos IDs"
                'asignado_ids' => [[6, 0, $asignadosOdooIds]],
            ];

            // 4. ¿Crear o Actualizar?
            if ($this->zeregina->odoo_id) {
                Log::info("🔄 Actualizando tarea existente en Odoo...");
                $odoo->write('pisua.zeregina', [
                    [$this->zeregina->odoo_id],
                    $data
                ]);
            } else {
                Log::info("🆕 Creando tarea nueva en Odoo...");
                $odooId = $odoo->create('pisua.zeregina', $data);

                $this->zeregina->updateQuietly(['odoo_id' => $odooId]);
                Log::info("✅ Tarea creada con ID: " . $odooId);
            }

            // Marcar como sincronizado
            $this->zeregina->updateQuietly(['synced' => true, 'sync_error' => null]);
        } catch (Exception $e) {
            Log::error("Error al intentar sincronizar la Tarea con Odoo: " . $e->getMessage());
            $this->zeregina->updateQuietly(['sync_error' => $e->getMessage()]);
            throw $e;
        }
    }
}
