<?php
namespace App\Repositories;

class UserRepository extends PdoRepository
{
    protected $table = 'users';
    protected $modelClass = \App\Models\User::class;
}
