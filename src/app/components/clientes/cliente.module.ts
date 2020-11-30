import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CkientesRoutingModule } from './clientes-routing.module';


import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewPersonaComponent } from './new-persona/new-persona.component';
import { ClienteDireccionComponent } from './cliente-direccion/cliente-direccion.component';
import { BuscaClienteComponent } from './busca-cliente/busca-cliente.component';


@NgModule({
  declarations: [NewPersonaComponent, ClienteDireccionComponent, BuscaClienteComponent],
  imports: [
    CommonModule,
    NgbModule,
    Ng2SmartTableModule,
    ReactiveFormsModule,
    CkientesRoutingModule
  ]
})
export class ClientesModule { }
