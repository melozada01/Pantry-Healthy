<?php
namespace App\Models;

class FoodItem
{
    public $id;
    public $name;
    public $calories;
    public $protein;
    public $carbs;
    public $fat;
    public $created_at;

    public function __construct($data = [])
    {
        foreach ($data as $k => $v) $this->$k = $v;
    }
}
