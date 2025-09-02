<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\PantryRepositoryExtended;
use App\Repositories\FoodRepositoryExtended;
use App\Repositories\UserRepositoryExtended;

class RecipeController extends Controller {
    private $pantry;
    private $food;
    private $userRepo;

    public function __construct() {
        $this->pantry = new PantryRepositoryExtended();
        $this->food = new FoodRepositoryExtended();
        $this->userRepo = new UserRepositoryExtended();
    }

    public function suggest() {
        $user_id = $_GET['user_id'] ?? null;
        $user = $this->userRepo->find($user_id);
        if (!$user) die('Usuário não encontrado');
        $items = $this->pantry->itemsForUser($user_id);
        // Very simple suggestion: sum calories and present a "recipe" of available items filtered by restrictions and goal
        $filtered = [];
        foreach($items as $it){
            if($user->restricao_alimentar && stripos($it['nome'], $user->restricao_alimentar)!==false) continue;
            $filtered[]=$it;
        }
        $this->view('recipes/suggest.php',['user'=>$user,'items'=>$filtered]);
    }
}
