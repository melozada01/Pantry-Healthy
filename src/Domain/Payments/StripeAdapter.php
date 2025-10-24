<?php
namespace App\Domain\Payments;

class StripeAdapter implements PaymentGateway {
    public function __construct(private ?string $apiKey = null) {}
    public function charge(string $customerId, int $cents, string $currency = 'brl'): bool {
        // stub: integrate official SDK here
        return true;
    }
}
