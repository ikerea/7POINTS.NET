<?php

namespace App\Jobs;

use App\Models\Piso;
use App\Services\OdooService;
use Illuminate\Contracts\Queue\ShouldQueue;
// use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Exception;
// use Illuminate\Queue\InteractsWithQueue;
// use Illuminate\Queue\SerializesModels;

class SyncPisoToOdoo implements ShouldQueue
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
            $sortzailea = $this->piso->load('user')->user;
            $odooId = $odoo->create('pisua', [
                'name' => $this->piso->izena,
                'code' => $this->piso->kodigoa,
                'coordinator_id' => $sortzailea->odoo_id,
            ]);

            $this->piso->update([
                'odoo_id' => $odooId,
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
