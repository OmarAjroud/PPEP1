import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { HttpUtilsService } from '../sevices/http-utils.service';
import { environment } from '../environments/environment';
import { UtilsService } from '../sevices/utils.service';
import { ProfileModel } from '../logic/Profile.model';


@Injectable({
	providedIn: 'root'
})
export class RegistrationService {

	constructor(private http: HttpClient,
		private httpUtilsService: HttpUtilsService,
		private util: UtilsService) {
	}
	rootUrl = "http://inscription.atfp.tn:8080";

	/**
	 * @todo use this method as post
	 * @param profileValues
	 */
	registrate(profileValues: ProfileModel): Observable<any> {
		const profile = JSON.parse(JSON.stringify(profileValues));
		profile.credential.livreeLe = new DatePipe('en-US').transform(profile.credential.livreeLe, 'yyyy-MM-dd');
		profile.donnee.DateNaissance = new DatePipe('en-US').transform(profile.donnee.DateNaissance, 'yyyy-MM-dd') + ' 00:00:00';
		profile.extrait.ExtraitDeNaissance = profileValues.extrait.ExtraitDeNaissance;

		let profileForm = this.httpUtilsService.getProfileDataForm(profile);
		return this.http
			.post<any>(this.rootUrl + '/public/candidate/inscription', profileForm)
			.pipe(
				catchError(this.util.handleError('register', false))
			);
	}

	checkEmail(email: string): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/candidate/CheckMail/' + email)
			.pipe(
				catchError(this.util.handleError('checkEmail', false))
			);
	}

	checkNumInscription(numInscription: string, Municipalite: string, Annee: number): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/candidate/CheckNumInscription/' + numInscription)
			.pipe(
				catchError(this.util.handleError('checkNumInscription', false))
			);
	}

	getGouvernorats(): Observable<any> {
		return this.http.get<any>(
			this.rootUrl + '/public/gouvernorats'
		).pipe(
			catchError(this.util.handleError('getGouvernorats', false))
		);
	}

	getDelegationByGouvernoratId(id: any): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/delegations/' + id)
			.pipe(
				catchError(this.util.handleError('getDelegationByGouvernoratId', false))
			);
	}

	getMunicipaliteByGouvernoratId(id: any): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/municipalites/gouvernorat/' + id)
			.pipe(
				catchError(this.util.handleError('getMunicipaliteByGouvernoratId', false))
			);
	}

	getMunicipaliteByDelegationId(id: any): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/municipalites/' + id)
			.pipe(
				catchError(this.util.handleError('getMunicipaliteByDelegationId', false))
			);
	}

	getAllNiveauxScolaire(): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/niveaux');
	}

	getAllSpecialites(): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/specialiteScolaire')
			.pipe(
				catchError(this.util.handleError('getAllSpecialites', false))
			);
	}

	getAllSpecialitesAncienneFormation(): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/specialites')
			.pipe(
				catchError(this.util.handleError('getAllSpecialitesAncienneFormation', false))
			);
	}

	getAllSpecialitesAncienneFormationByDiplome(id): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/specialites/diplome/' + id)
			.pipe(
				catchError(this.util.handleError('getAllSpecialitesAncienneFormation', false))
			);
	}

	getAllCentres(): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/centres')
			.pipe(
				catchError(this.util.handleError('getAllCentres', false))
			);
	}
	getAllCentresBySpecialite(id): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/centres/specialite/' + id)
			.pipe(
				catchError(this.util.handleError('getAllCentres', false))
			);
	}

	getAllDeplomes(): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/diplomes')
			.pipe(
				catchError(this.util.handleError('getAllDeplomes', false))
			);
	}

	getAllDeplomesFomation(): Observable<any> {
		return this.http.get<any>(this.rootUrl + '/public/diplomesFormation')
			.pipe(
				catchError(this.util.handleError('getAllDeplomesFomation', false))
			);
	}

	checkIdentifiant(a, b, c): Observable<any> {
		return this.http.get(this.rootUrl + '/public/candidate/CheckIdentifiant/' + a + '/' + b + '/' + c)
	}
}
