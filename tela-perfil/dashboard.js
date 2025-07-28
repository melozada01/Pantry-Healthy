// Configura o gráfico com Chart.js
const ctx = document.getElementById('pesoChart').getContext('2d');
const pesoChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Inicial', 'Atual', 'Meta'],
    datasets: [{
      label: 'Peso (KG)',
      data: [60, 65, 70],
      backgroundColor: ['#007bff', '#28a745', '#ffc107']
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
  
});

// Exportar o gráfico + informações em PDF
document.getElementById('exportPDF').addEventListener('click', () => {
  html2canvas(document.body).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jspdf.jsPDF();
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('dashboard.pdf');
  });
});

 document.getElementById('btnPlanoPago').addEventListener('click', () => {
  window.location.href = 'pagamento.html'; // ajuste o caminho se precisar
});
