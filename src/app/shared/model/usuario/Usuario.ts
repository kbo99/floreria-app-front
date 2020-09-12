import { Grupo } from "./Grupo";
import { PayLoad } from './PayLoad';
import { BrowserStack } from 'protractor/built/driverProviders';

export class Usuario {
    constructor(
        public usuId: number = 0,
        public usuUsuario: string = "",
        public password: string ="",
        public grupos: Grupo [ ] = [],
        public perId: number = 0,
         public usuEstatus: string = "AC"

    ) {}
    
    public cargaUsuario(payload: PayLoad): void {
        this.usuUsuario = payload.user_name;
        this.perId = payload.perId;
        console.log(payload);
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
}