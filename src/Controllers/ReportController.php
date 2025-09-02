<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Repositories\UserRepositoryExtended;

class ReportController extends Controller {
    private $repo;
    public function __construct(){ $this->repo = new UserRepositoryExtended(); }

    public function userReport() {
        $id = $_GET['id'] ?? null;
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        // generate PDF using vendor/fpdf.php SimplePDF
        require_once __DIR__ . '/../../vendor/fpdf.php';
        $pdf = new \SimplePDF();
        $pdf->AddPage();
        $pdf->SetFont('Arial','',12);
        $pdf->Cell(0,10,'Relatorio do usuario: ' . $user->nome);
        $pdf->Cell(0,10,'Email: ' . $user->email);
        $pdf->Cell(0,10,'IMC: ' . $user->imc());
        $pdf->Output('relatorio_usuario.pdf','I');
    }
}
