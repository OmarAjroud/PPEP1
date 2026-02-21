import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileModel } from '../models/profile.model';
import { OffreModel } from '../models/offre.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private platformId = inject(PLATFORM_ID);
    private apiUrl = environment.apiUrl;

    // --- STATE MANAGEMENT (single source of truth) ---
    readonly token = signal<string | null>(
        isPlatformBrowser(this.platformId) ? localStorage.getItem('auth_token') : null
    );
    readonly currentUser = signal<ProfileModel | null>(null);
    readonly isAuthenticated = computed(() => !!this.token());
    readonly isAdmin = computed(() => this.currentUser()?.roles?.includes('ROLE_ADMIN') ?? false);

    constructor() {
        // On page reload: if a token exists, try to restore the user profile.
        // Use setTimeout to defer HTTP call until after DI bootstrap completes,
        // avoiding circular dependency with authInterceptor (which injects ApiService).
        if (this.token()) {
            setTimeout(() => {
                this.getUserProfile().subscribe({
                    next: (profile) => this.currentUser.set(profile),
                    error: (err: HttpErrorResponse) => {
                        if (err.status === 401) {
                            this.logout();
                        }
                        // For network errors (status 0), 5xx etc: keep the token
                    }
                });
            }, 0);
        }
    }

    // 1. Login
    login(credentials: { username: string, password: string }): Observable<{ token: string }> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post<{ token: string }>(`${this.apiUrl}/api/login_check`, JSON.stringify(credentials), { headers }).pipe(
            tap((response) => {
                if (response.token) {
                    this.setToken(response.token);
                    this.getUserProfile().subscribe(profile => this.currentUser.set(profile));
                }
            })
        );
    }

    setToken(token: string) {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('auth_token', token);
        }
        this.token.set(token);
    }

    logout() {
        if (isPlatformBrowser(this.platformId)) {
            localStorage.removeItem('auth_token');
        }
        this.token.set(null);
        this.currentUser.set(null);
    }

    // 2. Get User Profile
    getUserProfile(): Observable<ProfileModel> {
        return this.http.get<ProfileModel>(`${this.apiUrl}/api/candidate/profile`);
    }

    // 3. Update Personal Info (FormData)
    updatePersonalInfo(tel: string, adresse: string, codepostal: string): Observable<any> {
        const formData = new FormData();
        formData.append('donnee_personnelle[TelMobile]', tel);
        formData.append('donnee_personnelle[CodePostal]', codepostal);
        formData.append('donnee_personnelle[Adresse]', adresse);
        return this.http.post(`${this.apiUrl}/api/profile/updateDonneepersonnel`, formData);
    }

    // 4. Update Email
    updateEmail(email: string): Observable<any> {
        const formData = new FormData();
        formData.append('Cridential[email]', email); // Note: 'Cridential' typo preserved from legacy API
        return this.http.post(`${this.apiUrl}/api/profile/updateCredential`, formData);
    }

    // 5. Get Notifications
    getNotifications(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/notifications`);
    }

    // 6. Get History (Historique)
    getApplicationHistory(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/candidate/candidatures/historique`);
    }

    // 7. Get Governorates (Public)
    getGovernorates(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/gouvernorats`);
    }

    // 8. Search Offers
    searchOffers(specialite?: string, centre?: string, keyword?: string, start: number = 0, length: number = 10): Observable<OffreModel[]> {
        let params = new HttpParams()
            .set('start', start)
            .set('length', length);

        if (specialite) params = params.set('specialite_refIn', specialite);
        if (centre) params = params.set('centre_refIn', centre);
        if (keyword) params = params.set('lowerOffre', keyword);

        return this.http.post<OffreModel[]>(`${this.apiUrl}/api/offres`, null, { params });
    }

    // 9. Create Candidature (Apply)
    applyToOffer(offerId: string): Observable<any> {
        const formData = new FormData();
        formData.append('candidature[offre]', offerId);

        const params = new HttpParams().set('candidature[offre]', offerId);

        return this.http.post(`${this.apiUrl}/api/candidate/candidature/create`, formData, {
            params: params
        });
    }

    // 10. Confirm Drafts (Validate Many)
    validateDrafts(candidatureObj: { candidatures: string[] }): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/candidate/candidature/validateMany`, JSON.stringify(candidatureObj));
    }

    // 11. Delete Draft
    deleteDraft(offerId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/candidate/candidature/offre/${offerId}`);
    }

    // --- REGISTRATION / INSCRIPTION ENDPOINTS ---

    checkEmail(email: string): Observable<{ exist: boolean }> {
        return this.http.get<{ exist: boolean }>(`${this.apiUrl}/public/candidate/CheckMail/${email}`);
    }

    checkNumInscription(numInscription: string, municipalite: string, annee: number): Observable<{ exist: boolean }> {
        return this.http.get<{ exist: boolean }>(`${this.apiUrl}/public/candidate/CheckNumInscription/${numInscription}`);
    }

    checkIdentifiant(annee: number, numInscription: number, municipalite: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/candidate/CheckIdentifiant/${annee}/${numInscription}/${municipalite}`);
    }

    getDelegations(govId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/delegations/${govId}`);
    }

    getMunicipalitiesByGov(govId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/municipalites/gouvernorat/${govId}`);
    }

    getMunicipalitiesByDel(delId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/municipalites/${delId}`);
    }

    getAllNiveauxScolaire(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/niveaux`);
    }

    getAllSpecialites(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/specialiteScolaire`);
    }

    getAllSpecialitesAncienneFormation(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/specialites`);
    }

    getAllSpecialitesAncienneFormationByDiplome(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/specialites/diplome/${id}`);
    }

    getAllCentres(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/centres`);
    }

    getAllCentresBySpecialite(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/centres/specialite/${id}`);
    }

    getAllDiplomes(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/diplomes`);
    }

    getAllDiplomesFormation(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/diplomesFormation`);
    }

    registerCandidate(profile: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/public/candidate/inscription`, profile);
    }

    // --- ADMIN API METHODS ---

    getAdminStats(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/admin/stats`);
    }

    getAdminCandidatures(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/admin/candidatures`);
    }

    acceptCandidature(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/api/admin/candidature/${id}/accept`, {});
    }

    rejectCandidature(id: number): Observable<any> {
        return this.http.put(`${this.apiUrl}/api/admin/candidature/${id}/reject`, {});
    }

    deleteCandidature(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/admin/candidature/${id}`);
    }

    getAdminOffres(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/admin/offres`);
    }

    createOffre(data: any): Observable<any> {
        return this.http.post(`${this.apiUrl}/api/admin/offre`, data);
    }

    updateOffre(id: number, data: any): Observable<any> {
        return this.http.put(`${this.apiUrl}/api/admin/offre/${id}`, data);
    }

    deleteOffre(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/admin/offre/${id}`);
    }

    getAdminUsers(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrl}/api/admin/users`);
    }

    deleteUser(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/admin/user/${id}`);
    }
}
