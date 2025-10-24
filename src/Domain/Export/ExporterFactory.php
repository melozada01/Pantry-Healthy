<?php
namespace App\Domain\Export;

class ExporterFactory {
    // Factory Method
    public static function createPdfExporter(?string $driver = null): PdfExporter {
        // In future, choose different drivers by $driver
        return new FpdfExporter();
    }
}
