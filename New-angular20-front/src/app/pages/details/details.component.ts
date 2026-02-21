import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';
import { ProfileModel } from '../../models/profile.model';
import { LanguageService } from '../../services/language.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-details',
    standalone: true,
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    api = inject(ApiService);
    lang = inject(LanguageService);
    toast = inject(ToastService);



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
                    this.editData.codePostal = String(data.donnee.CodePostal || '');
                    this.editData.telMobile = String(data.donnee.TelMobile || '');
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
                    this.toast.success(this.lang.t().toast.profile.updateInfoSuccess);
                    this.editMode = false;
                    this.loadProfile();
                },
                error: (err) => {
                    console.error(err);
                    this.toast.error(this.lang.t().toast.profile.updateInfoError);
                }
            });
    }

    updateEmail() {
        this.api.updateEmail(this.newEmail).subscribe({
            next: () => {
                this.toast.success(this.lang.t().toast.profile.updateEmailSuccess);
                this.editEmailMode = false;
                this.loadProfile();
            },
            error: (err) => {
                console.error(err);
                this.toast.error(this.lang.t().toast.profile.updateEmailError);
            }
        });
    }
}
