import { Persona } from '../Persona/Persona';
import { Grupo } from "./Grupo";
import { PayLoad } from './PayLoad';

export class Usuario {
    constructor(
        public usuId: number = 0,
        public usuUsuario: string = "",
        public usuPassword: string ="",
        public grupos: Grupo [ ] = [],
        public perId: number = 0,
        public usuEstatus: string = "AC",
        public persona?: Persona

    ) {
        persona = new Persona();
    }


    public cargaUsuario(payload: PayLoad): void {
        this.usuUsuario = payload.user_name;
        this.perId = payload.perId;
       // console.log(payload);
        payload.authorities.forEach( grupo => {
            let group: Grupo = new Grupo();
            group.grpNombre = grupo;
            this.grupos.push(group);
        } )
    }
    
     /**
     * Devuelve si el usuario pertenece al gfrupo asignado
     * @param group 
     */
    public hashGrup(group: String):boolean {
        if (group == null || group.length == 0) return false;
        let valid: boolean = false;
        this.grupos.forEach(grupo => {
           // console.log("Role: " + grupo.grpNombre);
            if (grupo.grpNombre == group) {
            //    console.log("Role Valid");
                valid = true; 
            } 
        });
        return valid; 
    }

    public addGroup(role: Grupo): void {
        var existe: boolean = false;
        this.grupos.forEach(grupo => {
            // console.log("Role: " + grupo.grpNombre);
             if (grupo.grpNombre == role.grpNombre) existe = true; 
         });
         if (!existe) this.grupos.push(role);
    }

    public removeGroup(role: Grupo): void {
        this.grupos.filter(item => item.grpNombre != role.grpNombre);
    }
}