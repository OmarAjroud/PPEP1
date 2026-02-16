import { Injectable, signal, computed, effect, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ProfileModel } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class UserStore {
    private platformId = inject(PLATFORM_ID);

    // State Signals
    // Initialize token only if in browser
    readonly token = signal<string | null>(
        isPlatformBrowser(this.platformId) ? localStorage.getItem('usertoken') : null
    );

    readonly user = signal<ProfileModel | null>(null);

    // Computed Signals
    readonly isAuthenticated = computed(() => !!this.token());

    constructor() {
        // Effect to auto-save token changes to LocalStorage
        effect(() => {
            if (isPlatformBrowser(this.platformId)) {
                const currentToken = this.token();
                if (currentToken) {
                    localStorage.setItem('usertoken', currentToken);
                } else {
                    localStorage.removeItem('usertoken');
                }
            }
        });
    }

    // Actions
    setToken(token: string) {
        this.token.set(token);
    }

    setUser(user: ProfileModel) {
        this.user.set(user);
    }

    logout() {
        this.token.set(null);
        this.user.set(null);
        if (isPlatformBrowser(this.platformId)) {
            localStorage.clear();
        }
    }
}
