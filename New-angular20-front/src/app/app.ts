import { Component, signal, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { ApiService } from './services/api.service';
import { CommonModule } from '@angular/common';
import { LanguageService } from './services/language.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('atfp-web');
  protected api = inject(ApiService);
  protected router = inject(Router);
  protected lang = inject(LanguageService);
  protected isDropdownOpen = signal(false);
  protected isMenuCollapsed = signal(true);

  toggleDropdown() {
    this.isDropdownOpen.update(v => !v);
  }

  toggleMenu() {
    this.isMenuCollapsed.update(v => !v);
  }

  logout() {
    this.isDropdownOpen.set(false);
    this.api.logout();
    this.router.navigate(['/landing']);
  }
}
