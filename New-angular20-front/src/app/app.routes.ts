import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'inscription', loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent) },
    { path: 'choixoffre', loadComponent: () => import('./pages/offer-search/offer-search.component').then(m => m.OfferSearchComponent) },
    { path: 'offre', loadComponent: () => import('./pages/my-applications/my-applications.component').then(m => m.MyApplicationsComponent) },
    { path: 'details', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent) }
];
