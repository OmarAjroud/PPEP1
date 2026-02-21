import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../../services/api.service';
import { LanguageService } from '../../../services/language.service';
import { ToastService } from '../../../services/toast.service';

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
    toast = inject(ToastService);

    users = signal<any[]>([]);
    loading = signal(true);

    // User detail modal
    selectedUser = signal<any>(null);
    userLoading = signal(false);

    ngOnInit() {
        this.api.getAdminUsers().subscribe({
            next: (data) => { this.users.set(data); this.loading.set(false); },
            error: () => this.loading.set(false)
        });
    }

    viewUser(userId: number) {
        this.userLoading.set(true);
        this.selectedUser.set(null);
        this.api.getAdminUserDetail(userId).subscribe({
            next: (data) => {
                this.selectedUser.set(data);
                this.userLoading.set(false);
            },
            error: () => this.userLoading.set(false)
        });
    }

    closeUserModal() {
        this.selectedUser.set(null);
    }

    async deleteUser(id: number) {
        const confirmed = await this.toast.confirm(this.lang.t().toast.admin.deleteUserConfirm, { type: 'danger' });
        if (!confirmed) return;

        this.api.deleteUser(id).subscribe({
            next: () => {
                this.users.update(list => list.filter(u => u.id !== id));
                this.toast.success(this.lang.t().toast.admin.deleteUserSuccess);
            },
            error: () => this.toast.error(this.lang.t().toast.admin.deleteError)
        });
    }

    isAdmin(user: any): boolean {
        return user.roles?.includes('ROLE_ADMIN');
    }
}
