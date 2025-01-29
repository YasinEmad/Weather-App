    // src/i18n.js
    import i18n from 'i18next';
    import { initReactI18next } from 'react-i18next';

    const resources = {
    en: {
        translation: {
        welcome: "Welcome to the Weather App!",
        date: "Date",
        city: "Cairo, Egypt",
        temperature: "Temperature",
        min: "Min",
        max: "Max",
        languageButton: "English",
        },
    },
    ar: {
        translation: {
        welcome: "مرحبا بكم في تطبيق الطقس!",
        date: "تاريخ",
        city: "القاهرة، مصر",
        temperature: "درجة الحرارة",
        min: "الحد الأدنى",
        max: "الحد الأقصى",
        languageButton: "العربية",
        },
    },
    };

    i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: "en", // Default language
        fallbackLng: "en",
        interpolation: {
        escapeValue: false,
        },
    });

    export default i18n;
