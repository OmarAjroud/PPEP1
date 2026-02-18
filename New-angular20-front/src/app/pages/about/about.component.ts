import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent {
    lang = inject(LanguageService);
}
