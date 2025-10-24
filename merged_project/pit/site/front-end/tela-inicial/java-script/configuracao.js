// Carregar configurações salvas ao carregar a página
window.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    setupEventListeners();
});

function setupEventListeners() {
    // Event listeners para temas
    document.querySelectorAll('.theme-option').forEach(option => {
        option.addEventListener('click', function() {
            const theme = this.dataset.theme;
            applyTheme(theme);
            localStorage.setItem('theme', theme);
        });
    });

    // Event listener para tamanho da fonte
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    if (fontSizeSlider) {
        fontSizeSlider.addEventListener('input', function() {
            const size = this.value;
            applyFontSize(size);
            localStorage.setItem('fontSize', size);
        });
    }

    // Event listener para fechar modal
    document.addEventListener('click', function(event) {
        const modal = document.getElementById('passwordModal');
        if (event.target === modal) {
            closeModal();
        }
    });
}

function loadSettings() {
    // Carregar tema
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Carregar tamanho da fonte
    const savedFontSize = localStorage.getItem('fontSize') || '16';
    const fontSizeSlider = document.getElementById('fontSizeSlider');
    if (fontSizeSlider) {
        fontSizeSlider.value = savedFontSize;
    }
    applyFontSize(savedFontSize);

    // Carregar estado das notificações
    const notificationsEnabled = localStorage.getItem('notifications') === 'true';
    updateNotificationToggle(notificationsEnabled);
}

// ========== GERENCIAMENTO DE TEMAS ==========
function applyTheme(theme) {
    // Remove todas as classes de tema
    document.body.className = document.body.className.replace(/\btheme-\w+/g, '');
    document.body.classList.add(`theme-${theme}`);

    // Atualiza os estados visuais
    document.querySelectorAll('.theme-option').forEach(opt => {
        opt.classList.remove('active');
    });
    
    const selectedTheme = document.querySelector(`[data-theme="${theme}"]`);
    if (selectedTheme) {
        selectedTheme.classList.add('active');
    }
}

// ========== GERENCIAMENTO DO TAMANHO DA FONTE ==========
function applyFontSize(size) {
    const fontSizeValue = document.getElementById('fontSizeValue');
    const previewText = document.getElementById('previewText');
    
    if (fontSizeValue) {
        fontSizeValue.textContent = `${size}px`;
    }
    
    if (previewText) {
        previewText.style.fontSize = `${size}px`;
    }
    
    const previewButton = document.querySelector('.preview-button');
    if (previewButton) {
        previewButton.style.fontSize = `${size}px`;
    }
    
    document.documentElement.style.setProperty('--font-size', `${size}px`);
}

// ========== GERENCIAMENTO DE NOTIFICAÇÕES ==========
function toggleNotifications() {
    const toggle = document.getElementById('notificationToggle');
    if (!toggle) return;
    
    const isActive = toggle.classList.contains('active');
    const newState = !isActive;
    
    updateNotificationToggle(newState);
    localStorage.setItem('notifications', newState.toString());
    
    // Feedback visual
    if (newState) {
        showNotification('Notificações ativadas! ✅');
        
        // Solicita permissão se for a primeira vez
        if (Notification.permission === 'default') {
            Notification.requestPermission();
        }
    } else {
        showNotification('Notificações desativadas');
    }
}

function updateNotificationToggle(enabled) {
    const toggle = document.getElementById('notificationToggle');
    if (toggle) {
        if (enabled) {
            toggle.classList.add('active');
        } else {
            toggle.classList.remove('active');
        }
    }
}

// ========== MODAL ==========
function openModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.add('active');
    }
}

