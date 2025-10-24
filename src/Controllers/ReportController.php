<?php
namespace App\Controllers;

use App\Core\Controller;
use App\Domain\Export\ExporterFactory;
use App\Domain\Events\{EventDispatcher, ReportGeneratedObserver};
use App\Repositories\UserRepositoryExtended;

class ReportController extends Controller {
    private $repo;
    public function __construct(){ $this->repo = new UserRepositoryExtended(); }

    public function userReport() {
        $id = $_GET['id'] ?? null;
        $user = $this->repo->find($id);
        if (!$user) die('Usuário não encontrado');
        // generate PDF using vendor/fpdf.php SimplePDF
        $pdf = ExporterFactory::createPdfExporter();
        $pdf->addLine('Relatorio do usuario: ' . $user->nome);
        $pdf->addLine('Email: ' . $user->email);
        $pdf->addLine('IMC: ' . $user->imc());
        $pdf->outputInline('relatorio_usuario.pdf');
        // Observer: notify that report was generated
        $dispatcher = new EventDispatcher();
        $dispatcher->listen('report.generated', new ReportGeneratedObserver());
        $dispatcher->dispatch('report.generated', ['user_id' => $user->id ?? null]);
    }
}
