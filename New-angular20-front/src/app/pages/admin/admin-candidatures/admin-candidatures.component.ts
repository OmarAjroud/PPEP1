import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-admin-candidatures',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './admin-candidatures.component.html',
    styleUrls: ['./admin-candidatures.component.scss']
})
export class AdminCandidaturesComponent implements OnInit {
    api = inject(ApiService);
    lang = inject(LanguageService);

    candidatures = signal<any[]>([]);
    loading = signal(true);
    filterStatus = signal('all');
    actionLoading = signal<number | null>(null);

    pendingCount = computed(() => this.candidatures().filter(c => c.etat === 'en_attente').length);
    acceptedCount = computed(() => this.candidatures().filter(c => c.etat === 'accepte').length);
    rejectedCount = computed(() => this.candidatures().filter(c => c.etat === 'refuse').length);

    ngOnInit() {
        this.loadCandidatures();
    }

    loadCandidatures() {
        this.loading.set(true);
        this.api.getAdminCandidatures().subscribe({
            next: (data) => {
                this.candidatures.set(data);
                this.loading.set(false);
            },
            error: () => this.loading.set(false)
        });
    }

    get filtered(): any[] {
        const status = this.filterStatus();
        if (status === 'all') return this.candidatures();
        return this.candidatures().filter(c => c.etat === status);
    }

    accept(id: number) {
        this.actionLoading.set(id);
        this.api.acceptCandidature(id).subscribe({
            next: () => {
                this.candidatures.update(list =>
                    list.map(c => c.id === id ? { ...c, etat: 'accepte' } : c)
                );
                this.actionLoading.set(null);
            },
            error: () => this.actionLoading.set(null)
        });
    }

    reject(id: number) {
        this.actionLoading.set(id);
        this.api.rejectCandidature(id).subscribe({
            next: () => {
                this.candidatures.update(list =>
                    list.map(c => c.id === id ? { ...c, etat: 'refuse' } : c)
                );
                this.actionLoading.set(null);
            },
            error: () => this.actionLoading.set(null)
        });
    }

    delete(id: number) {
        if (!confirm('Supprimer cette candidature ?')) return;
        this.actionLoading.set(id);
        this.api.deleteCandidature(id).subscribe({
            next: () => {
                this.candidatures.update(list => list.filter(c => c.id !== id));
                this.actionLoading.set(null);
            },
            error: () => this.actionLoading.set(null)
        });
    }

    statusBadgeClass(etat: string): string {
        switch (etat) {
            case 'en_attente': return 'bg-warning-subtle text-warning-emphasis';
            case 'accepte': return 'bg-success-subtle text-success-emphasis';
            case 'refuse': return 'bg-danger-subtle text-danger-emphasis';
            default: return 'bg-secondary-subtle text-secondary-emphasis';
        }
    }

    statusLabel(etat: string): string {
        const t = this.lang.t().admin.status;
        switch (etat) {
            case 'en_attente': return t.pending;
            case 'accepte': return t.accepted;
            case 'refuse': return t.rejected;
            case 'draft': return t.draft;
            default: return etat;
        }
    }
}
