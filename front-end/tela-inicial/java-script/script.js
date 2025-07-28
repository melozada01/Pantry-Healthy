// Gráfico no Dashboard
const chartCanvas = document.getElementById('weightChart');
if (chartCanvas) {
    const ctx = chartCanvas.getContext('2d');
    new Chart(ctx, {
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
}

// Função para envio no chat
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');
const messages = document.querySelector('.messages');

if (chatButton && chatInput && messages) {
    chatButton.addEventListener('click', () => {
        const text = chatInput.value.trim();
        if (text) {
            const msg = document.createElement('p');
            msg.innerHTML = `<strong>Você:</strong> ${text}`;
            messages.appendChild(msg);
            chatInput.value = '';
            messages.scrollTop = messages.scrollHeight;
        }
    });
}
