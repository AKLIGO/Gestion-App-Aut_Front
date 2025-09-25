import { Injectable,signal } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { RegistrationRequest } from '../interfaces/RegistrationRequest';
import { Observable } from 'rxjs';
import { Authentication } from '../interfaces/Authentication';
import { AuthenticationResponse } from '../interfaces/AuthenticationResponse';
import { Utilisateurs } from '../interfaces/Utilisateurs';
import { jwtDecode } from 'jwt-decode'

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private readonly baseUrl = 'http://localhost:8080/auth';



  private _isAuthenticated = signal<boolean>(false);
  private _currentUser = signal<Utilisateurs | null>(null);
  private _isLoading = signal<boolean>(false);

  
  constructor(private httpclient:HttpClient){
    this.checkInitialAuthState();
  }

  /**
   * Inscription d'un utilisateur
   */

  register(request:RegistrationRequest):Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/addUser`,request);

  }
  /**
   * Authentication d'un utilisateur
   */
  authenticate(request:Authentication):Observable<any>{
    return this.httpclient.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request);
  }

  /**
   * Activation du compte avec un token
   */
  
  activateAccount(token:string): Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/activation-account?token=${token}`,{});
  }

  /**
   * verification d'un token d'activation
   */

  checktoken(token:string):Observable<any>{
      return this.httpclient.get(`${this.baseUrl}/check-token?token=${token}`);
  }

  /**
   * Deconnexion de l'utilisateur
   */

  logout():Observable<any> {
    return this.httpclient.post(`${this.baseUrl}/logout`,{});

  }

  /**
   * Stockage du token dans le localStorage
   */

  storeToken(token:string):void {
    localStorage.setItem('auth_token',token);
  }

  /**
   * recuperation du token stoke
   */
  getToken():string | null {
    return localStorage.getItem('auth_token');
  }

  /**
   * suppression du token(deconnexion)
   */

  removeToken():void {
    localStorage.removeItem('auth_token');
  }

  /**
   * verification si l'utilisateur est connecter
   */

  isAuthenticated():boolean {
    return !! this.getToken();
  }

  private checkInitialAuthState(): void{
    const token = localStorage.getItem('access_token');
    if(token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      this._isAuthenticated.set(true);

      this.httpclient.get<Utilisateurs>(`${this.baseUrl}/users/me`).subscribe({
        next: (user) => this._currentUser.set(user),
        error: () => {
          this._isAuthenticated.set(false);
          this._currentUser.set(null);
        }
      });




      
    }
  }

    /**
   * Getters pour l'état de l'authentification
   */
  get isAuthenticatedd() {
    return this._isAuthenticated.asReadonly();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  get isLoading() {
    return this._isLoading.asReadonly();
  }

  /**
   * Connexion d'un utilisateur
   */
  login(user: Utilisateurs): void {
    this._currentUser.set(user);
    this._isAuthenticated.set(true);
  }

  /**
   * Déconnexion d'un utilisateur
   */
  logoutt(): void {
    this._currentUser.set(null);
    this._isAuthenticated.set(false);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  /**
   * Mise à jour des informations utilisateur
   */
  updateUser(user: Utilisateurs): void {
    this._currentUser.set(user);
  }

  /**
   * Définition de l'état de chargement
   */
  setLoading(loading: boolean): void {
    this._isLoading.set(loading);
  }

    /**
   * Vérification des permissions utilisateur
   */
    hasRole(role: string): boolean {
      const user = this._currentUser();
      if (!user || !user.roles) return false;
      
      return user.roles.some(r => r.name === role);
    }

}
