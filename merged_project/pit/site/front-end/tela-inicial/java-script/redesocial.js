// ========== VARIÁVEIS GLOBAIS ==========
let shareHistory = [];
let connectedAccounts = {
    facebook: false,
    twitter: false,
    instagram: false
};

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    loadShareHistory();
    loadConnectedAccounts();
    loadAchievements();
    updateShareLink();
    setAchievementDate();
    
    // Carrega mensagem personalizada salva
    const savedMessage = localStorage.getItem('customShareMessage');
    if (savedMessage) {
        document.getElementById('customMessage').value = savedMessage;
    }
});

// ========== CARREGAR CONQUISTAS ==========
function loadAchievements() {
    const history = JSON.parse(localStorage.getItem('healthHistory') || '[]');
    const meals = history.filter(item => item.type === 'meal');
    const activities = history.filter(item => item.type === 'activity');
    
    const totalCaloriesIn = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    const totalCaloriesOut = activities.reduce((sum, activity) => sum + (activity.calories || 0), 0);
    const balance = totalCaloriesIn - totalCaloriesOut;

    document.getElementById('totalMealsShare').textContent = meals.length;
    document.getElementById('totalActivitiesShare').textContent = activities.length;
    document.getElementById('caloriesBalance').textContent = balance;
}

function setAchievementDate() {
    const now = new Date();
    const dateStr = now.toLocaleDateString('pt-BR', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });
    document.getElementById('achievementDate').textContent = `Atualizado em ${dateStr}`;
}

// ========== COMPARTILHAMENTO REDES SOCIAIS ==========
function getShareMessage() {
    const customMsg = document.getElementById('customMessage').value;
    const meals = document.getElementById('totalMealsShare').textContent;
    const activities = document.getElementById('totalActivitiesShare').textContent;
    const calories = document.getElementById('caloriesBalance').textContent;
    
    return `${customMsg}\n\n📊 ${meals} refeições registradas\n💪 ${activities} atividades físicas\n🔥 ${calories} calorias totais\n\n#PantryHealthy #VidaSaudavel`;
}

function shareToFacebook() {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(getShareMessage());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
    addToShareHistory('Facebook', 'fab fa-facebook-f');
}

function shareToTwitter() {
    const text = encodeURIComponent(getShareMessage());
    const url = encodeURIComponent(window.location.href);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank');
    addToShareHistory('Twitter', 'fab fa-twitter');
}

function shareToInstagram() {
    // Instagram não permite compartilhamento direto via web
    alert('📸 Para compartilhar no Instagram:\n\n1. Tire um screenshot desta tela\n2. Abra o Instagram\n3. Crie um novo post com a imagem\n4. Use as hashtags #PantryHealthy #VidaSaudavel');
    addToShareHistory('Instagram', 'fab fa-instagram');
}

function shareToWhatsApp() {
    const text = encodeURIComponent(getShareMessage());
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const whatsappUrl = isMobile 
        ? `whatsapp://send?text=${text}`
        : `https://web.whatsapp.com/send?text=${text}`;
    window.open(whatsappUrl, '_blank');
    addToShareHistory('WhatsApp', 'fab fa-whatsapp');
}

function shareToTelegram() {
    const text = encodeURIComponent(getShareMessage());
    const url = encodeURIComponent(window.location.href);
    window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank');
    addToShareHistory('Telegram', 'fab fa-telegram-plane');
}

function shareToLinkedIn() {
    const url = encodeURIComponent(window.location.href);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    addToShareHistory('LinkedIn', 'fab fa-linkedin-in');
}

// ========== COMPARTILHAMENTO NATIVO ==========
function nativeShare() {
    if (navigator.share) {
        navigator.share({
            title: 'Minha Jornada Saudável - PantryHealthy',
            text: getShareMessage(),
            url: window.location.href
        })
        .then(() => {
            addToShareHistory('Nativo', 'fas fa-share-alt');
        })
        .catch(err => {
            console.log('Erro ao compartilhar:', err);
        });
    } else {
        alert('⚠️ Compartilhamento nativo não disponível neste navegador. Use os botões das redes sociais acima.');
    }
}

// ========== COPIAR LINK ==========
function copyLink() {
    const linkInput = document.getElementById('shareLink');
    linkInput.select();
    linkInput.setSelectionRange(0, 99999);
    
    navigator.clipboard.writeText(linkInput.value)
        .then(() => {
            alert('✅ Link copiado para a área de transferência!');
            addToShareHistory('Link Copiado', 'fas fa-link');
        })
        .catch(err => {
            console.error('Erro ao copiar:', err);
            // Fallback para método antigo
            document.execCommand('copy');
            alert('✅ Link copiado!');
            addToShareHistory('Link Copiado', 'fas fa-link');
        });
}

function updateShareLink() {
    let userId = localStorage.getItem('shareUserId');
    if (!userId) {
        userId = Math.random().toString(36).substr(2, 9);
        localStorage.setItem('shareUserId', userId);
    }
    document.getElementById('shareLink').value = `${window.location.origin}${window.location.pathname}?share=${userId}`;
}

