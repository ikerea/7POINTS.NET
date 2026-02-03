<?php

namespace App\Jobs;

use App\Models\Gasto;
use App\Services\OdooService;
use Carbon\Carbon;
use Exception;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;

class SyncGastoToOdoo implements ShouldQueue
{
    use Queueable;

    protected $gasto;

    /**
     * Create a new job instance.
     */
    public function __construct(Gasto $gasto)
    {
        $this->gasto = $gasto;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        Log::info("INICIANDO SINCRONIZACION DE GASTO ID: " . $this->gasto->IdGasto);

        try {
            //CARGAR RELACIONES NECESARIAS
            $this->gasto->load(['usuario', 'piso']);

            if (!$this->gasto->piso->odoo_id) {
                throw new Exception("El piso no esta sincronizado con Odoo (Falta el odoo_id)");
            }

            //Obtenemos el ID de Odoo del contacto (Inquilino/Pagador)
            //Esta funcion busca por email o crea el contacto
            $partnerOdooId = $odoo->syncUserContact($this->gasto->usuario);

            //DEFINIMOS EL ID DE CATEGORIA PREDETERMINADO PARA EL MODULO GASTOS
            //LA CATEGORIA ES OTROS ([EXP_GEN])
            $categoriaOdooId = 9;

            //Preparacion de datos
            $data = [
                'name' => $this->gasto->Nombre,
                //Transformamos a formato fecha para Odoo
                'date' => Carbon::parse($this->gasto->Fecha)->format('Y-m-d'),
                'total_amount' => (float) $this->gasto->Cantidad,
                //CAMPOS NATIVOS DE ODOO OBLIGATORIOS (Aunque para el usuario esta oculto)
                'product_id' => $categoriaOdooId,
                'payment_mode' => 'own_account',
                //CAMPOS PERSONALIZADOS
                'pisua_id' => (int) $this->gasto->piso->odoo_id,
                'partner_id' => (int) $partnerOdooId,
            ];

            Log::info("Enviando datos a Odoo...", $data);

            $odooGastoId = $odoo->create('hr.expense', $data);

            $this->gasto->updateQuietly([
                'odoo_id' => $odooGastoId,
                'synced' => true,
                'sync_error' => null
            ]);

            Log::info("Gasto sincronizado con exito. Odoo ID: " . $odooGastoId);
        } catch (Exception $e) {
            Log::error("Error sincronizando el gasto: " . $e->getMessage());

            $this->gasto->updateQuietly([
                'sync_error' => $e->getMessage()
            ]);

            throw $e; //Re-lanzar para que Laravel sepa que falló
        }
    }
}
