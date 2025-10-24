// Gráfico de peso usando Chart.js
const ctx = document.getElementById('weightChart').getContext('2d');
const weightChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
        datasets: [{
            label: 'Peso (kg)',
            data: [80, 78, 76, 74, 72, 70, 68],
            backgroundColor: '#a6e9c4'
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});
document.getElementById('exportPDF').addEventListener('click', () => {
    html2canvas(document.body).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const { jsPDF } = window.jspdf; // pega a classe jsPDF
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('relatório.pdf');
    });
  });

 document.getElementById('btnPlanoPago').addEventListener('click', () => {
  window.location.href = 'pagamento.html'; // ajuste o caminho se precisar
});
