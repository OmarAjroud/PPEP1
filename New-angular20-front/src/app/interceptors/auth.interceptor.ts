import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStore } from '../stores/user.store';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const userStore = inject(UserStore);
    const router = inject(Router);
    const token = userStore.token();

    let requestToHandle = req;

    if (token) {
        requestToHandle = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    return next(requestToHandle).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                // Token expired or invalid
                userStore.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
