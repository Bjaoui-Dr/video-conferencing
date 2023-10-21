import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Signup } from 'src/app/core/models/signup';
import { AuthResponse } from 'src/app/core/models/authResponse';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  authService: AuthService = inject(AuthService);

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router) {}

  onSubmit() {
    const signup: Signup = {
      firstName: this.registerForm.value.firstName ?? '',
      lastName: this.registerForm.value.lastName ?? '',
      email: this.registerForm.value.email ?? '',
      password: this.registerForm.value.password ?? '',
    };

    this.authService.register(signup).subscribe({
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
