import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { UserStore } from '../../stores/user.store';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    userStore = inject(UserStore);
    router = inject(Router);

    logout() {
        this.userStore.logout();
        this.router.navigate(['/login']);
    }
}
