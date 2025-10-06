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

export const routes: Routes = [
    {path:'contact', component:Contact},
    {path:'login', component:Login},
    {path:'register',component:Register},
    {path:'', component:Home},
    {path:'biens', component:GestionDesBiens},
    {path:'image', component:Image},
    {path:'immeuble', component:Immeuble},
    {path:'reservations', component:Reservation},
    {path:'appartement', component:Appartement},
    {path:'activate-account', component:ActivateAccount},
    { path: '**', redirectTo: '' },
    

];
