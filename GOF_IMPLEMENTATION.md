# Padrões de Projeto (GoF) implementados

## Singleton (já aplicado)
- **Arquivo**: `src/Core/Database.php`
- **Uso**: Garante **uma única instância** de `PDO` via propriedade estática e `getConnection()`.
- **Objetivo**: Evitar duplicação de conexões e custos de criação de `PDO`.

## Strategy — Recomendações de receitas
- **Arquivos**: `src/Domain/Recommendation/*`
- **Uso**: `RecommendationContext` seleciona a estratégia conforme o objetivo do usuário (déficit, ganho muscular, manutenção).
- **Integração**: `RecipeController::suggest()` passa a chamar o contexto.

## Factory Method — Exportador de PDF
- **Arquivos**: `src/Domain/Export/*`
- **Uso**: `ExporterFactory::createPdfExporter()` produz um `PdfExporter` (hoje, `FpdfExporter`).
- **Integração**: `ReportController::userReport()` usa o exportador em vez de instanciar PDF diretamente.

## Observer — Notificação por evento
- **Arquivos**: `src/Domain/Events/*`
- **Uso**: `EventDispatcher` dispara `report.generated`; `ReportGeneratedObserver` registra notificação em `storage/notifications.log`.
- **Integração**: Após gerar o PDF em `ReportController::userReport()`.

## Adapter — Gateway de pagamento
- **Arquivos**: `src/Domain/Payments/*`, `config/payment.php`
- **Uso**: `PaymentController::subscribe()` seleciona adapter conforme `config/payment.php`.
