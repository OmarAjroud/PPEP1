import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { adminGuard } from './guards/admin.guard';



export const routes: Routes = [
    { path: '', redirectTo: 'landing', pathMatch: 'full' },
    { path: 'landing', loadComponent: () => import('./pages/landing-page/landing-page.component').then(m => m.LandingPageComponent) }, // Public Landing
    { path: 'login', loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) }, // Public
    { path: 'inscription', loadComponent: () => import('./pages/registration/registration.component').then(m => m.RegistrationComponent) }, // Public (Registration)
    { path: 'about', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },

    // Protected Routes
    { path: 'home', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent), canActivate: [authGuard] },
    { path: 'dashboard', loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard] },
    { path: 'search', loadComponent: () => import('./pages/offer-search/offer-search.component').then(m => m.OfferSearchComponent), canActivate: [authGuard] },
    { path: 'offre', loadComponent: () => import('./pages/my-applications/my-applications.component').then(m => m.MyApplicationsComponent), canActivate: [authGuard] },
    { path: 'details', loadComponent: () => import('./pages/details/details.component').then(m => m.DetailsComponent), canActivate: [authGuard] },

    // Admin Routes
    { path: 'admin', loadComponent: () => import('./pages/admin/admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent), canActivate: [adminGuard] },
    { path: 'admin/candidatures', loadComponent: () => import('./pages/admin/admin-candidatures/admin-candidatures.component').then(m => m.AdminCandidaturesComponent), canActivate: [adminGuard] },
    { path: 'admin/offres', loadComponent: () => import('./pages/admin/admin-offres/admin-offres.component').then(m => m.AdminOffresComponent), canActivate: [adminGuard] },
    { path: 'admin/users', loadComponent: () => import('./pages/admin/admin-users/admin-users.component').then(m => m.AdminUsersComponent), canActivate: [adminGuard] },

    // Catch-all — redirect unknown paths to landing
    { path: '**', redirectTo: 'landing' }
];

