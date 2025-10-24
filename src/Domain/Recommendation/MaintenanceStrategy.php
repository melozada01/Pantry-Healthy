<?php
namespace App\Domain\Recommendation;

use App\Models\User;

class MaintenanceStrategy implements Strategy {
    public function recommend(array $items, User $user): array {
        // Balanced: sort by closest to 100 kcal per item
        usort($items, function($a,$b){
            $ta = abs(($a['calorias'] ?? 0) - 100);
            $tb = abs(($b['calorias'] ?? 0) - 100);
            return $ta <=> $tb;
        });
        return array_slice($items, 0, 5);
    }
}
