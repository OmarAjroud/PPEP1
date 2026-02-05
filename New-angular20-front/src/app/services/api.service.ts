import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { ProfileModel } from '../models/profile.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private apiUrl = environment.apiUrl;

    // Helper to get headers (Legacy app used localStorage)
    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('usertoken');
        let headers = new HttpHeaders();
        if (token) {
            headers = headers.set('Authorization', 'Bearer ' + token);
        }
        return headers;
    }

    // 1. Login
    login(credentials: { username: string, password: string }): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
        return this.http.post(`${this.apiUrl}/api/login_check`, JSON.stringify(credentials), { headers });
    }

    // 2. Get User Profile
    getUserProfile(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/candidate/profile`, { headers: this.getHeaders() });
    }

    // 3. Update Personal Info (FormData)
    updatePersonalInfo(tel: string, adresse: string, codepostal: string): Observable<any> {
        const formData = new FormData();
        formData.append('donnee_personnelle[TelMobile]', tel);
        formData.append('donnee_personnelle[CodePostal]', codepostal);
        formData.append('donnee_personnelle[Adresse]', adresse);
        return this.http.post(`${this.apiUrl}/api/profile/updateDonneepersonnel`, formData, { headers: this.getHeaders() });
    }

    // 4. Update Email
    updateEmail(email: string): Observable<any> {
        const formData = new FormData();
        formData.append('Cridential[email]', email); // Note: 'Cridential' typo preserved from legacy code API
        return this.http.post(`${this.apiUrl}/api/profile/updateCredential`, formData, { headers: this.getHeaders() });
    }

    // 5. Get Notifications
    getNotifications(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/notifications`, { headers: this.getHeaders() });
    }

    // 6. Get History (Historique)
    getApplicationHistory(): Observable<any> {
        return this.http.get(`${this.apiUrl}/api/candidate/candidatures/historique`, { headers: this.getHeaders() });
    }

    // 7. Get Governorates (Public)
    // Note: Legacy code used empty headers for this, verifying if it needs auth. URL is /public so probably not.
    getGovernorates(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/gouvernorats`);
    }

    // 8. Search Offers
    searchOffers(specialite?: string, centre?: string, keyword?: string, start: number = 0, length: number = 10): Observable<any> {
        let params = new HttpParams()
            .set('start', start)
            .set('length', length);

        if (specialite) params = params.set('specialite_refIn', specialite);
        if (centre) params = params.set('centre_refIn', centre);
        if (keyword) params = params.set('lowerOffre', keyword);

        return this.http.post(`${this.apiUrl}/api/offres`, null, { headers: this.getHeaders(), params });
    }

    // 9. Create Candidature (Apply)
    applyToOffer(offerId: string): Observable<any> {
        const formData = new FormData();
        formData.append('candidature[offre]', offerId);

        const params = new HttpParams().set('candidature[offre]', offerId);

        return this.http.post(`${this.apiUrl}/api/candidate/candidature/create`, formData, {
            headers: this.getHeaders(),
            params: params
        });
    }

    // 10. Confirm Drafts (Validate Many)
    validateDrafts(candidatureObj: any): Observable<any> {
        // Legacy sends { candidatures: [id1, id2] } wrapped in 'Candidature' object structure
        return this.http.post(`${this.apiUrl}/api/candidate/candidature/validateMany`, JSON.stringify(candidatureObj), { headers: this.getHeaders() });
    }

    // 11. Delete Draft
    deleteDraft(offerId: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/api/candidate/candidature/offre/${offerId}`, { headers: this.getHeaders() });
    }

    // --- REGISTRATION / INSCRIPTION ENDPOINTS ---

    // Check Email Availability
    checkEmail(email: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/candidate/CheckMail/${email}`);
    }

    // Check Inscription Number
    checkNumInscription(numInscription: string, municipalite: string, annee: number): Observable<any> {
        // Note: Legacy service had conflicting methods 'checkNumInscription' and 'checkIdentifiant'
        return this.http.get(`${this.apiUrl}/public/candidate/CheckNumInscription/${numInscription}`);
    }

    // Check Full Identity (Year, Num, Municipality)
    checkIdentifiant(annee: number, numInscription: number, municipalite: any): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/candidate/CheckIdentifiant/${annee}/${numInscription}/${municipalite}`);
    }

    // Get Delegations by Gov ID
    getDelegations(govId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/delegations/${govId}`);
    }

    // Get Municipalities by Gov ID
    getMunicipalitiesByGov(govId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/municipalites/gouvernorat/${govId}`);
    }

    // Get Municipalities by Delegation ID
    getMunicipalitiesByDel(delId: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/municipalites/${delId}`);
    }

    // Get All Education Levels
    getAllNiveauxScolaire(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/niveaux`);
    }

    // Get All School Specialities
    getAllSpecialites(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/specialiteScolaire`);
    }

    // Get All Ancient Specialities
    getAllSpecialitesAncienneFormation(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/specialites`);
    }

    // Get All Ancient Specialities by Diplome
    getAllSpecialitesAncienneFormationByDiplome(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/specialites/diplome/${id}`);
    }

    // Get All Centres
    getAllCentres(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/centres`);
    }

    // Get All Centres by Speciality
    getAllCentresBySpecialite(id: string): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/centres/specialite/${id}`);
    }

    // Get All Diplomes
    getAllDiplomes(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/diplomes`);
    }

    // Get All Diplomes Formation
    getAllDiplomesFormation(): Observable<any> {
        return this.http.get(`${this.apiUrl}/public/diplomesFormation`);
    }

    // Complete Registration
    registerCandidate(profile: any): Observable<any> {
        // Logic to transform dates (yyyy-MM-dd) should be handled in the component or a helper before calling this
        return this.http.post(`${this.apiUrl}/public/candidate/inscription`, profile); // profile must be FormData here? No, legacy code says FormData in 'registrate' method
    }
}
