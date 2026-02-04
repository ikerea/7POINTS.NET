<?php

namespace App\Jobs;

use App\Services\OdooService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
class SyncDeleteGastoFromOdoo implements ShouldQueue
{
    use Queueable;

    protected $odooId;

    /**
     * Create a new job instance.
     */
    public function __construct(int $odooId)
    {
        $this->odooId = $odooId;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        Log::info("🗑️ Eliminando Gasto de Odoo con ID: " . $this->odooId);

        try{
            $odoo->delete('hr.expense', [$this->odooId]);
            Log::info("✅ Gasto eliminado correctamente de Odoo.");
        }catch(Exception $e){
            //Si el error dice que no existe, en realidad es un éxito (ya estaba borrado)
            if (str_contains($e->getMessage(), 'MissingError')) {
                Log::warning("El gasto ya no existía en Odoo, se asume borrado.");
            } else {
                Log::error("❌ Error eliminando gasto de Odoo: " . $e->getMessage());
                throw $e;
            }
        }
    }
}
