import { Component, computed } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UtilisateurService } from '../../../services/utilisateur-service';
import { Router, RouterLink, RouterLinkActive, NavigationEnd, RouterModule } from '@angular/router';


@Component({
  selector: 'app-side-bar',
  
  imports: [CommonModule,RouterLink,RouterModule],
  templateUrl: './side-bar.html',
  styleUrl: './side-bar.css'
})
export class SideBar {


  constructor(public utilisateurService:UtilisateurService){}

  showSidebar(): boolean {
    const user = this.utilisateurService.currentUser();
    if (!user || !user.roles) return false;
  
    // noms des rôles autorisés pour voir le sidebar
    const rolesAutorises = ['CLIENT', 'PROPRIETAIRE', 'ADMINISTRATEUR'];
  
    // retourne true si au moins un rôle de l'utilisateur est autorisé
    return user.roles.some(role => rolesAutorises.includes(role.name));
  }

    // Pour le menu Réservations
  showReservationSubmenu = false;

  // Pour le menu Paiements
  showPaiementSubmenu = false;

  // Méthodes pour basculer l'affichage des sous-menus
  toggleReservationMenu() {
    this.showReservationSubmenu = !this.showReservationSubmenu;
  }

  togglePaiementMenu() {
    this.showPaiementSubmenu = !this.showPaiementSubmenu;
  }


}
