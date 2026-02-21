import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { LanguageService } from '../../../services/language.service';
import { ToastService } from '../../../services/toast.service';

@Component({
    selector: 'app-admin-offres',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './admin-offres.component.html',
    styleUrls: ['./admin-offres.component.scss']
})
export class AdminOffresComponent implements OnInit {
    api = inject(ApiService);
    lang = inject(LanguageService);
    toast = inject(ToastService);

    offres = signal<any[]>([]);
    loading = signal(true);
    showModal = signal(false);
    editingOffre = signal<any>(null);
    saving = signal(false);

    // Reference data for dropdowns
    specialites = signal<any[]>([]);
    centres = signal<any[]>([]);
    diplomes = signal<any[]>([]);

    // Form fields
    form: any = {};

    ngOnInit() {
        this.loadOffres();
        this.loadReferenceData();
    }

    loadOffres() {
        this.loading.set(true);
        this.api.getAdminOffres().subscribe({
            next: (data) => { this.offres.set(data); this.loading.set(false); },
            error: () => this.loading.set(false)
        });
    }

    loadReferenceData() {
        this.api.getAllSpecialites().subscribe({ next: (d: any) => this.specialites.set(d) });
        this.api.getAllCentresBySpecialite('').subscribe({ next: (d: any) => this.centres.set(d) });
        this.api.getAllDiplomesFormation().subscribe({ next: (d: any) => this.diplomes.set(d) });
    }

    openCreate() {
        this.editingOffre.set(null);
        this.form = {
            specialite_id: '', centre_id: '', diplome_id: '',
            debutformation: '', finformation: '', nbplaces: '',
            hebergement: 'Non', bourse: 'Non', foyer: 'Non',
            etat: 'active', session: '', code: ''
        };
        this.showModal.set(true);
    }

    openEdit(offre: any) {
        this.editingOffre.set(offre);
        this.form = {
            specialite_id: offre.specialite_id || '',
            centre_id: offre.centre_id || '',
            diplome_id: offre.diplome_id || '',
            debutformation: offre.debutformation || '',
            finformation: offre.finformation || '',
            nbplaces: offre.nbplaces || '',
            hebergement: offre.hebergement || 'Non',
            bourse: offre.bourse || 'Non',
            foyer: offre.foyer || 'Non',
            etat: offre.etat || 'active',
            session: offre.session || '',
            code: offre.code || ''
        };
        this.showModal.set(true);
    }

    save() {
        this.saving.set(true);
        const data = { ...this.form, nbplaces: this.form.nbplaces ? +this.form.nbplaces : null };

        const obs = this.editingOffre()
            ? this.api.updateOffre(this.editingOffre().id, data)
            : this.api.createOffre(data);

        obs.subscribe({
            next: () => {
                this.saving.set(false);
                this.showModal.set(false);
                this.toast.success(this.editingOffre() ? this.lang.t().toast.admin.offerUpdateSuccess : this.lang.t().toast.admin.offerCreateSuccess);
                this.loadOffres();
            },
            error: () => {
                this.saving.set(false);
                this.toast.error(this.lang.t().toast.admin.saveError);
            }
        });
    }

    async deleteOffre(id: number) {
        const confirmed = await this.toast.confirm('Supprimer cette offre ?', { type: 'danger' });
        if (!confirmed) return;

        this.api.deleteOffre(id).subscribe({
            next: () => {
                this.offres.update(list => list.filter(o => o.id !== id));
                this.toast.success('Offre supprimée.');
            },
            error: () => this.toast.error('Erreur lors de la suppression.')
        });
    }
}
