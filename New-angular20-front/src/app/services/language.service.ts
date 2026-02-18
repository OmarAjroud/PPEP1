import { Injectable, signal, computed, effect } from '@angular/core';
import { ALL_TRANSLATIONS } from '../i18n/translations';

export type Language = 'ar' | 'fr';

@Injectable({
    providedIn: 'root'
})
export class LanguageService {
    // State
    currentLang = signal<Language>('ar');

    // Computed Translation Dictionary
    t = computed(() => ALL_TRANSLATIONS[this.currentLang()]);

    // Computed Direction
    dir = computed(() => this.currentLang() === 'ar' ? 'rtl' : 'ltr');

    constructor() {
        // Load from storage
        const stored = localStorage.getItem('atfp_lang') as Language;
        if (stored && (stored === 'ar' || stored === 'fr')) {
            this.currentLang.set(stored);
        }

        // Persist to storage & Update DOM
        effect(() => {
            const lang = this.currentLang();
            localStorage.setItem('atfp_lang', lang);
            document.documentElement.lang = lang;
            document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        });
    }

    toggleLanguage() {
        this.currentLang.update(l => l === 'ar' ? 'fr' : 'ar');
    }

    setLanguage(lang: Language) {
        this.currentLang.set(lang);
    }
}
