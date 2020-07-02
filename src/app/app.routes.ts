import {Routes, RouterModule} from '@angular/router';


import { LoginComponent } from './login/login.component';
import { NotFound404Component } from './pages/seguridad/not-found404/not-found404.component';

const appRoutes: Routes = [

    { path: 'login', component: LoginComponent},
    { path: '404', component: NotFound404Component},
    { path: '**', redirectTo: '/404'}
   // { path: 'register', component: RegisterComponent},
];

export const APP_ROUTERS = RouterModule.forRoot(appRoutes, {useHash: true});