function closeModal() {
    const modal = document.getElementById('passwordModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

// ========== LOGOUT ==========
function confirmLogout() {
    if (confirm('Deseja realmente sair?')) {
        // Limpa apenas dados de sessão, mantém preferências
        const theme = localStorage.getItem('theme');
        const fontSize = localStorage.getItem('fontSize');
        const notifications = localStorage.getItem('notifications');
        
        localStorage.clear();
        
        // Restaura preferências
        if (theme) localStorage.setItem('theme', theme);
        if (fontSize) localStorage.setItem('fontSize', fontSize);
        if (notifications) localStorage.setItem('notifications', notifications);
        
        showNotification('Você saiu com sucesso! 👋');
        
        // Redirecionar para login após 2 segundos
        setTimeout(() => {
            // window.location.href = 'login.html';
            console.log('Redirecionando para login...');
        }, 2000);
    }
}

// ========== ALTERAR SENHA ==========
function changePassword() {
    const currentPassword = document.getElementById('currentPassword');
    const newPassword = document.getElementById('newPassword');
    const confirmPassword = document.getElementById('confirmPassword');
    
    if (!currentPassword || !newPassword || !confirmPassword) return;
    
    // Validações
    if (!currentPassword.value) {
        showNotification('Digite sua senha atual!');
        return;
    }
    
    if (newPassword.value.length < 6) {
        showNotification('A nova senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    if (newPassword.value !== confirmPassword.value) {
        showNotification('As senhas não coincidem!');
        return;
    }
    
    // Simulação de alteração de senha
    // Em uma aplicação real, aqui seria uma chamada API
    showNotification('Senha alterada com sucesso! ✅');
    closeModal();
    
    // Limpa os campos
    currentPassword.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
}

// ========== NOTIFICAÇÕES TOAST ==========
function showNotification(message, type = 'info') {
    // Remove notificações existentes
    const existingNotifications = document.querySelectorAll('.toast-notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    // Cria elemento de notificação
    const notification = document.createElement('div');
    notification.className = `toast-notification toast-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: ${type === 'error' ? '#dc3545' : type === 'success' ? '#28a745' : '#007bff'};
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 2000;
        animation: slideDown 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        max-width: 90%;
        text-align: center;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    // Remove após 3 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

// Adiciona animações CSS dinamicamente se não existirem
function addNotificationStyles() {
    if (!document.getElementById('notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translate(-50%, -20px);
                }
                to {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
            }
            
            @keyframes slideUp {
                from {
                    opacity: 1;
                    transform: translate(-50%, 0);
                }
                to {
                    opacity: 0;
                    transform: translate(-50%, -20px);
                }
            }
            
            .toast-notification {
                font-family: system-ui, -apple-system, sans-serif;
                font-weight: 500;
            }
        `;
        document.head.appendChild(style);
    }
}

// ========== EXPORTAR/IMPORTAR CONFIGURAÇÕES ==========
function exportSettings() {
    const settings = {
        theme: localStorage.getItem('theme'),
        fontSize: localStorage.getItem('fontSize'),
        notifications: localStorage.getItem('notifications'),
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `pantry-healthy-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('Configurações exportadas com sucesso! 📥', 'success');
}

function importSettings(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const settings = JSON.parse(e.target.result);
            
            // Aplica configurações importadas
            if (settings.theme) {
                localStorage.setItem('theme', settings.theme);
                applyTheme(settings.theme);
            }
            
            if (settings.fontSize) {
                localStorage.setItem('fontSize', settings.fontSize);
                applyFontSize(settings.fontSize);
            }
            
            if (settings.notifications) {
                localStorage.setItem('notifications', settings.notifications);
                updateNotificationToggle(settings.notifications === 'true');
            }
            
            showNotification('Configurações importadas com sucesso! 📤', 'success');
            
            // Limpa o input file
            event.target.value = '';
            
        } catch (error) {
            showNotification('Erro ao importar configurações! ❌', 'error');
            console.error('Erro ao importar:', error);
        }
    };
    reader.readAsText(file);
}

// ========== RESETAR CONFIGURAÇÕES ==========
function resetSettings() {
    if (confirm('Tem certeza que deseja redefinir todas as configurações para os padrões?')) {
        localStorage.removeItem('theme');
        localStorage.removeItem('fontSize');
        localStorage.removeItem('notifications');
        
        loadSettings();
        showNotification('Configurações redefinidas para os padrões! 🔄', 'success');
    }
}

// Inicializa estilos de notificação
addNotificationStyles();