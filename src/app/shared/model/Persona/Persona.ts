import { Direccion } from './Direccion';

export class Persona {
    public perId: number;
    public perApePate: string;
    public perApeMat: string;
    public perEmail: string;
    public perFalta: Date;
    public perNombre: string;
    public password: string;
    public perTelefono: string;
    public membresia: number;
    public perFnacimiento: Date;
    public perRfc: string;
    public direccions: Direccion[];
    
    constructor() { 
        this.perId = 0;
        this.direccions = []
    }
    
    get perNombreApe(): string {
    var nombre: string= "";
    nombre = this.perApePate != null ? this.perApePate : "";
    nombre = this.perApeMat != null ? nombre + " " + this.perApeMat : nombre;
    nombre = this.perNombre != null ? nombre + " " + this.perNombre : nombre;
    return nombre;
    }
   }