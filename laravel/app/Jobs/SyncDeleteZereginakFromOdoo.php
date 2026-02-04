<?php

namespace App\Jobs;

use App\Models\Zereginak;
use App\Services\OdooService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncDeleteZereginakFromOdoo implements ShouldQueue
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
        Log::info("Borrando la tarea de Odoo: " . $this->odooId);

        try {
            //SIEMPRE PON EL NOMBRE DEL MODELO QUE DEFINIMOS EN EL .PY
            $odoo->delete('pisua.zeregina', [$this->odooId]);
        } catch (Exception $e) {
            if (str_contains($e->getMessage(), 'MissingError')) {
                Log::warning("El gasto ya no existía en Odoo, se asume borrado.");
            } else {
                Log::error("Error al intentar eliminar la tarea de Odoo: " . $e->getMessage());
                throw $e;
            }
        }
    }
}
