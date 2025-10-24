<?php
namespace App\Domain\Events;

class EventDispatcher {
    /** @var array<string, Observer[]> */
    private array $observers = [];
    public function listen(string $event, Observer $observer): void {
        $this->observers[$event][] = $observer;
    }
    public function dispatch(string $event, array $payload = []): void {
        foreach($this->observers[$event] ?? [] as $obs){
            $obs->handle($event, $payload);
        }
    }
}
