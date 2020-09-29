import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUserComponent } from './list-user/list-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list-user',
        component: ListUserComponent,
        data: {
          title: "Lista de Usuarios",
          breadcrumb: "Lista de Usuarios"
        }
      },
      {
        path: 'create-user',
        component: CreateUserComponent,
        data: {
          title: "Crear Usuario",
          breadcrumb: "Crear Usuario"
        }
      },
     {
      path: 'edit-user', component: EditUserComponent
     } 
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
