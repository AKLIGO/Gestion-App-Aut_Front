import { Routes } from '@angular/router';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/visiteur/home/home';
import { GestionDesBiens } from './pages/gestion-des-biens/gestion-des-biens';
import { Image } from './pages/image/image';
import { Immeuble } from './pages/immeuble/immeuble';
import { Reservation } from './pages/reservation/reservation';
import { App } from './app';
import { Appartement } from './pages/appartement/appartement';
import { ActivateAccount } from './pages/activate-account/activate-account';
import { Paiement } from './pages/paiement/paiement';
import { PaiementByReservation } from './pages/paiement-by-reservation/paiement-by-reservation';
import { Vehicules } from './pages/vehicules/vehicules';
import { VehiculesVue } from './pages/vehicules-vue/vehicules-vue';
import { ReservationVehicule } from './pages/reservation-vehicule/reservation-vehicule';
import { PaiementVehicules } from './pages/paiement-vehicules/paiement-vehicules';
import { ImageVehicule } from './pages/image-vehicule/image-vehicule';

export const routes: Routes = [
    {path:'contact', component:Contact},
    {path:'login', component:Login},
    {path:'register',component:Register},
    {path:'', component:Home},
    {path:'biens', component:GestionDesBiens},
    {path:'image', component:Image},
    {path:'immeuble', component:Immeuble},
    {path:'reservationsApp', component:Reservation},
    {path:'appartement', component:Appartement},
    {path:'activate-account', component:ActivateAccount},
    {path:'paiementAppartement', component:Paiement},
    {path:'gestionVehicules', component:Vehicules},
    {path:'vehicules', component:VehiculesVue},
    {path:'paiement-by-reservation/:reservationId', component:PaiementByReservation},
    {path:'reservationVehicule', component:ReservationVehicule},
    {path:'paiementVehicule', component:PaiementVehicules},
    {path:'uploadImageVehicule', component:ImageVehicule},
    { path: '**', redirectTo: '' },
    

];
