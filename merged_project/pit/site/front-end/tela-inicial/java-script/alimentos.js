// ========== VARIÁVEIS GLOBAIS ==========
let history = [];
let currentFilter = 'all';
let dailyGoal = 2000;

// ========== INICIALIZAÇÃO ==========
window.addEventListener('DOMContentLoaded', () => {
    loadHistory();
    loadDailyGoal();
    setCurrentDate();
    setDefaultDateTime();
    updateNutritionSummary();
});

// ========== FUNÇÕES DE DATA/HORA ==========
function setCurrentDate() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = today.toLocaleDateString('pt-BR', options);
    }
}

function setDefaultDateTime() {
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);
    const datetime = now.toISOString().slice(0, 16);
    
    // Para refeição completa
    const mealDateEl = document.getElementById('mealDate');
    const mealTimeEl = document.getElementById('mealTime');
    if (mealDateEl) mealDateEl.value = dateStr;
    if (mealTimeEl) mealTimeEl.value = timeStr;
    
    // Para atividade física
    const activityDateTimeEl = document.getElementById('activityDateTime');
    if (activityDateTimeEl) activityDateTimeEl.value = datetime;
}

// ========== EVENT LISTENERS - ABAS ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        
        // Remove active de todas as abas
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        // Ativa a aba clicada
        this.classList.add('active');
        document.getElementById(targetTab).classList.add('active');
    });
});

// ========== EVENT LISTENERS - REFEIÇÕES E ATIVIDADES ==========
const addCompleteMealBtn = document.getElementById('addCompleteMealBtn');
if (addCompleteMealBtn) {
    addCompleteMealBtn.addEventListener('click', addCompleteMeal);
}

const addActivityBtn = document.getElementById('addActivityBtn');
if (addActivityBtn) {
    addActivityBtn.addEventListener('click', addActivity);
}

const setGoalBtn = document.getElementById('setGoalBtn');
if (setGoalBtn) {
    setGoalBtn.addEventListener('click', setDailyGoal);
}

const clearBtn = document.getElementById('clearBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', clearHistory);
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentFilter = this.getAttribute('data-filter');
        renderHistory();
    });
});

// ========== FUNÇÕES DE META DIÁRIA ==========
function loadDailyGoal() {
    const stored = localStorage.getItem('dailyCaloriesGoal');
    if (stored) {
        dailyGoal = parseInt(stored);
    }
    const goalElement = document.getElementById('dailyGoal');
    if (goalElement) {
        goalElement.textContent = dailyGoal;
    }
}

function setDailyGoal() {
    const input = document.getElementById('dailyGoalInput');
    const newGoal = parseInt(input.value);
    
    if (newGoal && newGoal > 0) {
        dailyGoal = newGoal;
        localStorage.setItem('dailyCaloriesGoal', dailyGoal);
        document.getElementById('dailyGoal').textContent = dailyGoal;
        input.value = '';
        updateNutritionSummary();
        showNotification('Meta diária atualizada! 🎯');
    } else {
        alert('Digite um valor válido para a meta diária!');
    }
}

// ========== FUNÇÕES DE REFEIÇÃO COMPLETA ==========
function addCompleteMeal() {
    const date = document.getElementById('mealDate').value;
    const time = document.getElementById('mealTime').value;
    const type = document.getElementById('mealType').value;
    const foodName = document.getElementById('foodName').value.trim();
    const quantity = parseFloat(document.getElementById('quantity').value);
    const unit = document.getElementById('unit').value;
    const calories = parseFloat(document.getElementById('calories').value);
    const protein = parseFloat(document.getElementById('protein').value) || 0;
    const carbs = parseFloat(document.getElementById('carbs').value) || 0;
    const fats = parseFloat(document.getElementById('fats').value) || 0;
    const notes = document.getElementById('mealNotes').value.trim();

    // Validações
    if (!date || !time) {
        alert('Preencha a data e hora!');
        return;
    }

    if (!type) {
        alert('Selecione o tipo de refeição!');
        return;
    }

    if (!foodName) {
        alert('Digite o nome do alimento!');
        return;
    }

    if (!quantity || quantity <= 0) {
        alert('Digite uma quantidade válida!');
        return;
    }

    if (!calories || calories < 0) {
        alert('Digite as calorias do alimento!');
        return;
    }

    const meal = {
        id: Date.now(),
        type: 'meal',
        mealType: type,
        foodName: foodName,
        quantity: quantity,
        unit: unit,
        calories: calories,
        protein: protein,
        carbs: carbs,
        fats: fats,
        notes: notes,
        date: date,
        time: time,
        datetime: `${date}T${time}`
    };

    history.unshift(meal);
    saveHistory();
    renderHistory();
    updateStats();
    updateNutritionSummary();

    // Limpar formulário
    clearMealForm();
    
    showNotification('Refeição registrada com sucesso! 🎉');
}

