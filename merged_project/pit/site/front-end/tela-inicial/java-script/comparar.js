let diets = [];

// Carregar dietas do localStorage ao iniciar
window.addEventListener('DOMContentLoaded', () => {
    loadDiets();
    displayDiets();
    updateStatistics();
});

// Função para carregar dietas do localStorage
function loadDiets() {
    const storedDiets = localStorage.getItem('diets');
    if (storedDiets) {
        diets = JSON.parse(storedDiets);
    }
}

// Função para salvar dietas no localStorage
function saveDiets() {
    localStorage.setItem('diets', JSON.stringify(diets));
}

// Adicionar nova dieta
document.getElementById('dietForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const diet = {
        id: Date.now(),
        userName: document.getElementById('userName').value,
        dietType: document.getElementById('dietType').value,
        startWeight: parseFloat(document.getElementById('startWeight').value),
        currentWeight: parseFloat(document.getElementById('currentWeight').value),
        duration: parseInt(document.getElementById('duration').value),
        satisfaction: parseInt(document.getElementById('satisfaction').value),
        notes: document.getElementById('notes').value,
        date: new Date().toLocaleDateString('pt-BR')
    };
    
    // Calcular perda/ganho de peso
    diet.weightChange = diet.startWeight - diet.currentWeight;
    diet.percentageChange = ((diet.weightChange / diet.startWeight) * 100).toFixed(1);
    
    diets.push(diet);
    saveDiets();
    
    // Limpar formulário
    document.getElementById('dietForm').reset();
    
    // Atualizar exibição
    displayDiets();
    updateStatistics();
    
    // Mostrar mensagem de sucesso
    alert('Dieta cadastrada com sucesso!');
});

// Filtrar dietas
document.getElementById('filterDiet').addEventListener('change', displayDiets);

// Ordenar por resultado
document.getElementById('sortBtn').addEventListener('click', () => {
    diets.sort((a, b) => b.weightChange - a.weightChange);
    saveDiets();
    displayDiets();
});

// Função para exibir dietas
function displayDiets() {
    const dietsList = document.getElementById('dietsList');
    const filter = document.getElementById('filterDiet').value;
    
    let filteredDiets = diets;
    if (filter !== 'all') {
        filteredDiets = diets.filter(diet => diet.dietType === filter);
    }
    
    if (filteredDiets.length === 0) {
        dietsList.innerHTML = '<p class="empty-message">Nenhuma dieta encontrada.</p>';
        return;
    }
    
    dietsList.innerHTML = filteredDiets.map(diet => `
        <div class="diet-card">
            <div class="diet-card-header">
                <h3>${diet.userName}</h3>
                <span class="diet-type-badge">${getDietName(diet.dietType)}</span>
            </div>
            <div class="diet-card-body">
                <div class="diet-info">
                    <strong>Peso Inicial:</strong> ${diet.startWeight} kg
                </div>
                <div class="diet-info">
                    <strong>Peso Atual:</strong> ${diet.currentWeight} kg
                </div>
                <div class="diet-info">
                    <strong>Duração:</strong> ${diet.duration} dias
                </div>
                <div class="diet-info">
                    <strong>Satisfação:</strong> ${diet.satisfaction}/10
                </div>
                <div class="diet-info">
                    <strong>Resultado:</strong> 
                    <span class="${diet.weightChange >= 0 ? 'weight-loss' : 'weight-gain'}">
                        ${diet.weightChange >= 0 ? '-' : '+'}${Math.abs(diet.weightChange).toFixed(1)} kg 
                        (${Math.abs(diet.percentageChange)}%)
                    </span>
                </div>
                <div class="diet-info">
                    <strong>Data:</strong> ${diet.date}
                </div>
            </div>
            ${diet.notes ? <div class="diet-notes">${diet.notes}</div> : ''}
            <button class="btn-delete" onclick="deleteDiet(${diet.id})">Excluir</button>
        </div>
    `).join('');
}

// Função para obter nome da dieta
function getDietName(type) {
    const names = {
        'low-carb': 'Low Carb',
        'cetogenica': 'Cetogênica',
        'mediterranea': 'Mediterrânea',
        'vegetariana': 'Vegetariana',
        'vegana': 'Vegana',
        'jejum': 'Jejum Intermitente',
        'paleo': 'Paleo',
        'dash': 'DASH'
    };
    return names[type] || type;
}

// Função para excluir dieta
function deleteDiet(id) {
    if (confirm('Tem certeza que deseja excluir esta dieta?')) {
        diets = diets.filter(diet => diet.id !== id);
        saveDiets();
        displayDiets();
        updateStatistics();
    }
}

// Função para atualizar estatísticas
function updateStatistics() {
    // Total de usuários
    document.getElementById('totalUsers').textContent = diets.length;
    
    if (diets.length === 0) {
        document.getElementById('avgWeightLoss').textContent = '0 kg';
        document.getElementById('popularDiet').textContent = '-';
        document.getElementById('avgSatisfaction').textContent = '0';
        return;
    }
    
    // Perda média de peso
    const avgWeightLoss = diets.reduce((sum, diet) => sum + diet.weightChange, 0) / diets.length;
    document.getElementById('avgWeightLoss').textContent = avgWeightLoss.toFixed(1) + ' kg';
    
    // Dieta mais popular
    const dietCount = {};
    diets.forEach(diet => {
        dietCount[diet.dietType] = (dietCount[diet.dietType] || 0) + 1;
    });
    const popularDiet = Object.keys(dietCount).reduce((a, b) => 
        dietCount[a] > dietCount[b] ? a : b
    );
    document.getElementById('popularDiet').textContent = getDietName(popularDiet);
    
    // Satisfação média
    const avgSatisfaction = diets.reduce((sum, diet) => sum + diet.satisfaction, 0) / diets.length;
    document.getElementById('avgSatisfaction').textContent = avgSatisfaction.toFixed(1) + '/10';
}