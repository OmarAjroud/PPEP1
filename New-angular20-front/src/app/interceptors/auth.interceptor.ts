import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const api = inject(ApiService);
    const router = inject(Router);

    const token = api.token();

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
                api.logout();
                router.navigate(['/login']);
            }
            return throwError(() => error);
        })
    );
};
