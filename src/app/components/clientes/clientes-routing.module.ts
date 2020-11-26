import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BuscaClienteComponent } from './busca-cliente/busca-cliente.component';
import { ClienteDireccionComponent } from './cliente-direccion/cliente-direccion.component';
import { NewPersonaComponent } from './new-persona/new-persona.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'new-persona',
        component: NewPersonaComponent,
        data: {
          title: "Cliente",
          breadcrumb: "Cliente"
        }
      },
      {
        path: 'busca-cliente',
        component: BuscaClienteComponent,
        data: {
          title: "Busca Cliente",
          breadcrumb: "Busca Cliente"
        }
      },
      {
        path: 'cliente-direccion',
        component: ClienteDireccionComponent,
        data: {
          title: "Direccion Cliente",
          breadcrumb: "Lista de Usuarios"
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CkientesRoutingModule { }
