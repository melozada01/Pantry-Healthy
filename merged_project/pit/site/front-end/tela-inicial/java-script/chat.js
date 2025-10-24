const chatArea = document.getElementById('chatArea');
const messageInput = document.getElementById('messageInput');
const typingIndicator = document.getElementById('typingIndicator');

let conversationState = {
    step: 'inicio',
    userData: {}
};

function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

function addMessage(text, type, showQuickReplies = false, replies = []) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    
    let repliesHtml = '';
    if (showQuickReplies && replies.length > 0) {
        repliesHtml = '<div class="quick-replies">';
        replies.forEach(reply => {
            repliesHtml += `<button class="quick-reply-btn" onclick="selectOption('${reply.value}')">${reply.text}</button>`;
        });
        repliesHtml += '</div>';
    }
    
    messageDiv.innerHTML = `
        <div class="message-bubble">
            ${text}
            ${repliesHtml}
            <div class="message-time">${getCurrentTime()}</div>
        </div>
    `;
    
    chatArea.appendChild(messageDiv);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function showTyping() {
    typingIndicator.classList.add('active');
    chatArea.scrollTop = chatArea.scrollHeight;
}

function hideTyping() {
    typingIndicator.classList.remove('active');
}

function botResponse(userMessage) {
    showTyping();
    
    setTimeout(() => {
        hideTyping();
        
        switch (conversationState.step) {
            case 'inicio':
                addMessage('Como posso ajudar você?', 'bot', true, [
                    { text: '📋 Criar Dieta', value: 'criar_dieta' },
                    { text: '⚖️ Calcular IMC', value: 'calcular_imc' },
                    { text: '💡 Dicas', value: 'dicas' }
                ]);
                break;

            case 'criar_dieta':
                addMessage('Perfeito! Vou criar uma dieta personalizada para você. 📝<br><br>Qual é o seu objetivo?', 'bot', true, [
                    { text: '🔥 Perder Peso', value: 'perder_peso' },
                    { text: '💪 Ganhar Massa', value: 'ganhar_massa' },
                    { text: '⚖️ Manter Peso', value: 'manter_peso' }
                ]);
                conversationState.step = 'objetivo';
                break;

            case 'objetivo':
                conversationState.userData.objetivo = userMessage;
                addMessage('Ótima escolha! 🎯<br><br>Quantas refeições você gostaria por dia?', 'bot', true, [
                    { text: '3 refeições', value: '3' },
                    { text: '4 refeições', value: '4' },
                    { text: '5 refeições', value: '5' }
                ]);
                conversationState.step = 'refeicoes';
                break;

            case 'refeicoes':
                conversationState.userData.refeicoes = userMessage;
                gerarDieta();
                break;

            case 'calcular_imc':
                addMessage('Vou calcular seu IMC! 📊<br><br>Qual é o seu peso em kg? (ex: 70)', 'bot');
                conversationState.step = 'peso';
                break;

            case 'peso':
                conversationState.userData.peso = parseFloat(userMessage);
                addMessage('Agora me diga sua altura em metros (ex: 1.75)', 'bot');
                conversationState.step = 'altura';
                break;

            case 'altura':
                conversationState.userData.altura = parseFloat(userMessage);
                calcularIMC();
                break;

            case 'dicas':
                mostrarDicas();
                break;
        }
    }, 1200);
}

