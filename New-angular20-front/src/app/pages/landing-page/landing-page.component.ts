import { Component, inject, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-landing-page',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './landing-page.component.html',
    styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {
    lang = inject(LanguageService);
    private el = inject(ElementRef);
    private observer!: IntersectionObserver;

    ngAfterViewInit(): void {
        // Scroll-reveal: observe all .reveal elements
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        this.observer.unobserve(entry.target); // Animate only once
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
