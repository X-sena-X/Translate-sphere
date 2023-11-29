import { create } from "zustand";
import { Subscription } from "@/types/Subscription";

export type LanguageSupported =
    | "en"
    | "de"
    | "fr"
    | "es"
    | "hi"
    | "ja"
    | "la"
    | "ru"
    | "zh"
    | "ar";

export const LanguageSupportedmap: Record<LanguageSupported, string> = {
    en: "English",
    de: "German",

    fr: "French",
    es: "Spanish",
    hi: "Hindi",
    ja: "Japanese",
    la: "Latin",
    ru: "Russian",
    zh: "Mandarin",
    ar: "Arabic",
};

const LANGUAGES_IN_FREE = 2;

interface LanguageState {
    language: LanguageSupported;
    setLaguage: (language: LanguageSupported) => void;
    getLaguages: (isPro: boolean) => LanguageSupported[];
    getNotSupportedLanguages: (isPro: boolean) => LanguageSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
    language: "en",
    setLaguage: (language: LanguageSupported) => set({ language }),
    getLaguages: (isPro: boolean) => {
        // if the user is pro, return all supported languages
        if (isPro)
            return Object.keys(LanguageSupportedmap) as LanguageSupported[];
        // if not pro, return only the first two languages
        return Object.keys(LanguageSupportedmap).slice(
            0,
            LANGUAGES_IN_FREE
        ) as LanguageSupported[];
    },
    getNotSupportedLanguages: (isPro: boolean) => {
        // No unsupported languages for "pro" users.
        if (isPro) return [];
        // Excluding the first two supported languages
        return Object.keys(LanguageSupportedmap).slice(
            LANGUAGES_IN_FREE
        ) as LanguageSupported[];
    },
}));

interface SubscriptionState {
    subscription: Subscription | null | undefined;
    setSubscription: (subscription: Subscription | null) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
    subscription: undefined,
    setSubscription: (subscription: Subscription | null) =>
        set({ subscription }),
}));
