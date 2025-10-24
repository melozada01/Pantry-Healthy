<?php
namespace App\Domain\Export;

interface PdfExporter {
    public function addLine(string $text): void;
    public function outputInline(string $filename): void;
}
