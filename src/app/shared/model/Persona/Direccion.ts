import { Cosnt } from '../../utils/Const';
import { Colonia } from "./Colonia";
import { Persona } from './Persona';

export class Direccion {
  
  public dirId: number;

  public dirCalle: string;

  public dirMun: string;

  public dirNumExt: string;

  public dirNumInt: string;

  public colonia: Colonia;
  
  public dirFalta: Date;

  public persona: Persona;

  constructor() {
    this.colonia = new Colonia();
    this.dirId = Cosnt.getRandomInt(1,20);
    console.log("Aleatorio id",  this.dirId);
  }
private SPACE =  " ";
  public get toString () {
    var value: string = this.dirCalle + this.SPACE + this.dirNumExt;
    if (this.dirNumInt != null && this.dirNumInt.length > 0) value += this.SPACE + this.dirNumInt;
    if (this.colonia) value += this.SPACE + this.colonia.colNom;
    if (this.colonia.municipio) value += this.SPACE + this.colonia.municipio.nomMun
    if (this.colonia.municipio.entidad) value += this.SPACE + this.colonia.municipio.entidad.entNom;
    return value;
  }
}
