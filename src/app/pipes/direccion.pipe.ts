import { Pipe, PipeTransform } from '@angular/core';
import { Direccion } from '../shared/model/Persona/Direccion';
import { Persona } from '../shared/model/Persona/Persona';
@Pipe({
  name: 'dirPipe'
})
export class DireccionPipe implements PipeTransform {

    private SPACE = " ";

    transform(value: Direccion): any {
        var str: string = value.dirCalle + this.SPACE + value.dirNumExt;
        if (value.dirNumInt != null && value.dirNumInt.length > 0) str += this.SPACE + value.dirNumInt;
        if (value.colonia) str += this.SPACE + value.colonia.colNom;
        if (value.colonia.municipio) str += this.SPACE + value.colonia.municipio.nomMun
        if (value.colonia.municipio.entidad) str += this.SPACE + value.colonia.municipio.entidad.entNom;
        return str;
    }
}