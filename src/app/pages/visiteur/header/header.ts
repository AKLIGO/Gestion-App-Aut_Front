import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UtilisateurService } from '../../../services/utilisateur-service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

    constructor(private authServices:UtilisateurService,
            private router:Router
    ){}

    //Getters pour l'etat d'authentification

    get isAuthenticated(){
      return this.authServices.isAuthenticatedd();
    }

    get currentUser(){
      return this.authServices.currentUser();
    }

    get isLoading(){
      return this.authServices.isLoading();
    }

    /**
     * Deconnexion
     */
    logout():void{
      this.authServices.setLoading(true);
      this.authServices.logout().subscribe({
        next:() => {
          this.authServices.logoutt();
          this.router.navigate(['/']);
          this.authServices.setLoading(false);
        },

        error:(error)=> {
          console.error('Erreur lors de la déconnexion:', error);
        // Déconnexion locale même en cas d'erreur serveur

        this.authServices.logoutt();
        this.router.navigate(['/']);
        this.authServices.setLoading(false);
        }
      });

    }
    /**
   * Obtenir le nom  de l'utilisateur
   
   */

    getUserDisplayName():string {
      const user = this.currentUser;
      if(!user)
        return '';

      if(user.nom && user.prenoms){
        return `${user.nom} ${user.prenoms}`;

      }else if(user.nom){
        return user.nom;
      }else if (user.email) {
        return user.email;
      }
      return 'utilisateur';
    }


}
