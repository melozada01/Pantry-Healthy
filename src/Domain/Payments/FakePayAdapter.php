<?php
namespace App\Domain\Payments;

class FakePayAdapter implements PaymentGateway {
    public function charge(string $customerId, int $cents, string $currency = 'brl'): bool {
        // simulate success
        return true;
    }
}
