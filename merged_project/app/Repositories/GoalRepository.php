<?php
namespace App\Repositories;

class GoalRepository extends PdoRepository
{
    protected $table = 'goals';
    protected $modelClass = \App\Models\Goal::class;
}
