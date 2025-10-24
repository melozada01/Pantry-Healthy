let mealReminders = [];
let waterInterval = null;
let notificationsEnabled = false;

// Verifica suporte a notificações
if (!("Notification" in window)) {
    alert("Seu navegador não suporta notificações!");
}

// Event Listeners
document.getElementById('addMealBtn').addEventListener('click', addMealReminder);
document.getElementById('enableBtn').addEventListener('click', enableNotifications);
document.getElementById('waterInterval').addEventListener('change', updateWaterReminder);

function addMealReminder() {
    const timeInput = document.getElementById('mealTime');
    const time = timeInput.value;
    
    if (!time) {
        alert('Selecione um horário!');
        return;
    }
    
    if (mealReminders.includes(time)) {
        alert('Este horário já foi adicionado!');
        return;
    }
    
    mealReminders.push(time);
    mealReminders.sort();
    updateMealList();
    timeInput.value = ''; // Limpa o campo após adicionar
}

function removeMealReminder(time) {
    mealReminders = mealReminders.filter(t => t !== time);
    updateMealList();
}

function updateMealList() {
    const list = document.getElementById('mealList');
    
    if (mealReminders.length === 0) {
        list.innerHTML = '<p style="color: #999; text-align: center;">Nenhum lembrete configurado</p>';
        return;
    }
    
    list.innerHTML = mealReminders.map(time => `
        <div class="reminder-item">
            <span class="reminder-time">${time}</span>
            <button class="btn-remove" onclick="removeMealReminder('${time}')">Remover</button>
        </div>
    `).join('');
}

function enableNotifications() {
    if (Notification.permission === "granted") {
        startReminders();
    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                startReminders();
            } else {
                alert('Permissão de notificação negada!');
            }
        });
    } else {
        alert('Notificações bloqueadas! Ative nas configurações do navegador.');
    }
}

function startReminders() {
    notificationsEnabled = true;
    document.getElementById('status').className = 'status active';
    document.getElementById('status').textContent = 'Notificações ativadas ✓';
    document.getElementById('enableBtn').disabled = true;

    // Notificação de teste
    if (Notification.permission === "granted") {
        new Notification('Lembretes Ativados!', {
            body: 'Você receberá notificações nos horários configurados.',
            icon: '💚'
        });
    }

    // Inicia verificação de refeições
    checkMealReminders();
    setInterval(checkMealReminders, 60000); // Verifica a cada minuto

    // Inicia lembrete de água
    startWaterReminder();
}

function checkMealReminders() {
    if (!notificationsEnabled || Notification.permission !== "granted") return;
    
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    if (mealReminders.includes(currentTime)) {
        new Notification('🍽️ Hora de Comer!', {
            body: 'Não se esqueça de fazer sua refeição!',
            icon: '🍽️',
            requireInteraction: true
        });
    }
}

function startWaterReminder() {
    const intervalMinutes = parseInt(document.getElementById('waterInterval').value) || 60;
    
    if (waterInterval) {
        clearInterval(waterInterval);
    }
    
    waterInterval = setInterval(() => {
        if (notificationsEnabled && Notification.permission === "granted") {
            new Notification('💧 Beba Água!', {
                body: 'Hora de se hidratar! Beba um copo de água.',
                icon: '💧',
                requireInteraction: true
            });
        }
    }, intervalMinutes * 60000);
    
    updateWaterStatus(intervalMinutes);
}

function updateWaterReminder() {
    if (notificationsEnabled) {
        startWaterReminder();
    }
}

function updateWaterStatus(intervalMinutes) {
    document.getElementById('waterStatus').innerHTML = 
        `<p style="color: #28a745; text-align: center; font-weight: 600;">
            Ativo: notificação a cada ${intervalMinutes} minuto${intervalMinutes !== 1 ? 's' : ''}
        </p>`;
}

// Função para desativar notificações (opcional)
function disableNotifications() {
    notificationsEnabled = false;
    if (waterInterval) {
        clearInterval(waterInterval);
        waterInterval = null;
    }
    document.getElementById('status').className = 'status';
    document.getElementById('status').textContent = 'Notificações desativadas';
    document.getElementById('enableBtn').disabled = false;
    document.getElementById('waterStatus').innerHTML = 
        '<p style="color: #999; text-align: center;">Lembretes de água desativados</p>';
}