import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (authService.isAuthenticated()) {
        console.log('AuthGuard: Authenticated (True)');
        return true;
    } else {
        console.log('AuthGuard: Not Authenticated (False) - Redirecting to Login');
        router.navigate(['/login']);
        return false;
    }
};
