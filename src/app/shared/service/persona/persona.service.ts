import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';

import { Persona } from '../../model/Persona/Persona';

@Injectable({
	providedIn: 'root'
})

export class PersonaService {
    constructor(
        public http: HttpClient,
        public router: Router
      ) {
    }

    savePersona(persona: Persona){
        let url = 'personas/savePersona';
        console.log("Guardando Persona", persona);
        return this.http.post( url, persona)
                    .map( (resp: any) => {
                      return resp;
                    });
      }
     
      findPerByRfc(rfc: string) {
        let url = 'personas/busca/rfc/' + rfc;
        return this.http.get(url)
                    .map( (resp: any) => {
                      return resp;
                    });
      }

      findPerById(id: number) {
        let url = 'personas/busca/id/' + id;
        return this.http.get(url)
                    .map( (resp: any) => {
                      return resp;
                    });
      }

      findPerByNombre(perNombre: string, apePater: string) {
        let url = 'personas/busca/nombre';
       var persona = new Persona();
       persona.perNombre = perNombre;
       persona.perApePate = apePater;
        return this.http.post( url, persona)
                    .map( (resp: any) => {
                      return resp;
                    });
      }
}
