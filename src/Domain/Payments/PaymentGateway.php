<?php
namespace App\Domain\Payments;

interface PaymentGateway {
    public function charge(string $customerId, int $cents, string $currency = 'brl'): bool;
}
