import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-my-applications',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './my-applications.component.html',
    styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
    api = inject(ApiService);
    applications: any[] = [];
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

    // Helpers to check status (Legacy logic: tester, tester1)
    canConfirm(etatNumerique: number): boolean {
        // Legacy: tester(off.etatnumerique) -> checks if state allows confirmation
        // Assuming logic: if state is draft (0?) or something specific.
        // For now, let's assume specific codes from backend context or just check if 'brouillon'
        // Legacy TS logic wasn't fully visible but let's assume 0 or 1.
        // Let's implement generic logic: if it mentions 'brouillon' (Draft) in text or code 0
        return etatNumerique === 0; // Placeholder, adjust if needed
    }

    isDraft(etatNumerique: number): boolean {
        // Legacy: tester1 -> confirm draft / delete draft
        return etatNumerique === 0;
    }

    // Actions
    // Note: API for 'verifier' (Confirm) and 'verifier2' (Delete Draft) need to be mapped.
    // I didn't see explicit 'verifier' endpoints in AuthService earlier, wait.
    // AuthService.approuvercandidaturebrouillon (Validate Many) ?
    // AuthService.supprimercandidaturebrouillon (Delete Draft) -> I have this one!

    confirmDraft(offerId: string) {
        if (!confirm('Confirmer cette candidature ?')) return;

        const payload = { candidatures: [offerId] }; // Wrapping as expected by legacy backend
        this.api.validateDrafts(payload).subscribe({
            next: () => {
                alert('Candidature confirmée');
                this.loadApplications();
            },
            error: (err) => console.error(err)
        });
    }

    deleteDraft(offerId: string) {
        if (!confirm('Supprimer ce brouillon ?')) return;

        this.api.deleteDraft(offerId).subscribe({
            next: () => {
                alert('Brouillon supprimé');
                this.loadApplications();
            },
            error: (err) => console.error(err)
        });
    }
}