function gerarDieta() {
    const { objetivo, refeicoes } = conversationState.userData;
    
    let dieta = '<strong>🎉 Sua Dieta Personalizada</strong><br><br>';
    
    const dietas = {
        '🔥 Perder Peso': {
            cafe: '☕ <strong>Café da Manhã:</strong><br>• 2 ovos mexidos<br>• 1 fatia de pão integral<br>• Café sem açúcar',
            almoco: '🍽️ <strong>Almoço:</strong><br>• Peito de frango grelhado<br>• Salada verde<br>• Arroz integral (3 col)',
            lanche: '🥤 <strong>Lanche:</strong><br>• 1 iogurte natural<br>• Frutas vermelhas',
            jantar: '🌙 <strong>Jantar:</strong><br>• Peixe grelhado<br>• Legumes cozidos<br>• Sopa de legumes',
            ceia: '🌜 <strong>Ceia:</strong><br>• Chá verde<br>• 3 castanhas'
        },
        '💪 Ganhar Massa': {
            cafe: '☕ <strong>Café da Manhã:</strong><br>• 4 ovos mexidos<br>• Aveia com banana<br>• Suco de laranja',
            almoco: '🍽️ <strong>Almoço:</strong><br>• Carne vermelha magra<br>• Arroz integral<br>• Feijão<br>• Batata doce',
            lanche: '🥤 <strong>Lanche:</strong><br>• Whey protein<br>• Pasta de amendoim<br>• Banana',
            jantar: '🌙 <strong>Jantar:</strong><br>• Frango grelhado<br>• Batata doce<br>• Brócolis',
            ceia: '🌜 <strong>Ceia:</strong><br>• Caseína<br>• Oleaginosas'
        },
        '⚖️ Manter Peso': {
            cafe: '☕ <strong>Café da Manhã:</strong><br>• Tapioca com queijo<br>• Café com leite<br>• Fruta',
            almoco: '🍽️ <strong>Almoço:</strong><br>• Proteína magra<br>• Arroz integral<br>• Feijão<br>• Salada',
            lanche: '🥤 <strong>Lanche:</strong><br>• Iogurte<br>• Granola<br>• Fruta',
            jantar: '🌙 <strong>Jantar:</strong><br>• Sopa nutritiva<br>• Pão integral<br>• Salada',
            ceia: '🌜 <strong>Ceia:</strong><br>• Chá<br>• Biscoito integral'
        }
    };
    
    const dietaSelecionada = dietas[objetivo];
    const numRefeicoes = parseInt(refeicoes);
    const orderedMeals = ['cafe', 'almoco', 'lanche', 'jantar', 'ceia'];
    const selectedMeals = orderedMeals.slice(0, numRefeicoes);
    
    selectedMeals.forEach(meal => {
        dieta += dietaSelecionada[meal] + '<br><br>';
    });
    
    dieta += '💧 <strong>Lembre-se:</strong> Beba 2-3 litros de água por dia!';
    
    addMessage(dieta, 'bot', true, [
        { text: '🔄 Nova Dieta', value: 'criar_dieta' },
        { text: '🏠 Menu Principal', value: 'inicio' }
    ]);
    
    conversationState.step = 'inicio';
}

function calcularIMC() {
    const { peso, altura } = conversationState.userData;
    const imc = (peso / (altura * altura)).toFixed(1);
    
    let classificacao = '';
    let emoji = '';
    
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
        emoji = '📉';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
        emoji = '✅';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
        emoji = '⚠️';
    } else {
        classificacao = 'Obesidade';
        emoji = '🔴';
    }
    
    const resultado = `
        <strong>📊 Resultado do IMC</strong><br><br>
        Seu IMC: <strong>${imc}</strong><br>
        Classificação: ${emoji} <strong>${classificacao}</strong><br><br>
        ${imc < 25 ? '🎉 Parabéns! Continue assim!' : '💪 Vamos trabalhar juntos para melhorar!'}
    `;
    
    addMessage(resultado, 'bot', true, [
        { text: '📋 Criar Dieta', value: 'criar_dieta' },
        { text: '🏠 Menu Principal', value: 'inicio' }
    ]);
    
    conversationState.step = 'inicio';
}

function mostrarDicas() {
    const dicas = `
        <strong>💡 Dicas de Alimentação Saudável</strong><br><br>
        1️⃣ Beba água regularmente<br>
        2️⃣ Coma devagar e mastigue bem<br>
        3️⃣ Inclua vegetais em todas refeições<br>
        4️⃣ Evite alimentos ultraprocessados<br>
        5️⃣ Durma bem (7-8h por noite)<br>
        6️⃣ Pratique exercícios regularmente<br><br>
        🌟 Consistência é a chave do sucesso!
    `;
    
    addMessage(dicas, 'bot', true, [
        { text: '📋 Criar Dieta', value: 'criar_dieta' },
        { text: '🏠 Menu Principal', value: 'inicio' }
    ]);
    
    conversationState.step = 'inicio';
}

function selectOption(option) {
    const optionTexts = {
        'criar_dieta': '📋 Criar Dieta',
        'calcular_imc': '⚖️ Calcular IMC',
        'dicas': '💡 Dicas',
        'perder_peso': '🔥 Perder Peso',
        'ganhar_massa': '💪 Ganhar Massa',
        'manter_peso': '⚖️ Manter Peso',
        '3': '3 refeições',
        '4': '4 refeições',
        '5': '5 refeições',
        'inicio': '🏠 Menu Principal'
    };
    
    addMessage(optionTexts[option] || option, 'user');
    
    if (option === 'inicio') {
        conversationState.step = 'inicio';
        addMessage('Como posso ajudar você?', 'bot', true, [
            { text: '📋 Criar Dieta', value: 'criar_dieta' },
            { text: '⚖️ Calcular IMC', value: 'calcular_imc' },
            { text: '💡 Dicas', value: 'dicas' }
        ]);
    } else {
        conversationState.step = option;
        botResponse(optionTexts[option] || option);
    }
}

function sendMessage() {
    const message = messageInput.value.trim();
    if (message === '') return;
    
    addMessage(message, 'user');
    messageInput.value = '';
    
    botResponse(message);
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}
