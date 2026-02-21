import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-my-applications',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './my-applications.component.html',
    styleUrls: ['./my-applications.component.scss']
})
export class MyApplicationsComponent implements OnInit {
    api = inject(ApiService);
    lang = inject(LanguageService);
    applications: any[] = []; // API returns candidature objects: { id, etat, etatnumerique, dateCandidature, offre: {...} }
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
}
