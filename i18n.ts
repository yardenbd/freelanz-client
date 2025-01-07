import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Import translation files
import he from "./locales/he.json";

// Initialize i18next
i18n.use(initReactI18next) // Integrates i18n with React
    .init({
        compatibilityJSON: "v4", // Ensure compatibility with older JSON files
        resources: {
            he: { translation: he },
        },
        lng: Localization.locale.split("-")[0], // Detect device language
        fallbackLng: "he", // Default language if device language is not available
        interpolation: {
            escapeValue: false, // React already protects against XSS
        },
    });

export default i18n;
