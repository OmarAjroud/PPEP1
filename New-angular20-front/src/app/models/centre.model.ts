export class CentreModel {
    id: number;
    code: number;
    libelle_Ar: string;
    libelle_Fr: string;
    libelle_En: string;
    adresse: string;

    constructor(libelle_Ar: string) {
        this.libelle_Ar = libelle_Ar;
    }
}