function clearMealForm() {
    document.getElementById('mealType').value = '';
    document.getElementById('foodName').value = '';
    document.getElementById('quantity').value = '';
    document.getElementById('calories').value = '';
    document.getElementById('protein').value = '';
    document.getElementById('carbs').value = '';
    document.getElementById('fats').value = '';
    document.getElementById('mealNotes').value = '';
    setDefaultDateTime();
}

// ========== FUNÇÕES DE ATIVIDADE FÍSICA ==========
function addActivity() {
    const type = document.getElementById('activityType').value;
    const duration = parseInt(document.getElementById('activityDuration').value);
    const calories = parseInt(document.getElementById('activityCalories').value) || 0;
    const datetime = document.getElementById('activityDateTime').value;

    if (!type) {
        alert('Selecione o tipo de atividade!');
        return;
    }

    if (!duration || duration <= 0) {
        alert('Informe a duração da atividade!');
        return;
    }

    if (!datetime) {
        alert('Selecione a data e hora!');
        return;
    }

    const activity = {
        id: Date.now(),
        type: 'activity',
        activityType: type,
        duration: duration,
        calories: calories,
        datetime: datetime
    };

    history.unshift(activity);
    saveHistory();
    renderHistory();
    updateStats();
    updateNutritionSummary();

    document.getElementById('activityType').value = '';
    document.getElementById('activityDuration').value = '';
    document.getElementById('activityCalories').value = '';
    setDefaultDateTime();

    showNotification('Atividade registrada com sucesso! 💪');
}

// ========== FUNÇÕES DE VISUALIZAÇÃO ==========
function getMealTypeName(type) {
    const names = {
        'cafe': 'Café da Manhã',
        'lanche-manha': 'Lanche da Manhã',
        'almoco': 'Almoço',
        'lanche-tarde': 'Lanche da Tarde',
        'jantar': 'Jantar',
        'ceia': 'Ceia'
    };
    return names[type] || type;
}

function getUnitName(unit) {
    const names = {
        'g': 'gramas',
        'ml': 'mililitros',
        'un': 'unidade(s)',
        'colher': 'colher(es)',
        'xicara': 'xícara(s)'
    };
    return names[unit] || unit;
}

function deleteItem(id) {
    if (confirm('Deseja realmente excluir este registro?')) {
        history = history.filter(item => item.id !== id);
        saveHistory();
        renderHistory();
        updateStats();
        updateNutritionSummary();
        showNotification('Registro excluído! 🗑️');
    }
}

function renderHistory() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    let filteredHistory = filterHistory();

    if (filteredHistory.length === 0) {
        historyList.innerHTML = '<div class="empty-message">📭 Nenhum registro encontrado</div>';
        return;
    }

    historyList.innerHTML = filteredHistory.map(item => {
        const date = new Date(item.datetime);
        const formattedDate = date.toLocaleDateString('pt-BR');
        const formattedTime = date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        if (item.type === 'meal') {
            // Refeição completa com macros
            if (item.mealType) {
                return `
                    <div class="history-item meal-complete">
                        <div class="history-header">
                            <span class="meal-type-badge">${getMealTypeName(item.mealType)}</span>
                            <span class="history-datetime">📅 ${formattedDate} às ${formattedTime}</span>
                        </div>
                        <div class="history-content">
                            <div class="history-title">${item.foodName}</div>
                            <div class="history-quantity">${item.quantity} ${getUnitName(item.unit)}</div>
                            <div class="meal-macros">
                                <span class="macro-item">🔥 ${item.calories} kcal</span>
                                <span class="macro-item">🥩 ${item.protein}g proteínas</span>
                                <span class="macro-item">🍞 ${item.carbs}g carboidratos</span>
                                <span class="macro-item">🥑 ${item.fats}g gorduras</span>
                            </div>
                            ${item.notes ? <div class="meal-notes">📝 ${item.notes}</div> : ''}
                        </div>
                        <button class="btn-delete" onclick="deleteItem(${item.id})">Excluir</button>
                    </div>
                `;
            }
        } else if (item.type === 'activity') {
            return `
                <div class="history-item activity">
                    <span class="history-icon">💪</span>
                    <div class="history-content">
                        <div class="history-title">${item.activityType}</div>
                        <div class="history-details">
                            <span>⏱️ ${item.duration} min</span>
                            ${item.calories > 0 ? <span>🔥 ${item.calories} kcal</span> : ''}
                            <span class="history-datetime">📅 ${formattedDate} às ${formattedTime}</span>
                        </div>
                    </div>
                    <button class="btn-delete" onclick="deleteItem(${item.id})">Excluir</button>
                </div>
            `;
        }
    }).join('');
}