// ========== HISTÓRICO DE COMPARTILHAMENTOS ==========
function addToShareHistory(platform, icon) {
    const now = new Date();
    const shareItem = {
        platform: platform,
        icon: icon,
        timestamp: now.toISOString(),
        time: now.toLocaleString('pt-BR')
    };
    
    shareHistory.unshift(shareItem);
    if (shareHistory.length > 10) {
        shareHistory = shareHistory.slice(0, 10);
    }
    
    saveShareHistory();
    renderShareHistory();
}

function renderShareHistory() {
    const container = document.getElementById('shareHistory');
    
    if (!container) return;
    
    if (shareHistory.length === 0) {
        container.innerHTML = '<div class="empty-history">Nenhum compartilhamento ainda</div>';
        return;
    }
    
    container.innerHTML = shareHistory.map(item => `
        <div class="share-item">
            <div class="share-info">
                <i class="${item.icon} share-icon"></i>
                <div class="share-details">
                    <span class="share-platform">${item.platform}</span>
                    <span class="share-time">${item.time}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function saveShareHistory() {
    localStorage.setItem('shareHistory', JSON.stringify(shareHistory));
}

function loadShareHistory() {
    const saved = localStorage.getItem('shareHistory');
    if (saved) {
        shareHistory = JSON.parse(saved);
        renderShareHistory();
    }
}

// ========== CONECTAR CONTAS ==========
function connectFacebook() {
    const btn = document.getElementById('fbConnect');
    if (!btn) return;
    
    if (connectedAccounts.facebook) {
        connectedAccounts.facebook = false;
        btn.textContent = 'Conectar';
        btn.classList.remove('connected');
        alert('❌ Conta do Facebook desconectada');
    } else {
        alert('🔐 Redirecionando para autenticação do Facebook...');
        setTimeout(() => {
            connectedAccounts.facebook = true;
            btn.textContent = 'Conectado';
            btn.classList.add('connected');
            alert('✅ Conta do Facebook conectada com sucesso!');
            saveConnectedAccounts();
        }, 1500);
    }
}

function connectTwitter() {
    const btn = document.getElementById('twConnect');
    if (!btn) return;
    
    if (connectedAccounts.twitter) {
        connectedAccounts.twitter = false;
        btn.textContent = 'Conectar';
        btn.classList.remove('connected');
        alert('❌ Conta do Twitter desconectada');
    } else {
        alert('🔐 Redirecionando para autenticação do Twitter...');
        setTimeout(() => {
            connectedAccounts.twitter = true;
            btn.textContent = 'Conectado';
            btn.classList.add('connected');
            alert('✅ Conta do Twitter conectada com sucesso!');
            saveConnectedAccounts();
        }, 1500);
    }
}

function connectInstagram() {
    const btn = document.getElementById('igConnect');
    if (!btn) return;
    
    if (connectedAccounts.instagram) {
        connectedAccounts.instagram = false;
        btn.textContent = 'Conectar';
        btn.classList.remove('connected');
        alert('❌ Conta do Instagram desconectada');
    } else {
        alert('🔐 Redirecionando para autenticação do Instagram...');
        setTimeout(() => {
            connectedAccounts.instagram = true;
            btn.textContent = 'Conectado';
            btn.classList.add('connected');
            alert('✅ Conta do Instagram conectada com sucesso!');
            saveConnectedAccounts();
        }, 1500);
    }
}

function saveConnectedAccounts() {
    localStorage.setItem('connectedAccounts', JSON.stringify(connectedAccounts));
}

function loadConnectedAccounts() {
    const saved = localStorage.getItem('connectedAccounts');
    if (saved) {
        connectedAccounts = JSON.parse(saved);
        
        // Atualiza interface
        updateConnectionButtons();
    }
}

function updateConnectionButtons() {
    const platforms = ['facebook', 'twitter', 'instagram'];
    
    platforms.forEach(platform => {
        const btn = document.getElementById(`${platform.charAt(0)}${platform.slice(1)}Connect`);
        if (btn && connectedAccounts[platform]) {
            btn.textContent = 'Conectado';
            btn.classList.add('connected');
        }
    });
}

// ========== MENSAGEM PERSONALIZADA ==========
function saveCustomMessage() {
    const message = document.getElementById('customMessage').value;
    localStorage.setItem('customShareMessage', message);
    alert('✅ Mensagem personalizada salva!');
}

// ========== EXPORTAR DADOS ==========
function exportData() {
    const history = JSON.parse(localStorage.getItem('healthHistory') || '[]');
    const data = {
        exportDate: new Date().toISOString(),
        healthHistory: history,
        shareHistory: shareHistory,
        connectedAccounts: connectedAccounts
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `pantry-healthy-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    addToShareHistory('Exportado', 'fas fa-download');
}

// ========== LIMPAR DADOS ==========
function clearAllData() {
    if (confirm('⚠️ Tem certeza que deseja limpar todos os dados? Esta ação não pode ser desfeita!')) {
        localStorage.removeItem('healthHistory');
        localStorage.removeItem('shareHistory');
        localStorage.removeItem('connectedAccounts');
        localStorage.removeItem('customShareMessage');
        
        shareHistory = [];
        connectedAccounts = {
            facebook: false,
            twitter: false,
            instagram: false
        };
        
        loadAchievements();
        renderShareHistory();
        updateConnectionButtons();
        
        alert('✅ Todos os dados foram limpos!');
    }
}