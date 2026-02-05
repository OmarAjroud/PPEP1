import {DiplomeModel} from './diplome.model';

export class SpecialityModel {
	id: number;
	code: number;
	libelle_Ar: string;
	libelle_Fr: string;
	libelle_En: string;
	bourse: boolean;
	diplome: DiplomeModel;

	constructor(public libel_Ar: string) {
		this.libelle_Ar = libel_Ar;
	}
}