function filterHistory() {
    let filtered = [...history];
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    switch (currentFilter) {
        case 'meals':
            filtered = filtered.filter(item => item.type === 'meal');
            break;
        case 'activities':
            filtered = filtered.filter(item => item.type === 'activity');
            break;
        case 'today':
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.datetime);
                return itemDate >= today;
            });
            break;
        case 'week':
            filtered = filtered.filter(item => {
                const itemDate = new Date(item.datetime);
                return itemDate >= weekAgo;
            });
            break;
    }

    return filtered;
}

// ========== FUNÇÕES DE RESUMO NUTRICIONAL ==========
function updateNutritionSummary() {
    const today = new Date().toISOString().split('T')[0];
    const todayMeals = history.filter(item => {
        if (item.type !== 'meal') return false;
        const itemDate = item.date || item.datetime.split('T')[0];
        return itemDate === today;
    });
    
    let totalCalories = 0;
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFats = 0;
    
    todayMeals.forEach(meal => {
        totalCalories += meal.calories || 0;
        totalProtein += meal.protein || 0;
        totalCarbs += meal.carbs || 0;
        totalFats += meal.fats || 0;
    });
    
    // Atualizar valores
    const todayCaloriesEl = document.getElementById('todayCalories');
    const summaryCaloriesEl = document.getElementById('summaryCalories');
    const summaryProteinEl = document.getElementById('summaryProtein');
    const summaryCarbsEl = document.getElementById('summaryCarbs');
    const summaryFatsEl = document.getElementById('summaryFats');
    
    if (todayCaloriesEl) todayCaloriesEl.textContent = Math.round(totalCalories);
    if (summaryCaloriesEl) summaryCaloriesEl.textContent = Math.round(totalCalories);
    if (summaryProteinEl) summaryProteinEl.textContent = Math.round(totalProtein);
    if (summaryCarbsEl) summaryCarbsEl.textContent = Math.round(totalCarbs);
    if (summaryFatsEl) summaryFatsEl.textContent = Math.round(totalFats);
    
    // Atualizar barra de progresso
    const percentage = Math.min((totalCalories / dailyGoal) * 100, 100);
    const progressFill = document.getElementById('caloriesProgress');
    if (progressFill) {
        progressFill.style.width = percentage + '%';
        
        if (totalCalories > dailyGoal) {
            progressFill.style.background = 'linear-gradient(90deg, #ff4757 0%, #ff6348 100%)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)';
        }
    }
}

// ========== FUNÇÕES DE ESTATÍSTICAS ==========
function updateStats() {
    const meals = history.filter(item => item.type === 'meal');
    const activities = history.filter(item => item.type === 'activity');
    
    const totalCaloriesIn = meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
    const totalCaloriesOut = activities.reduce((sum, activity) => sum + (activity.calories || 0), 0);

    const totalMealsEl = document.getElementById('totalMeals');
    const totalActivitiesEl = document.getElementById('totalActivities');
    const totalCaloriesInEl = document.getElementById('totalCaloriesIn');
    const totalCaloriesOutEl = document.getElementById('totalCaloriesOut');
    
    if (totalMealsEl) totalMealsEl.textContent = meals.length;
    if (totalActivitiesEl) totalActivitiesEl.textContent = activities.length;
    if (totalCaloriesInEl) totalCaloriesInEl.textContent = Math.round(totalCaloriesIn);
    if (totalCaloriesOutEl) totalCaloriesOutEl.textContent = Math.round(totalCaloriesOut);
}

// ========== FUNÇÕES DE ARMAZENAMENTO ==========
function saveHistory() {
    localStorage.setItem('healthHistory', JSON.stringify(history));
}

function loadHistory() {
    const saved = localStorage.getItem('healthHistory');
    if (saved) {
        history = JSON.parse(saved);
        renderHistory();
        updateStats();
    }
}

function clearHistory() {
    if (confirm('Deseja realmente limpar TODO o histórico? Esta ação não pode ser desfeita!')) {
        history = [];
        saveHistory();
        renderHistory();
        updateStats();
        updateNutritionSummary();
        showNotification('Histórico limpo com sucesso!');
    }
}

// ========== FUNÇÃO DE NOTIFICAÇÃO ==========
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Torna deleteItem global
window.deleteItem = deleteItem;