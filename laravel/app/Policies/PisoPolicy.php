<?php

namespace App\Policies;

use App\Models\Piso;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PisoPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Piso $piso): bool
    {
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Piso $piso): bool
    {
        // Buscamos si el usuario actual existe en la relación de inquilinos de este piso
        // Y además verificamos que en la tabla pivote el campo 'mota' sea 'koordinatzailea'
        return $piso->inquilinos()
            ->where('user_id', $user->id)
            ->wherePivot('mota', 'koordinatzailea') // Asegúrate de que este string coincide exactamente con lo que guardas en BD
            ->exists();
    }

    /**
     * Determina si el usuario puede eliminar el piso.
     */
    public function delete(User $user, Piso $piso): bool
    {
        // Reutilizamos la misma lógica de arriba
        return $this->update($user, $piso);
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Piso $piso): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Piso $piso): bool
    {
        return false;
    }
}
