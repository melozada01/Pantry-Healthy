<?php
namespace App\Domain\Export;

class FpdfExporter implements PdfExporter {
    private \SimplePDF $pdf;
    public function __construct(){
        require_once __DIR__ . '/../../../vendor/fpdf.php';
        $this->pdf = new \SimplePDF();
        $this->pdf->AddPage();
        $this->pdf->SetFont('Arial','',12);
    }
    public function addLine(string $text): void {
        $this->pdf->Cell(0,10,$text);
    }
    public function outputInline(string $filename): void {
        $this->pdf->Output($filename,'I');
    }
}
