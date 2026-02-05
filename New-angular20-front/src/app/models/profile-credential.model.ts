export class ProfileCredentialModel {
    nom: string;
    nomAr: string;
    prenom: string;
    prenomAr: string;
    email: string;
    plainPassword = new PasswordModel();
    cin?: string;
    deliveredAt: string;
    deplome: string;
    speciality: string;
    etablisment: string;
    etablismenttype: string;
    livreeLe?: string;
}

export class PasswordModel {
    first: string;
    second: string;
}
