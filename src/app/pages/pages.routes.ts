import {Routes, RouterModule} from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginGuardGuard, RoleGuardServiceGuard } from '../service/services.index';
import { GruposComponent } from './seguridad/grupos/grupos.component';
import { NotFound404Component } from './seguridad/not-found404/not-found404.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent, canActivate: 
              [RoleGuardServiceGuard], data: {expectedRole: 'ROLE_USUARIO'}},
          { path: 'grupos', component: GruposComponent, canActivate: 
              [RoleGuardServiceGuard], data: {expectedRole: 'ROLE_ADMIN'}},
          { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
          
        ]
    }
];

export const PAGES_ROUTERS = RouterModule.forChild(pagesRoutes);
