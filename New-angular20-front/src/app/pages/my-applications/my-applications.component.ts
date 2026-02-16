import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { OffreModel } from '../../models/offre.model';

@Component({
    selector: 'app-my-applications',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './my-applications.component.html',
    styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
    api = inject(ApiService);
    applications: OffreModel[] = [];
    isLoading = true;

    ngOnInit() {
        this.loadApplications();
    }

    loadApplications() {
        this.isLoading = true;
        this.api.getApplicationHistory().subscribe({
            next: (data) => {
                this.applications = data; // Check if wrapped? assuming array based on legacy 'let off of offres'
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    // Helpers to check status
    canConfirm(etatNumerique: number | undefined): boolean {
        return (etatNumerique || 0) === 0;
    }

    isDraft(etatNumerique: number | undefined): boolean {
        return (etatNumerique || 0) === 0;
    }

    // Actions
    // Note: API for 'verifier' (Confirm) and 'verifier2' (Delete Draft) need to be mapped.
    // I didn't see explicit 'verifier' endpoints in AuthService earlier, wait.
    // AuthService.approuvercandidaturebrouillon (Validate Many) ?
    // AuthService.supprimercandidaturebrouillon (Delete Draft) -> I have this one!

    confirmDraft(offerId: string | number) {
        if (!confirm('Confirmer cette candidature ?')) return;

        const payload = { candidatures: [String(offerId)] }; // Wrapping as expected by legacy backend
        this.api.validateDrafts(payload).subscribe({
            next: () => {
                alert('Candidature confirmée');
                this.loadApplications();
            },
            error: (err) => console.error(err)
        });
    }

    deleteDraft(offerId: string | number) {
        if (!confirm('Supprimer ce brouillon ?')) return;

        this.api.deleteDraft(String(offerId)).subscribe({
            next: () => {
                alert('Brouillon supprimé');
                this.loadApplications();
            },
            error: (err) => console.error(err)
        });
    }
}
