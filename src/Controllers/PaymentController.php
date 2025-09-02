<?php
namespace App\Controllers;

use App\Core\Controller;

class PaymentController extends Controller {
    public function plans() {
        $this->view('payments/plans.php',[]);
    }

    public function subscribe() {
        // Stub: in real app add payment gateway integration
        $this->view('payments/subscribe_success.php',[]);
    }
}
