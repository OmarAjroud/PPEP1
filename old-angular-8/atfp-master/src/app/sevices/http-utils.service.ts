import { Injectable } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { ProfileModel } from '../logic/Profile.model';


@Injectable()
export class HttpUtilsService {

	constructor() {
	}
	getProfileDataForm(profile: ProfileModel): FormData {
		let profileForm = new FormData();
		if (profile.credential.nom)
			profileForm.append('profile[credential][nom]', profile.credential.nom);
		if (profile.credential.nomAr)
			profileForm.append('profile[credential][nomAr]', profile.credential.nomAr);
		if (profile.credential.prenom)
			profileForm.append('profile[credential][prenom]', profile.credential.prenom);
		if (profile.credential.prenomAr)
			profileForm.append('profile[credential][prenomAr]', profile.credential.prenomAr);
		profileForm.append('profile[credential][email]', profile.credential.email);
		if (profile.credential.cin) {
			profileForm.append('profile[credential][cin]', profile.credential.cin);
			profileForm.append('profile[credential][livreeLe]', profile.credential.livreeLe); // TODO: Add this in the HTLML TEMPLATE
		}
		profileForm.append('profile[credential][plainPassword][first]', profile.credential.plainPassword.first);
		profileForm.append('profile[credential][plainPassword][second]', profile.credential.plainPassword.second);

		// Extrait

		profileForm.append('profile[extrait][Annee]', (profile.extrait.Annee || '').toString());
		profileForm.append('profile[extrait][NumInscription]', (profile.extrait.NumInscription || '').toString());
		profileForm.append('profile[extrait][Municipalite]', profile.extrait.Municipalite);
		profileForm.append('profile[extrait][ExtraitDeNaissance]', profile.extrait.ExtraitDeNaissance);
		// donne

		profileForm.append('profile[donnee][Genre]', profile.donnee.Genre);
		profileForm.append('profile[donnee][Adresse]', profile.donnee.Adresse);
		if (profile.donnee.TelFixe)
			profileForm.append('profile[donnee][TelFixe]', profile.donnee.TelFixe);
		profileForm.append('profile[donnee][TelMobile]', (profile.donnee.TelMobile || '').toString());
		profileForm.append('profile[donnee][Delegation]', profile.donnee.Delegation);
		profileForm.append('profile[donnee][DateNaissance]', profile.donnee.DateNaissance);
		profileForm.append('profile[donnee][CodePostal]', (profile.donnee.CodePostal || '').toString());
		profileForm.append('profile[donnee][Diplome]', (profile.donnee.deplome || '').toString());
		// formation

		profileForm.append('profile[formation][Etablissement]', profile.formation.Etablissement);
		profileForm.append('profile[formation][TypeEtablissement]', profile.formation.TypeEtablissement);
		profileForm.append('profile[formation][AnneeAbandonScolaire]', profile.formation.AnneeAbandonScolaire);
		profileForm.append('profile[formation][NiveauScolaire]', profile.formation.NiveauScolaire);
		profileForm.append('profile[formation][Diplome]', (profile.formation.deplome || '').toString());
		if (profile.formation.speciality)
			profileForm.append('profile[formation][Specialite]', (profile.formation.speciality || '').toString());

		//Ancienne formation
		if (
			profile.ancienneFormation.diplome &&
			profile.ancienneFormation.Specialite &&
			profile.ancienneFormation.Centre &&
			profile.ancienneFormation.anneeFin) {

			profileForm.append('profile[ancienneFormation][Specialite]', (profile.ancienneFormation.Specialite || '').toString());
			profileForm.append('profile[ancienneFormation][Diplome]', (profile.ancienneFormation.diplome || '').toString());
			profileForm.append('profile[ancienneFormation][Centre]', (profile.ancienneFormation.Centre || '').toString());
			profileForm.append('profile[ancienneFormation][anneeFin]', (profile.ancienneFormation.anneeFin || '').toString());

		}

		return profileForm;
	}
}
