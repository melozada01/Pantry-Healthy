<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Domain\Payments\{PaymentGateway, FakePayAdapter, StripeAdapter};

class PaymentController extends Controller {
    public function plans() {
        $this->view('payments/plans.php',[]);
    }

    public function subscribe() {
        $cfg = include __DIR__ . '/../../config/payment.php';
        $gateway = ($cfg['driver'] ?? 'fake') === 'stripe' ? new StripeAdapter($cfg['stripe_key'] ?? null) : new FakePayAdapter();
        $ok = $gateway->charge('user-'.rand(1000,9999), 2990, 'brl');
        $this->view('payments/subscribe_success.php',[ 'success' => $ok ]);
    }
}
