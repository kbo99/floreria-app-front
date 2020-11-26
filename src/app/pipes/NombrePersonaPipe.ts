import { Pipe, PipeTransform } from '@angular/core';
import { Persona } from '../shared/model/Persona/Persona';
@Pipe({
  name: 'nombrePersona'
})
export class NombrePersonaPipe implements PipeTransform {
  /**
   *
   * @param value Persona
   * @param tipo orden del nombre
   *   1 = apePat + Pae mat + nombre
   *   2 = nombre + apr pat + ape mat
   */
  transform(value: Persona, tipo: number = 1): any {
    var nombre: string = "";
    if (value) {
      if (tipo == 1) {
        nombre = value.perApePate != null ? value.perApePate : "";
        nombre = value.perApeMat != null ? nombre + " " + value.perApeMat : nombre;
        nombre = value.perNombre != null ? nombre + " " + value.perNombre : nombre;
      }
      else if (tipo == 2) {
        nombre = value.perNombre != null ? value.perNombre : nombre;
        nombre = value.perApePate != null ? nombre + " " + value.perApePate : nombre;
        nombre = value.perApeMat != null ? nombre + " " + value.perApeMat : nombre;
      }
    }
    return nombre; 
  }
}
