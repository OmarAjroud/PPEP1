import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NotificationModel } from '../../models/notification.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private api = inject(ApiService);
    notifications: NotificationModel[] = [];
    isLoading = true;

    ngOnInit() {
        this.loadNotifications();
    }

    refreshNotifications() {
        this.loadNotifications();
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
