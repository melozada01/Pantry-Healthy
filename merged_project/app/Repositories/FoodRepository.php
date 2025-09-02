<?php
namespace App\Repositories;

class FoodRepository extends PdoRepository
{
    protected $table = 'food_items';
    protected $modelClass = \App\Models\FoodItem::class;
}
