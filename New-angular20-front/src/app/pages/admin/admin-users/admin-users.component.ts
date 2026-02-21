import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LanguageService } from '../../../services/language.service';

@Component({
    selector: 'app-admin-users',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
    api = inject(ApiService);
    lang = inject(LanguageService);

    users = signal<any[]>([]);
    loading = signal(true);

    ngOnInit() {
        this.api.getAdminUsers().subscribe({
            next: (data) => { this.users.set(data); this.loading.set(false); },
            error: () => this.loading.set(false)
        });
    }

    deleteUser(id: number) {
        if (!confirm('Supprimer cet utilisateur et toutes ses candidatures ?')) return;
        this.api.deleteUser(id).subscribe({
            next: () => this.users.update(list => list.filter(u => u.id !== id))
        });
    }

    isAdmin(user: any): boolean {
        return user.roles?.includes('ROLE_ADMIN');
    }
}
