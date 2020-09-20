import { Usuario } from "./Usuario";
import { Persona } from "../Persona/Persona";

export class RegisterUsuario {
    public usuario: Usuario;
    public persona: Persona;
    
    constructor() {
        this.usuario = new Usuario();
        this.persona = new Persona();
    }
}