import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    api = inject(ApiService);
    notifications: any[] = [];
    isLoading = true;

    ngOnInit() {
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
