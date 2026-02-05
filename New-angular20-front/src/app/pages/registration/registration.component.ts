import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CustomValidators } from '../../validators/custom.validators';

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

    // Stepper State
    currentStep = 1;
    isLoading = false;

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
        telFixe: ['', [Validators.pattern('^[0-9]{8}$')]],
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
                // Legacy uses 'spcialitescoloairesaf'
                // We'll store it in a specific list or reuse specialites if appropriate
                // For now assuming a separate list logic isn't strictly defined in my local lists
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
        // We can check validity of specific controls here
        // minimal check for now
        return true;
    }

    // --- Submit ---
    onSubmit() {
        if (this.regForm.invalid) {
            this.regForm.markAllAsTouched();
            return;
        }

        this.isLoading = true;
        // Map Form to API Model (Legacy ProfileModel structure)
        // Note: This mapping needs to match what backend expects.
        // Based on legacy `onSubmit` logic.

        // We send this to ApiService.registerCandidate(this.regForm.value) 
        // BUT we need to construct the complex object.
        // For MVP, lets log it first.

        console.log('Form Data', this.regForm.value);

        // TODO: Finalize the complex object mapping in the next step
        // once UI is confirmed.
        this.isLoading = false;
    }
}
