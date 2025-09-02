<?php
namespace App\Models;

class Goal
{
    public $id;
    public $user_id;
    public $type; // e.g. 'weight_loss', 'maintenance', 'muscle_gain'
    public $target_value;
    public $created_at;

    public function __construct($data = [])
    {
        foreach ($data as $k => $v) $this->$k = $v;
    }
}
