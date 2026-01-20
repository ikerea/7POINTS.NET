<?php
namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;
class OdooService
{
    protected $url;
    protected $db;
    protected $username;
    protected $password;

    public function __construct()
    {
        $this->url = rtrim(env("ODOO_URL"), "/") . '/jsonrpc';
        $this->db = env("ODOO_DB");
        $this->username = env("ODOO_USERNAME");
        $this->password = env("ODOO_PASSWORD");
    }


    public function create(string $model, array $data)
    {
        //AUTENTIFIKAZIOA
        $uid = $this->rpc('common', 'login', [
            $this->db,
            $this->username,
            $this->password
        ]);

        if (!$uid) {
            throw new \Exception('Odoo: Creedenciales incorrectas o BD no encontrada');
        }

        return $this->rpc('object', 'execute_kw', [
            $this->db,
            $uid,
            $this->password,
            $model,
            'create',
            [$data]
        ]);
    }

    public function search(string $model, array $zutabe)
    {
        //AUTENTIFIKAZIOA
        $uid = $this->rpc('common', 'login', [
            $this->db,
            $this->username,
            $this->password
        ]);

        if (!$uid) {
            throw new \Exception('Odoo: Creedenciales incorrectas o BD no encontrada');
        }

        return $this->rpc('object', 'execute_kw', [
            $this->db,
            $uid,
            $this->password,
            $model,
            'search_read',
            [[], $zutabe]
        ]);
    }

    public function write(string $model, array $data)
    {
        //AUTENTIFIKAZIOA
        $uid = $this->rpc('common', 'login', [
            $this->db,
            $this->username,
            $this->password
        ]);

        if (!$uid) {
            throw new \Exception('Odoo: Creedenciales incorrectas o BD no encontrada');
        }

        return $this->rpc('object', 'execute_kw', [
            $this->db,
            $uid,
            $this->password,
            $model,
            'write',
            $data
        ]);
    }

    public function delete(string $model, array $ids){
        $uid = $this->rpc('common', 'login', [
            $this->db,
            $this->username,
            $this->password
        ]);

        if(!$uid){
            throw new \Exception('Odoo: Creedenciales incorrectas o BD no encontrada');
        }

        return $this->rpc('object', 'execute_kw', [
            $this->db,
            $uid,
            $this->password,
            $model,
            'unlink',
            [$ids]
        ]);
    }

    protected function rpc($service, $method, $args)
    {
        //LAS LLAMADAS RPC SIEMPRE SERAN DE TIPO POST
        $reponse = Http::post($this->url, [
            'jsonrpc' => '2.0',
            'method' => 'call',
            'params' => [
                'service' => $service,
                'method' => $method,
                'args' => $args
            ],
            'id' => rand(1, 999999),
        ])->json();

        if (isset($reponse['error'])) {
            throw new \Exception('Odoo Error: ' . json_encode($reponse['error']));
        }

        return $reponse['result'];
    }
}

