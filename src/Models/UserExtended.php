<?php
namespace App\Models;

class UserExtended {
    public $id;
    public $nome;
    public $email;
    public $senha;
    public $idade;
    public $sexo;
    public $peso;
    public $altura;
    public $objetivo;
    public $nivel_atividade;
    public $restricao_alimentar;
    public $pontos; // gamification

    public function __construct($data = []) {
        $this->id = $data['id'] ?? null;
        $this->nome = $data['nome'] ?? null;
        $this->email = $data['email'] ?? null;
        $this->senha = $data['senha'] ?? null;
        $this->idade = $data['idade'] ?? null;
        $this->sexo = $data['sexo'] ?? null;
        $this->peso = $data['peso'] ?? null;
        $this->altura = $data['altura'] ?? null;
        $this->objetivo = $data['objetivo'] ?? null;
        $this->nivel_atividade = $data['nivel_atividade'] ?? null;
        $this->restricao_alimentar = $data['restricao_alimentar'] ?? null;
        $this->pontos = $data['pontos'] ?? 0;
    }

    public function imc() {
        if (!$this->peso || !$this->altura) return null;
        $h = floatval($this->altura);
        if ($h <= 0) return null;
        return round(floatval($this->peso) / ($h * $h), 2);
    }

    public function suggested_calories() {
        // Very simple BMR approximation (Mifflin-St Jeor simplified) and adjustment by activity
        $peso = floatval($this->peso ?: 0);
        $altura_cm = floatval(($this->altura ?: 0) * 100);
        $idade = intval($this->idade ?: 30);
        $sexo = strtolower($this->sexo ?? 'm');
        if ($sexo === 'f' || $sexo === 'feminino') {
            $bmr = 10*$peso + 6.25*$altura_cm - 5*$idade - 161;
        } else {
            $bmr = 10*$peso + 6.25*$altura_cm - 5*$idade + 5;
        }
        // activity factor mapping
        $levels = ['sedentario'=>1.2,'leve'=>1.375,'moderado'=>1.55,'alto'=>1.725,'muito_alto'=>1.9];
        $factor = $levels[$this->nivel_atividade] ?? 1.2;
        $cal = round($bmr * $factor);
        // Adjust by objetivo
        if (strpos(strtolower($this->objetivo),'perda') !== false) $cal -= 500;
        if (strpos(strtolower($this->objetivo),'ganho') !== false) $cal += 500;
        return max(1200, $cal);
    }
}
