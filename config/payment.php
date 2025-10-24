<?php
return [
    'driver' => 'fake', // 'fake' or 'stripe'
    'stripe_key' => getenv('STRIPE_KEY') ?: null,
];
