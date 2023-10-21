import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Signin } from 'src/app/core/models/signin';
import { Router } from '@angular/router';
import { AuthResponse } from 'src/app/core/models/authResponse';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  authService: AuthService = inject(AuthService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit() {
    const signin: Signin = {
      email: this.loginForm.value.email ?? '',
      password: this.loginForm.value.password ?? '',
    };

    this.authService.logIn(signin).subscribe({
      next: (response: AuthResponse) => {
        console.log(response);
        this.authService.saveTokens(response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log(error.error.message);
      },
    });
  }
}
