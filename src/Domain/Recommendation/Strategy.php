<?php
namespace App\Domain\Recommendation;

use App\Models\User;

interface Strategy {
    /**
     * @param array $items Pantry items available
     * @param User $user
     * @return array Recommended items/recipe
     */
    public function recommend(array $items, User $user): array;
}
