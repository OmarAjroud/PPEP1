import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserStore {
    // State Signals
    readonly token = signal<string | null>(localStorage.getItem('usertoken'));
    readonly user = signal<any | null>(null); // Replace 'any' with ProfileModel when linked

    // Computed Signals
    readonly isAuthenticated = computed(() => !!this.token());

    constructor() {
        // Effect to auto-save token changes to LocalStorage
        effect(() => {
            const currentToken = this.token();
            if (currentToken) {
                localStorage.setItem('usertoken', currentToken);
            } else {
                localStorage.removeItem('usertoken');
            }
        });
    }

    // Actions
    setToken(token: string) {
        this.token.set(token);
    }

    setUser(user: any) {
        this.user.set(user);
    }

    logout() {
        this.token.set(null);
        this.user.set(null);
        localStorage.clear();
        // window.location.reload(); // Legacy app did this, but in Angular we should router.navigate(['/login'])
    }
}
