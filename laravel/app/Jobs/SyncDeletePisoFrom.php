<?php

namespace App\Jobs;

use App\Services\OdooService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SyncDeletePisoFrom implements ShouldQueue
{
    use Queueable;

    protected int $odooId; //Solo guardaremos el ID, no todo el objeto Piso

    public $tries = 0;
    public $backOff = [30, 60, 120, 300, 500];

    public function __construct(int $odooId)
    {
        $this->odooId = $odooId;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        if (!$this->odooId) {
            return;
        }

        try {
            $odoo->delete('pisua', [$this->odooId]);
        } catch (Exception $ex) {
            //Como el piso ya no existe en la BD no podemos guardar el mensaje de error en ningun lado
            \Log::error("Error borrando el piso de Odoo: " . $ex->getMessage());

            throw $ex; //Reintentar
        }
    }
}
