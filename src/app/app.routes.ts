import { Routes } from '@angular/router';
import { Contact } from './pages/contact/contact';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    {path:'contact', component:Contact},
    {path:'login', component:Login},
    {path:'register',component:Register},
    { path: '**', redirectTo: '' }

];
