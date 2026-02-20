import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
})
export class AboutComponent implements AfterViewInit, OnDestroy {
    lang = inject(LanguageService);
    private el = inject(ElementRef);
    private observer!: IntersectionObserver;

    ngAfterViewInit(): void {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12 }
        );
        const reveals = this.el.nativeElement.querySelectorAll('.reveal');
        reveals.forEach((el: Element) => this.observer.observe(el));
    }

    ngOnDestroy(): void {
        this.observer?.disconnect();
    }
}
