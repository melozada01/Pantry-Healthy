// ========== DICIONÁRIO DE TRADUÇÕES ==========
const translations = {
    pt: {
        page_title: "NutriBot - Assistente de Dieta",
        app_name: "NutriBot",
        welcome_title: "Bem-vindo ao NutriBot",
        about_title: "Sobre o Aplicativo",
        about_description: "Seu assistente pessoal de nutrição com suporte a múltiplos idiomas. Receba planos alimentares personalizados, calcule seu IMC e obtenha dicas de saúde.",
        stat_recipes: "Receitas",
        stat_users: "Usuários",
        stat_languages: "Idiomas",
        stat_rating: "Avaliação",
        quick_actions: "Ações Rápidas",
        btn_create_diet: "Criar Plano Alimentar",
        btn_calculate_imc: "Calcular IMC",
        btn_tips: "Ver Dicas de Saúde",
        language_info_title: "Suporte Multi-idiomas",
        available_languages: "Idiomas Disponíveis",
        languages_description: "O aplicativo está disponível em 5 idiomas: Português, Inglês, Espanhol, Francês e Alemão. Selecione seu idioma preferido no menu superior.",
        nav_home: "Início",
        nav_foods: "Alimentos",
        nav_tips: "Dicas",
        nav_chat: "Chat",
        nav_profile: "Perfil",
        feature_coming_soon: "Funcionalidade em breve!",
        language_changed: "Idioma alterado com sucesso!"
    },
    en: {
        page_title: "NutriBot - Diet Assistant",
        app_name: "NutriBot",
        welcome_title: "Welcome to NutriBot",
        about_title: "About the App",
        about_description: "Your personal nutrition assistant with multi-language support. Get personalized meal plans, calculate your BMI and receive health tips.",
        stat_recipes: "Recipes",
        stat_users: "Users",
        stat_languages: "Languages",
        stat_rating: "Rating",
        quick_actions: "Quick Actions",
        btn_create_diet: "Create Meal Plan",
        btn_calculate_imc: "Calculate BMI",
        btn_tips: "View Health Tips",
        language_info_title: "Multi-language Support",
        available_languages: "Available Languages",
        languages_description: "The app is available in 5 languages: Portuguese, English, Spanish, French and German. Select your preferred language from the menu above.",
        nav_home: "Home",
        nav_foods: "Foods",
        nav_tips: "Tips",
        nav_chat: "Chat",
        nav_profile: "Profile",
        feature_coming_soon: "Feature coming soon!",
        language_changed: "Language changed successfully!"
    },
    es: {
        page_title: "NutriBot - Asistente de Dieta",
        app_name: "NutriBot",
        welcome_title: "Bienvenido a NutriBot",
        about_title: "Sobre la Aplicación",
        about_description: "Tu asistente personal de nutrición con soporte multiidioma. Recibe planes alimentarios personalizados, calcula tu IMC y obtén consejos de salud.",
        stat_recipes: "Recetas",
        stat_users: "Usuarios",
        stat_languages: "Idiomas",
        stat_rating: "Calificación",
        quick_actions: "Acciones Rápidas",
        btn_create_diet: "Crear Plan Alimentario",
        btn_calculate_imc: "Calcular IMC",
        btn_tips: "Ver Consejos de Salud",
        language_info_title: "Soporte Multi-idioma",
        available_languages: "Idiomas Disponibles",
        languages_description: "La aplicación está disponible en 5 idiomas: Portugués, Inglés, Español, Francés y Alemán. Selecciona tu idioma preferido en el menú superior.",
        nav_home: "Inicio",
        nav_foods: "Alimentos",
        nav_tips: "Consejos",
        nav_chat: "Chat",
        nav_profile: "Perfil",
        feature_coming_soon: "¡Función próximamente!",
        language_changed: "¡Idioma cambiado con éxito!"
    },
    fr: {
        page_title: "NutriBot - Assistant Diététique",
        app_name: "NutriBot",
        welcome_title: "Bienvenue sur NutriBot",
        about_title: "À propos de l'Application",
        about_description: "Votre assistant personnel de nutrition avec support multilingue. Obtenez des plans de repas personnalisés, calculez votre IMC et recevez des conseils santé.",
        stat_recipes: "Recettes",
        stat_users: "Utilisateurs",
        stat_languages: "Langues",
        stat_rating: "Note",
        quick_actions: "Actions Rapides",
        btn_create_diet: "Créer un Plan Alimentaire",
        btn_calculate_imc: "Calculer l'IMC",
        btn_tips: "Voir les Conseils Santé",
        language_info_title: "Support Multi-langues",
        available_languages: "Langues Disponibles",
        languages_description: "L'application est disponible en 5 langues: Portugais, Anglais, Espagnol, Français et Allemand. Sélectionnez votre langue préférée dans le menu ci-dessus.",
        nav_home: "Accueil",
        nav_foods: "Aliments",
        nav_tips: "Conseils",
        nav_chat: "Chat",
        nav_profile: "Profil",
        feature_coming_soon: "Fonctionnalité bientôt disponible!",
        language_changed: "Langue changée avec succès!"
    },
    de: {
        page_title: "NutriBot - Diät-Assistent",
        app_name: "NutriBot",
        welcome_title: "Willkommen bei NutriBot",
        about_title: "Über die App",
        about_description: "Ihr persönlicher Ernährungsassistent mit mehrsprachiger Unterstützung. Erhalten Sie personalisierte Essenspläne, berechnen Sie Ihren BMI und erhalten Sie Gesundheitstipps.",
        stat_recipes: "Rezepte",
        stat_users: "Benutzer",
        stat_languages: "Sprachen",
        stat_rating: "Bewertung",
        quick_actions: "Schnellaktionen",
        btn_create_diet: "Essensplan Erstellen",
        btn_calculate_imc: "BMI Berechnen",
        btn_tips: "Gesundheitstipps Ansehen",
        language_info_title: "Mehrsprachige Unterstützung",
        available_languages: "Verfügbare Sprachen",
        languages_description: "Die App ist in 5 Sprachen verfügbar: Portugiesisch, Englisch, Spanisch, Französisch und Deutsch. Wählen Sie Ihre bevorzugte Sprache im Menü oben.",
        nav_home: "Startseite",
        nav_foods: "Lebensmittel",
        nav_tips: "Tipps",
        nav_chat: "Chat",
        nav_profile: "Profil",
        feature_coming_soon: "Funktion kommt bald!",
        language_changed: "Sprache erfolgreich geändert!"
    }
};

