import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private api = inject(ApiService);
    private router = inject(Router);

    login(credentials: { username: string; password: string }): Observable<any> {
        return this.api.login(credentials);
    }

    logout() {
        this.api.logout();
        this.router.navigate(['/login']);
    }

    isAuthenticated(): boolean {
        return this.api.isAuthenticated();
    }
}
