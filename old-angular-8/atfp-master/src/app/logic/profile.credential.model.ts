export class ProfileCredentialModel {
	nom: string;
	nomAr: string;
	prenom: string;
	prenomAr: string;
	email: string;
	plainPassword = new PasswordModel();
	cin: string = null;
	deliveredAt: string;
	deplome: string;
	speciality: string;
	etablisment: string;
	etablismenttype: string;
	livreeLe: string = null;
}


class PasswordModel {
	first: string;
	second: string;
}
