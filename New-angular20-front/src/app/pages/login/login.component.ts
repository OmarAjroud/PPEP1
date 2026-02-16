import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
                        // Navigate to Home
                        this.router.navigate(['/home']);
                    } else {
                        this.errorMessage = 'Login succeeded but no token returned.';
                    }
                },
                error: (err) => {
                    this.isLoading = false;
                    console.error(err);
                    this.errorMessage = 'Identifiants incorrects ou problème de connexion.';
                }
            });
        }
    }
}
