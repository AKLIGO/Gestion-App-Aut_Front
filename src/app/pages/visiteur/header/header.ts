import { Component, computed } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../../services/utilisateur-service';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  isAuthenticated = computed(() => this.authServices.isAuthenticatedd());
  user = computed(() => this.authServices.currentUser());
  isLoading = computed(() => this.authServices.isLoading());

  currentRoute: string = '';

  constructor(private authServices: UtilisateurService, private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  hideInscriptionButton(): boolean {
    return this.isAuthenticated() || this.currentRoute === '/login';
  }

  hideConnexionButton(): boolean {
    return this.isAuthenticated();
  }

  logout(): void {
    this.authServices.setLoading(true);
    this.authServices.logout().subscribe({
      next: () => {
        this.authServices.logoutt();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.authServices.logoutt();
        this.router.navigate(['/']);
      },
      complete: () => this.authServices.setLoading(false)
    });
  }

  getUserDisplayName(): string {
    const currentUser = this.user();
    return currentUser ? `${currentUser.nom || ''} ${currentUser.prenoms || ''}`.trim() || currentUser.email || 'utilisateur' : 'utilisateur';
  }
}