import { ProfileCredentialModel } from './profile-credential.model';
import { ProfileExtraitModel } from './profile-extrait.model';
import { ProfileDonneeModel } from './profile-donnee.model';
import { ProfileFormationModel } from './profile-formation.model';
import { ProfileAncienneFormation } from './profile-ancienne-formation.model';

export class ProfileModel {
    credential: ProfileCredentialModel;
    extrait: ProfileExtraitModel;
    donnee: ProfileDonneeModel;
    formation: ProfileFormationModel;
    ancienneFormation: ProfileAncienneFormation;

    constructor() {
        this.credential = new ProfileCredentialModel();
        this.extrait = new ProfileExtraitModel();
        this.donnee = new ProfileDonneeModel();
        this.formation = new ProfileFormationModel();
        this.ancienneFormation = new ProfileAncienneFormation();
    }
}
