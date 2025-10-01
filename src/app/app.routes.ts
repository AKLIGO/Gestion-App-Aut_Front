import { Routes } from '@angular/router';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Home } from './pages/visiteur/home/home';
import { GestionDesBiens } from './pages/gestion-des-biens/gestion-des-biens';
import { Image } from './pages/image/image';

export const routes: Routes = [
    {path:'contact', component:Contact},
    {path:'login', component:Login},
    {path:'register',component:Register},
    {path:'', component:Home},
    {path:'biens', component:GestionDesBiens},
    {path:'image', component:Image},
    { path: '**', redirectTo: '' },
    

];
