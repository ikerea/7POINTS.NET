<?php

namespace App\Jobs;

use App\Models\Piso;
use App\Models\User;
use App\Services\OdooService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncInquilinoToOdoo implements ShouldQueue
{
    use Queueable;

    protected User $user;
    protected Piso $piso;

    /**
     * Create a new job instance.
     */
    public function __construct(User $user, Piso $piso)
    {
        $this->user = $user;
        $this->piso = $piso;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        Log::info("Usuario: " . $this->user->email);
        Log::info("Piso Local ID: " . $this->piso->id);
        Log::info("Piso Odoo ID: " . $this->piso->odoo_id);

        if (!$this->piso->odoo_id) {
            Log::warning("EL JOB SE HA DETENIDO: El piso no tiene 'odoo_id' guardado en Laravel.");
            return;
        }

        // 2. Buscamos (o creamos) al usuario como Contacto en Odoo
        // NOTA: Asegúrate de que en OdooService la función se llame 'syncUserContract' o 'syncUserContact'
        $partnerOdooId = $odoo->syncUserContact($this->user);

        // 3. Añadimos ese contacto a la lista de inquilinos del piso
        $odoo->addInquilinoToPiso((int) $this->piso->odoo_id, (int) $partnerOdooId);
    }
}
