import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { ProfileModel } from '../../models/profile.model';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    api = inject(ApiService);



    profile: ProfileModel | null = null;
    isLoading = true;

    // Edit Models
    editMode = false;
    editEmailMode = false;

    // Data for editing
    editData = {
        adresse: '',
        codePostal: '',
        telMobile: ''
    };

    newEmail = '';

    ngOnInit() {
        this.loadProfile();
    }

    loadProfile() {
        this.isLoading = true;
        this.api.getUserProfile().subscribe({
            next: (data) => {
                this.profile = data;
                // Pre-fill edit data
                if (data.donnee) {
                    this.editData.adresse = data.donnee.Adresse;
                    this.editData.codePostal = data.donnee.CodePostal;
                    this.editData.telMobile = data.donnee.TelMobile;
                }
                if (data.credential) {
                    this.newEmail = data.credential.email;
                }
                this.isLoading = false;
            },
            error: (err) => {
                console.error(err);
                this.isLoading = false;
            }
        });
    }

    updateInfo() {
        this.api.updatePersonalInfo(this.editData.telMobile, this.editData.adresse, this.editData.codePostal)
            .subscribe({
                next: () => {
                    alert('Informations mises à jour !');
                    this.editMode = false;
                    this.loadProfile();
                },
                error: (err) => console.error(err)
            });
    }

    updateEmail() {
        this.api.updateEmail(this.newEmail).subscribe({
            next: () => {
                alert('Email mis à jour !');
                this.editEmailMode = false;
                this.loadProfile();
            },
            error: (err) => console.error(err)
        });
    }
}
