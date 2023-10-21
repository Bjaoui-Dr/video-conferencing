import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Signin } from '../models/signin';
import { Signup } from '../models/signup';
import { AuthResponse } from '../models/authResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private adminEndpoint = environment.backend + '/api/v1/admin';
  private signInEndpoint = environment.backend + '/api/v1/auth/signin';
  private signUpEndpoint = environment.backend + '/api/v1/auth/signup';

  constructor(private http: HttpClient) {}

  logIn(body: Signin): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // Example header
        // 'Authorization': 'Bearer your_access_token', // Example Authorization header
      }),
    };
    return this.http.post<AuthResponse>(this.signInEndpoint, body, httpOptions);
  }

  register(body: Signup): Observable<AuthResponse> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    return this.http.post<AuthResponse>(this.signUpEndpoint, body, httpOptions);
  }

  adminHello(): Observable<any> {
    return this.http.get(this.adminEndpoint);
  }

  saveTokens(data: AuthResponse) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }
}
