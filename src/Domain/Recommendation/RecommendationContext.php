<?php
namespace App\Domain\Recommendation;

use App\Models\User;

class RecommendationContext {
    private Strategy $strategy;
    public function __construct(Strategy $strategy) { $this->strategy = $strategy; }
    public function setStrategy(Strategy $strategy){ $this->strategy = $strategy; }
    public function recommend(array $items, User $user): array { return $this->strategy->recommend($items,$user); }
}
