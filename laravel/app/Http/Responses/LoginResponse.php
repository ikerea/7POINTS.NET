<?php

namespace App\Http\Responses;

use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Illuminate\Support\Facades\Auth;

class LoginResponse implements LoginResponseContract
{
    public function toResponse($request){
        $user = Auth::user();

        //Si el usuario ya esta en algun piso... SOLUCION TEMPORAL
        if($user->pisuak()->exists()){
            return redirect()->intended(config('fortify.home'));
        }

        //Si NO tiene piso, lo mandamos a elegir
        return redirect()->route('pisua.selection');
    }
}


