import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-offer-search',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './offer-search.component.html',
    styleUrls: ['./offer-search.component.scss']
})
export class OfferSearchComponent implements OnInit {
    api = inject(ApiService);

    // Filter Lists
    diplomes: any[] = [];
    specialites: any[] = [];
    centres: any[] = [];

    // Selections
    selectedDiplome: string = '';
    selectedSpecialite: string = '';
    selectedCentre: string = '';

    // Results
    offers: any[] = [];
    isLoading = false;
    hasSearched = false;

    ngOnInit() {
        this.loadInitialData();
    }

    loadInitialData() {
        this.api.getAllDiplomesFormation().subscribe(data => this.diplomes = data);
    }

    onDiplomeChange() {
        this.specialites = [];
        this.centres = []; // Reset sub-lists
        this.selectedSpecialite = '';
        this.selectedCentre = '';

        if (this.selectedDiplome) {
            this.api.getAllSpecialitesAncienneFormationByDiplome(this.selectedDiplome).subscribe(data => {
                this.specialites = data;
            });
        }
    }

    onSpecialiteChange() {
        this.centres = [];
        this.selectedCentre = '';

        if (this.selectedSpecialite) {
            this.api.getAllCentresBySpecialite(this.selectedSpecialite).subscribe(data => {
                this.centres = data;
            });
        }
    }

    search() {
        this.isLoading = true;
        this.hasSearched = true;
        this.offers = [];

        // Assuming search logic requires at least one filter or can search all?
        // Legacy logic implies specific params.
        this.api.searchOffers(this.selectedSpecialite, this.selectedCentre).subscribe({
            next: (data) => {
                // API returns list of offers
                this.offers = data; // Check if data is array or wrapped object { data: ... }
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    apply(offerId: string) {
        if (!confirm('Voulez-vous postuler à cette offre ? (Are you sure you want to apply?)')) return;

        this.api.applyToOffer(offerId).subscribe({
            next: () => {
                alert('Candidature réussie ! (Application Successful)');
            },
            error: (err) => {
                console.error(err);
                alert('Erreur lors de la candidature.');
            }
        });
    }
}
