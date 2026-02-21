import { Component, signal, inject, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';
import { ToastContainerComponent } from './pages/toast-container/toast-container.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule, ToastContainerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit, OnDestroy {
  protected readonly title = signal('atfp-web');
  protected api = inject(ApiService);
  protected router = inject(Router);
  protected lang = inject(LanguageService);
  protected toast = inject(ToastService);
  protected isDropdownOpen = signal(false);
  protected isMenuCollapsed = signal(true);
  protected notifCount = signal(0);
  private notifInterval: any;

  ngOnInit() {
    this.checkNotifications();
    this.notifInterval = setInterval(() => this.checkNotifications(), 30000);
  }

  ngOnDestroy() {
    if (this.notifInterval) clearInterval(this.notifInterval);
  }

  checkNotifications() {
    if (!this.api.isAuthenticated()) return;
    this.api.getNotifications().subscribe({
      next: (data: any[]) => this.notifCount.set(data.filter((n: any) => !n.read).length),
      error: () => { }
    });
  }

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  toggleMenu() {
    this.isMenuCollapsed.update(v => !v);
  }

  logout() {
    this.isDropdownOpen.set(false);
    this.notifCount.set(0);
    this.api.logout();
    this.toast.info(this.lang.t().toast.auth.logoutSuccess);
    this.router.navigate(['/landing']);
  }
}
