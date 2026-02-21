import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationModel } from '../../models/notification.model';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private api = inject(ApiService);
    lang = inject(LanguageService);
    notifications: NotificationModel[] = [];
    isLoading = true;

    get unreadCount(): number {
        return this.notifications.filter(n => !n.read).length;
    }

    ngOnInit() {
        this.loadNotifications();
    }

    refreshNotifications() {
        this.loadNotifications();
    }

    markAsRead(notif: NotificationModel) {
        if (notif.read) return; // Already read
        notif.read = true;
        this.api.markNotificationRead(notif.id).subscribe({
            error: () => { notif.read = false; } // Revert on error
        });
    }

    private loadNotifications() {
        this.isLoading = true;
        this.api.getNotifications().subscribe({
            next: (data) => {
                this.notifications = data;
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Failed to load notifications', err);
                this.isLoading = false;
            }
        });
    }
}
