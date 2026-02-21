import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LanguageService } from '../../services/language.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterLink],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    private fb = inject(FormBuilder);
    private authService = inject(AuthService);
    private router = inject(Router);
    lang = inject(LanguageService);
    toast = inject(ToastService);

    errorMessage = '';
    isLoading = false;

    loginForm = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });

    onSubmit() {
        if (this.loginForm.valid) {
            this.isLoading = true;
            this.errorMessage = '';
            const creds = {
                username: this.loginForm.value.username!,
                password: this.loginForm.value.password!
            };

            this.authService.login(creds).subscribe({
                next: (response) => {
                    this.isLoading = false;
                    if (response.token) {
                        this.toast.success(this.lang.t().toast.auth.loginSuccess);
                        this.router.navigate(['/home']);
                    } else {
                        this.toast.error(this.lang.t().toast.auth.noToken);
                    }
                },
                error: (err) => {
                    this.isLoading = false;
                    console.error(err);
                    this.toast.error(this.lang.t().toast.auth.loginError);
                }
            });
        }
    }
}
