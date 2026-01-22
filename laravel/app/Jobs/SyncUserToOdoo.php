<?php

namespace App\Jobs;

use App\Services\OdooService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\User;
use Exception;

class cdSyncUserToOdoo implements ShouldQueue
{
    use Queueable;
    protected User $user;
    protected string $defaultOdooPass = "123456";


    public function __construct(User $user)
    {
        $this->user = $user;
    }

    /**
     * Execute the job.
     */
    public function handle(OdooService $odoo): void
    {
        try {
            $esCoordinador = $this->user->pisuak()->wherePivot('mota', 'koordinatzailea')->exists();

            if ($esCoordinador) {
                $internalUserGroup = 1;
                $coordGroupId = 12;

                // Solo creamos si no tiene ya ID de Odoo (para evitar duplicados)
                if(!$this->user->odoo_id){
                    $userID = $odoo->create('res.users', [
                        'name' => $this->user->name,
                        'login' => $this->user->email,
                        'password' => $this->defaultOdooPass,
                        'active' => true,
                        'groups_id' => [
                            [4, $internalUserGroup],
                            [4, $coordGroupId]
                        ]
                    ]);

                    $this->user->update([
                        'odoo_id' => $userID,
                        'synced' => true,
                        'sync_error' => null,
                    ]);
                }
            }
        } catch (Exception $ex) {
            $this->user->update([
                'sync_error' => $ex
            ]);
            throw $ex;
        }
    }
}
