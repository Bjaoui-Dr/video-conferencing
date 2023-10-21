import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  msg = '';
  admin = '';
  authService: AuthService = inject(AuthService);

  onInputChange(event: Event): void {
    const inputValue = (event.target as HTMLInputElement).value;
    this.msg = inputValue;
  }

  joinRoom() {
    this.router.navigate([`/room/${this.msg}`]);
  }
}
