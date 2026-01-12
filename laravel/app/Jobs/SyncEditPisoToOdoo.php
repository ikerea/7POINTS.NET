<?php

namespace App\Jobs;

use App\Models\Piso;
use App\Services\OdooService;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class SyncEditPisoToOdoo implements ShouldQueue
{
    use Queueable;

    protected Piso $piso;

    public $tries = 5;
    public $backoff = [30, 60, 120, 300, 500];
    /**
     * Create a new job instance.
     */
    public function __construct(Piso $piso)
    {
        $this->piso = $piso;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        try {
            $odooId = $odoo->write('pisua', [[$this->piso->odoo_id], [
                'name' => $this->piso->izena,
                'code' => $this->piso->kodigoa,
            ]]);

            $this->piso->update([
                'synced' => true,
                'sync_error' => null
            ]);
        } catch (Exception $ex) {
            $this->piso->update([
                'sync_error' => $ex->getMessage()
            ]);

            throw $ex;
        }
    }
}
