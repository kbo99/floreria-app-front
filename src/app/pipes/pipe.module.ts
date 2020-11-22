import { NgModule } from '@angular/core';
import { NombrePersonaPipe } from "./NombrePersonaPipe";
import { DireccionPipe } from "./direccion.pipe";

@NgModule({
  declarations: [NombrePersonaPipe, DireccionPipe],
  imports: [
  ],
  exports: [
    NombrePersonaPipe, DireccionPipe
  ]
})
export class PipeModule { }
