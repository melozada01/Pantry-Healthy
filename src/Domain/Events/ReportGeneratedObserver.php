<?php
namespace App\Domain\Events;

class ReportGeneratedObserver implements Observer {
    public function handle(string $event, array $payload = []): void {
        // Simple notification: write to storage/notifications.log
        $msg = '['.date('c').'] ' . $event . ' for user_id=' . ($payload['user_id'] ?? 'n/a') . PHP_EOL;
        $file = __DIR__ . '/../../../storage/notifications.log';
        @file_put_contents($file, $msg, FILE_APPEND);
    }
}
