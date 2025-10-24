<?php
namespace App\Domain\Recommendation;

use App\Models\User;

class MuscleGainStrategy implements Strategy {
    public function recommend(array $items, User $user): array {
        // Prefer protein-rich items first
        usort($items, fn($a,$b)=> ($b['proteinas'] ?? 0) <=> ($a['proteinas'] ?? 0));
        return array_slice($items, 0, 5);
    }
}
