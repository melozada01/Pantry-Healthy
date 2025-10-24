<?php
namespace App\Domain\Events;

interface Observer {
    public function handle(string $event, array $payload = []): void;
}
