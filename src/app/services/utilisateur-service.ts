import { Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RegistrationRequest } from '../interfaces/RegistrationRequest';
import { Observable } from 'rxjs';
import { Authentication } from '../interfaces/Authentication';
import { AuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { Utilisateurs } from '../interfaces/Utilisateurs';
import { jwtDecode } from 'jwt-decode';
import { UserDto } from '../interfaces/UserDto';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  private readonly baseUrl = 'http://localhost:8080/api/auth';
  private _isAuthenticated = signal<boolean>(false);
  private _currentUser = signal<Utilisateurs | null>(null);
  private _isLoading = signal<boolean>(false);

  constructor(private httpclient: HttpClient) {
    this.checkInitialAuthState();
  }

  register(request: RegistrationRequest): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/addUser`, request);
  }

  authenticate(request: Authentication): Observable<AuthenticationResponse> {
    return this.httpclient.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request);
  }

  activateAccount(token: string): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/activation-account?token=${token}`, {});
  }

  checkToken(token: string): Observable<any> {
    return this.httpclient.get(`${this.baseUrl}/check-token?token=${token}`);
  }

  logout(): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/logout`, {});
  }

  storeToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  removeToken(): void {
    localStorage.removeItem('auth_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

private checkInitialAuthState(): void {
    const token = this.getToken();
    if (token) {
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
        this._isAuthenticated.set(true);

        this.httpclient.get<Utilisateurs>(`${this.baseUrl}/users/me`, { headers }).subscribe({
            next: (user) => {
                console.log('Utilisateur récupéré:', user); // Ajoutez ce log
                this._currentUser.set(user);
            },
            error: () => {
                this._isAuthenticated.set(false);
                this._currentUser.set(null);
            }
        });
    }
}

  get isAuthenticatedd() {
    return this._isAuthenticated.asReadonly();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  get isLoading() {
    return this._isLoading.asReadonly();
  }
  getUserInfo(): Observable<UserDto> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.httpclient.get<UserDto>(`${this.baseUrl}/users/me`, { headers });
  }

  login(user: Utilisateurs): void {
    this._currentUser.set(user);
    this._isAuthenticated.set(true);
  }

  logoutt(): void {
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    this.removeToken();
  }

  updateUser(user: Utilisateurs): void {
    this._currentUser.set(user);
  }

  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

  hasRole(role: string): boolean {
    const user = this._currentUser();
    return user?.roles?.some(r => r.name === role) || false;
  }
}