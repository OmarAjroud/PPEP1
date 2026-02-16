import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent }, // Public
    { path: 'inscription', loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent) }, // Public (Registration)

    // Protected Routes
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
    { path: 'choixoffre', loadComponent: () => import('./pages/offer-search/offer-search.component').then(m => m.OfferSearchComponent), canActivate: [authGuard] },
    { path: 'offre', loadComponent: () => import('./pages/my-applications/my-applications.component').then(m => m.MyApplicationsComponent), canActivate: [authGuard] },
    { path: 'details', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), canActivate: [authGuard] }
];
