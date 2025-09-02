<?php
namespace App\Repositories;

class PantryRepository extends PdoRepository
{
    protected $table = 'pantry_items';
    protected $modelClass = \App\Models\PantryItem::class;
}
