import { Component, signal, computed  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { UtilisateurService } from '../../../services/utilisateur-service';
import { Role } from '../../../interfaces/Role';
import { MenuItem } from './MenuItem';
import { FULL_MENU, PROPRIETAIRE_MENU } from './menu-data'; // ✅ importation des menus

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.css']
})
export class SideBar {
showSubmenus: { [key: string]: boolean } = {};

  constructor(public utilisateurService: UtilisateurService) {}

  toggleSubmenu(title: string) {
    this.showSubmenus[title] = !this.showSubmenus[title];
  }

  /** 🔹 Sidebar visible pour ADMIN ou PROPRIETAIRE */
  showSidebar(): boolean {
    const user = this.utilisateurService.currentUser();
    return user?.roles?.some((r: Role) => ['ADMIN', 'PROPRIETAIRE'].includes(r.name)) || false;
  }

  /** 🔹 Retourne le menu selon le rôle */
  getMenu(): MenuItem[] {
    const user = this.utilisateurService.currentUser();
    if (!user || !user.roles) return [];
    if (user.roles.some(r => r.name === 'ADMIN')) return FULL_MENU;
    if (user.roles.some(r => r.name === 'PROPRIETAIRE')) return PROPRIETAIRE_MENU;
    return [];
  }

  /** 🔹 Vérifie le rôle spécifique */
  hasRole(roleName: string): boolean {
    const user = this.utilisateurService.currentUser();
    return user?.roles?.some(r => r.name === roleName) || false;
  }
}
