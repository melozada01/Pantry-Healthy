<?php
namespace App\Domain\Recommendation;

use App\Models\User;

class CalorieDeficitStrategy implements Strategy {
    public function recommend(array $items, User $user): array {
        // Prefer low-calorie items first
        usort($items, fn($a,$b)=> ($a['calorias'] ?? 0) <=> ($b['calorias'] ?? 0));
        return array_slice($items, 0, 5);
    }
}