// ========== INFORMAÇÕES DOS IDIOMAS ==========
const languageNames = {
    pt: { name: "Português", flag: "🇧🇷" },
    en: { name: "English", flag: "🇺🇸" },
    es: { name: "Español", flag: "🇪🇸" },
    fr: { name: "Français", flag: "🇫🇷" },
    de: { name: "Deutsch", flag: "🇩🇪" }
};

// ========== VARIÁVEL GLOBAL DO IDIOMA ATUAL ==========
let currentLanguage = localStorage.getItem('language') || 'pt';

// ========== INICIALIZAÇÃO ==========
window.addEventListener('DOMContentLoaded', () => {
    applyLanguage(currentLanguage);
});

// ========== FUNÇÃO PARA ALTERNAR DROPDOWN ==========
function toggleLanguageDropdown() {
    const dropdown = document.getElementById('languageDropdown');
    dropdown.classList.toggle('active');
}

// ========== FUNÇÃO PARA MUDAR IDIOMA ==========
function changeLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    applyLanguage(lang);
    toggleLanguageDropdown();
    showNotification('language_changed');
}

// ========== FUNÇÃO PARA APLICAR IDIOMA ==========
function applyLanguage(lang) {
    const langData = translations[lang];
    
    // Atualizar todos os elementos com data-i18n
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (langData[key]) {
            element.textContent = langData[key];
        }
    });

    // Atualizar título da página
    document.title = langData.page_title;

    // Atualizar seletor de idioma
    const langInfo = languageNames[lang];
    document.getElementById('currentFlag').textContent = langInfo.flag;
    document.getElementById('currentLang').textContent = langInfo.name;

    // Atualizar atributo lang do HTML
    document.documentElement.lang = lang;

    // Atualizar opções ativas no dropdown
    document.querySelectorAll('.language-option').forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-lang') === lang) {
            option.classList.add('active');
        }
    });
}

// ========== FUNÇÃO PARA MOSTRAR NOTIFICAÇÃO ==========
function showNotification(messageKey) {
    const notification = document.getElementById('notification');
    const message = translations[currentLanguage][messageKey];
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// ========== FECHAR DROPDOWN AO CLICAR FORA ==========
document.addEventListener('click', function(event) {
    const selector = document.querySelector('.language-selector');
    if (!selector.contains(event.target)) {
        document.getElementById('languageDropdown').classList.remove('active');
    }
});

// ========== FUNÇÃO AUXILIAR PARA OBTER TRADUÇÃO ==========
// Use esta função em outras partes do código para obter traduções
function getTranslation(key) {
    return translations[currentLanguage][key] || key;
}

// ========== EXPORTAR PARA USO EM OUTROS SCRIPTS ==========
// Se você precisar usar o sistema de idiomas em outros arquivos JS:
window.i18n = {
    currentLanguage: () => currentLanguage,
    translate: getTranslation,
    changeLanguage: changeLanguage,
    translations: translations
};