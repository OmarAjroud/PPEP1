import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CustomValidators } from '../../validators/custom.validators';
import { ProfileModel } from '../../models/profile.model';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-registration',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    private fb = inject(FormBuilder);
    private api = inject(ApiService);
    private router = inject(Router);
    lang = inject(LanguageService);

    // Stepper State
    currentStep = 1;
    isLoading = false;

    // Validation Flags
    isEmailAvailable = true;
    isBirthDetailsValid = true;
    birthDetailsErrorMsg = '';

    // Lists for Dropdowns
    years: number[] = [];
    govs: any[] = [];
    municipalities: any[] = [];
    municipalitiesBirth: any[] = [];
    delegations: any[] = [];
    niveaux: any[] = [];
    diplomes: any[] = [];
    specialites: any[] = [];
    formations: any[] = []; // Previous formations
    centres: any[] = [];

    // Main Form
    regForm = this.fb.group({
        // Step 1: Basic Info
        nomAr: ['', [Validators.required, CustomValidators.isArabic()]],
        prenomAr: ['', [Validators.required, CustomValidators.isArabic()]],
        cin: ['', [Validators.required, CustomValidators.isValidCin()]],
        livreeLe: ['', Validators.required], // Date Issued

        // Step 2: Birth Extract
        numInscription: ['', [Validators.required, CustomValidators.isNumeric()]], // "Numéro de dessin" / Birth Reg Num
        anneeNaissance: ['', Validators.required], // Birth Year
        govBread: ['', Validators.required], // Gov for Birth
        munBread: ['', Validators.required], // Municipality for Birth
        fileExtract: [null, Validators.required], // File

        // Step 3: Personal Info
        dateNaissance: ['', Validators.required],
        genre: ['male', Validators.required],
        adresse: ['', Validators.required],
        codePostal: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
        telFixe: ['', [Validators.pattern('^([0-9]{8})?$')]], // Optional — validate only if filled
        telMobile: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]],
        govAddress: ['', Validators.required],
        delAddress: ['', Validators.required], // Delegation
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],

        // Step 4: Education
        niveauScolaire: ['', Validators.required],
        diplome: [''],
        specialite: [''],
        etablissement: ['', Validators.required],
        typeEtablissement: ['public', Validators.required],
        anneeAbandon: ['', Validators.required],
        hasPreviousTraining: [false],

        // Step 5: Previous Training (Optional)
        prevDiplome: [''],
        prevSpecialite: [''],
        prevCentre: [''],
        prevAnneeFin: ['']
    }, { validators: this.passwordMatchValidator });

    ngOnInit() {
        this.initYears();
        this.loadInitialData();
    }

    // --- Initialization ---
    private initYears() {
        const currentYear = new Date().getFullYear();
        for (let i = currentYear; i >= currentYear - 60; i--) {
            this.years.push(i);
        }
    }

    private loadInitialData() {
        // Load Governorates
        this.api.getGovernorates().subscribe(data => this.govs = data);

        // Load Other Lists
        this.api.getAllNiveauxScolaire().subscribe(data => this.niveaux = data);
        this.api.getAllDiplomes().subscribe(data => this.diplomes = data);
        this.api.getAllSpecialites().subscribe(data => this.specialites = data);
        this.api.getAllDiplomesFormation().subscribe(data => this.formations = data); // Wait, verifying 'diplomesf' in legacy
    }

    // --- Dynamic Dropdowns ---

    onBirthGovChange() {
        const govId = this.regForm.get('govBread')?.value;
        if (govId) {
            this.api.getMunicipalitiesByGov(govId).subscribe(data => this.municipalitiesBirth = data);
        }
    }

    onAddressGovChange() {
        const govId = this.regForm.get('govAddress')?.value;
        if (govId) {
            this.api.getDelegations(govId).subscribe(data => this.delegations = data);
        }
    }

    onAddressDelegationChange() {
        // Legacy doesn't seem to load Mun for Address Step 3, just Gov/Del
        // But if needed we can load it.
    }

    onDiplomeChange() {
        const diplomeId = this.regForm.get('prevDiplome')?.value;
        if (diplomeId) {
            this.api.getAllSpecialitesAncienneFormationByDiplome(diplomeId).subscribe(data => {
                this.specialites = data; // Update specialites dropdown based on chosen diplome
                this.regForm.patchValue({ prevSpecialite: '' }); // Reset selection
                this.centres = []; // Also reset centres
            });
        }
    }

    onPrevSpecialityChange() {
        const specId = this.regForm.get('prevSpecialite')?.value;
        if (specId) {
            this.api.getAllCentresBySpecialite(specId).subscribe(data => this.centres = data);
        }
    }

    // --- File Handling ---
    onFileChange(event: any) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            // Max 2MB check
            if (file.size > 2 * 1024 * 1024) {
                alert('File too large (Max 2MB)');
                this.regForm.patchValue({ fileExtract: null });
            } else {
                this.regForm.patchValue({ fileExtract: file });
            }
        }
    }

    // --- Validators ---
    passwordMatchValidator(control: AbstractControl) {
        const password = control.get('password');
        const confirm = control.get('confirmPassword');
        if (!password || !confirm) return null;
        return password.value === confirm.value ? null : { mismatch: true };
    }

    // --- Backend Checks ---

    checkEmail() {
        const email = this.regForm.get('email')?.value;
        if (email && this.regForm.get('email')?.valid) {
            this.api.checkEmail(email).subscribe({
                next: (res) => {
                    // Logic from legacy: if data.exist is true, email is taken
                    if (res && res.exist) {
                        this.isEmailAvailable = false;
                        this.regForm.get('email')?.setErrors({ emailTaken: true });
                    } else {
                        this.isEmailAvailable = true;
                        // clear error if it was only emailTaken
                        if (this.regForm.get('email')?.hasError('emailTaken')) {
                            this.regForm.get('email')?.setErrors(null);
                        }
                    }
                },
                error: (err) => {
                    console.error('Error checking email', err);
                    // Optionally handle error (assume valid or block?)
                    // For now, let's assume valid but log error
                }
            });
        }
    }

    checkBirthDetails() {
        const num = this.regForm.get('numInscription')?.value;
        const annee = this.regForm.get('anneeNaissance')?.value;
        const mun = this.regForm.get('munBread')?.value;

        if (num && annee && mun) {
            this.api.checkIdentifiant(Number(annee), Number(num), mun).subscribe({
                next: (res) => {
                    // Logic from legacy: if data.exist is true, it means birth details ALREADY REGISTERED?
                    // Legacy: "checkIdentifiant... if(data.exist) { ... naissanceincorrecte = true ... }"
                    // So if exist -> ERROR (Already registered).
                    if (res && res.exist) {
                        this.isBirthDetailsValid = false;
                        this.birthDetailsErrorMsg = 'هذا المضمون مسجل مسبقاً (Déjà inscrit)';
                    } else {
                        this.isBirthDetailsValid = true;
                        this.birthDetailsErrorMsg = '';
                    }
                },
                error: (err) => {
                    console.error('Error checking birth details', err);
                }
            });
        }
    }

    // --- Navigation ---
    nextStep() {
        if (this.validateStep(this.currentStep)) {
            this.currentStep++;
        }
    }

    prevStep() {
        this.currentStep--;
    }

    validateStep(step: number): boolean {
        let fields: string[] = [];

        switch (step) {
            case 1:
                fields = ['nomAr', 'prenomAr', 'cin', 'livreeLe'];
                break;
            case 2:
                fields = ['numInscription', 'anneeNaissance', 'govBread', 'munBread', 'fileExtract'];
                // Extra check for birth details
                if (!this.isBirthDetailsValid) {
                    return false;
                }
                break;
            case 3:
                fields = ['dateNaissance', 'genre', 'adresse', 'codePostal', 'telFixe', 'telMobile', 'govAddress', 'delAddress', 'email', 'password', 'confirmPassword'];
                // Extra check for email
                if (!this.isEmailAvailable) {
                    return false;
                }
                break;
            case 4:
                fields = ['niveauScolaire', 'etablissement', 'typeEtablissement', 'anneeAbandon'];
                break;
            case 5:
                // Add fields here if validation is required for the last step
                break;
        }

        let isValid = true;
        for (const field of fields) {
            const control = this.regForm.get(field);
            if (control && control.invalid) {
                control.markAsTouched();
                isValid = false;
            }
        }

        // Trigger backend checks if step is valid but we haven't checked yet?
        // Better trigger checks on blur or change, but here we enforce.
        if (step === 2 && isValid) {
            // If we rely on stored flag, we assume user triggered change.
            // If manual check needed:
            // this.checkBirthDetails(); // This is async, might need to block nextStep or use Promise/Observable
            // For this MVP, we rely on the user triggering changes (added (change) in HTML)
        }

        return isValid;
    }

    // --- Submit ---
    onSubmit() {
        if (this.regForm.invalid) {
            this.regForm.markAllAsTouched();
            return;
        }

        // Final Validation Check (in case user skipped steps somehow)
        if (!this.isEmailAvailable || !this.isBirthDetailsValid) {
            alert('Veuillez vérifier les erreurs dans le formulaire (Email ou extrait de naissance).');
            return;
        }

        this.isLoading = true;

        // Map Form to ProfileModel
        const formVal = this.regForm.value;
        const profile = new ProfileModel();

        // 1. Credentials
        profile.credential.nomAr = formVal.nomAr!;
        profile.credential.prenomAr = formVal.prenomAr!;
        profile.credential.email = formVal.email!;
        profile.credential.cin = formVal.cin!;
        profile.credential.deliveredAt = formVal.livreeLe!;
        profile.credential.plainPassword.first = formVal.password!;
        profile.credential.plainPassword.second = formVal.confirmPassword!;

        // 2. Extrait
        profile.extrait.NumInscription = Number(formVal.numInscription);
        profile.extrait.Annee = Number(formVal.anneeNaissance);
        profile.extrait.Municipalite = formVal.munBread!;
        if (formVal.fileExtract) {
            profile.extrait.ExtraitDeNaissance = formVal.fileExtract;
        }

        // 3. Donnee (Personal Data)
        profile.donnee.Genre = formVal.genre!;
        profile.donnee.Adresse = formVal.adresse!;
        profile.donnee.CodePostal = Number(formVal.codePostal);
        profile.donnee.TelMobile = Number(formVal.telMobile);
        profile.donnee.TelFixe = formVal.telFixe!;
        profile.donnee.Gouvernorat = formVal.govAddress!;
        profile.donnee.Delegation = formVal.delAddress!;
        profile.donnee.DateNaissance = formVal.dateNaissance!;

        // 4. Formation (Education)
        profile.formation.NiveauScolaire = formVal.niveauScolaire!;
        profile.formation.Etablissement = formVal.etablissement!;
        profile.formation.TypeEtablissement = formVal.typeEtablissement!;
        profile.formation.AnneeAbandonScolaire = formVal.anneeAbandon!;
        profile.formation.speciality = formVal.specialite!;
        profile.formation.deplome = formVal.diplome!;

        // 5. Ancienne Formation
        if (formVal.hasPreviousTraining) {
            profile.ancienneFormation.diplome = Number(formVal.prevDiplome);
            profile.ancienneFormation.Specialite = Number(formVal.prevSpecialite);
            profile.ancienneFormation.Centre = Number(formVal.prevCentre);
            profile.ancienneFormation.anneeFin = Number(formVal.prevAnneeFin);
        }

        // Convert to FormData
        const formData = this.createFormData(profile);

        this.api.registerCandidate(formData).subscribe({
            next: (response) => {
                this.isLoading = false;
                alert('Inscription réussie ! Vous pouvez maintenant vous connecter.');
                this.router.navigate(['/login']);
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
                alert("Une erreur s'est produite lors de l'inscription.");
            }
        });
    }

    private createFormData(profile: ProfileModel): FormData {
        const formData = new FormData();

        // Credential
        formData.append('candidate[nomAr]', profile.credential.nomAr);
        formData.append('candidate[prenomAr]', profile.credential.prenomAr);
        formData.append('candidate[email]', profile.credential.email);
        formData.append('candidate[cin]', profile.credential.cin || '');
        formData.append('candidate[livreeLe]', profile.credential.deliveredAt || '');
        formData.append('candidate[plainPassword][first]', profile.credential.plainPassword.first);
        formData.append('candidate[plainPassword][second]', profile.credential.plainPassword.second);

        // Extrait
        formData.append('extrais[NumInscription]', String(profile.extrait.NumInscription));
        formData.append('extrais[Annee]', String(profile.extrait.Annee));
        formData.append('extrais[Municipalite]', profile.extrait.Municipalite);
        if (profile.extrait.ExtraitDeNaissance) {
            formData.append('extrais[ExtraitDeNaissance]', profile.extrait.ExtraitDeNaissance);
        }

        // Donnee
        formData.append('donnee_personnelle[Genre]', profile.donnee.Genre);
        formData.append('donnee_personnelle[Adresse]', profile.donnee.Adresse);
        formData.append('donnee_personnelle[CodePostal]', String(profile.donnee.CodePostal));
        formData.append('donnee_personnelle[TelMobile]', String(profile.donnee.TelMobile));
        formData.append('donnee_personnelle[TelFixe]', profile.donnee.TelFixe || '');
        formData.append('donnee_personnelle[DateNaissance]', profile.donnee.DateNaissance);
        formData.append('donnee_personnelle[Gouvernorat]', profile.donnee.Gouvernorat);
        formData.append('donnee_personnelle[Delegation]', profile.donnee.Delegation);

        // Formation
        formData.append('formation[NiveauScolaire]', profile.formation.NiveauScolaire);
        formData.append('formation[Etablissement]', profile.formation.Etablissement);
        formData.append('formation[TypeEtablissement]', profile.formation.TypeEtablissement);
        formData.append('formation[AnneeAbandonScolaire]', profile.formation.AnneeAbandonScolaire);
        if (profile.formation.speciality) formData.append('formation[speciality]', profile.formation.speciality);
        if (profile.formation.deplome) formData.append('formation[deplome]', profile.formation.deplome);

        // Ancienne Formation
        if (profile.ancienneFormation.Specialite) {
            formData.append('ancienne_formation[Specialite]', String(profile.ancienneFormation.Specialite));
            formData.append('ancienne_formation[diplome]', String(profile.ancienneFormation.diplome));
            formData.append('ancienne_formation[Centre]', String(profile.ancienneFormation.Centre));
            formData.append('ancienne_formation[anneeFin]', String(profile.ancienneFormation.anneeFin));
        }

        return formData;
    }
}
