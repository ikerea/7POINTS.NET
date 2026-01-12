<?php

namespace App\Jobs;

use App\Services\OdooService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use App\Models\User;
use Exception;

class SyncUserToOdoo implements ShouldQueue
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
            $internalUserGroup = 1;
            $coordGroupId = 12;
            if ($this->user->mota === 'koordinatzailea') {
                $userID = $odoo->create('res.users', [
                    'name' => $this->user->name,
                    'login' => $this->user->email,
                    'password' => $this->defaultOdooPass,
                    'active' => True,
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
        } catch (Exception $ex) {
            $this->user->update([
                'sync_error' => $ex
            ]);
            throw $ex;
        }
    }
}
