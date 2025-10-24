<?php
namespace App\Models;

class PantryItem
{
    public $id;
    public $user_id;
    public $food_id;
    public $quantity;
    public $unit; // e.g. 'g', 'unit', 'ml'
    public $created_at;

    public function __construct($data = [])
    {
        foreach ($data as $k => $v) $this->$k = $v;
    }
}
