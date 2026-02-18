import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { UserStore } from '../stores/user.store';
import { Observable, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = inject(ApiService);
    private userStore = inject(UserStore);
    private router = inject(Router);

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.api.login(credentials).pipe(
            tap((response) => {
                if (response.token) {
                    this.userStore.setToken(response.token);
                }
            })
        );
    }

    logout() {
        this.userStore.logout();
        this.api.logout();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return this.userStore.isAuthenticated();
    }
}
