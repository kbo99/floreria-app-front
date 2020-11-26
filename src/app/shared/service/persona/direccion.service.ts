import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import 'rxjs/add/operator/map';
import { Direccion } from '../../model/Persona/Direccion';


@Injectable({
	providedIn: 'root'
})

export class DireccionService {
   
    constructor(
        public http: HttpClient,
        public router: Router
      ) { }

      findColByCp(cp: number) {
        let url = 'direccion/coloniacp/' + cp;
        return this.http.get( url)
                    .map( (resp: any) => {
                      return resp;
                    });
      }
    
      findByEntidadId(paisId:number) {
        let url = 'direccion/entidad/' + paisId;
        return this.http.get(url)
                    .map( (resp: any) => {
                      return resp;
                    });
      }
    
      finMunByEntId(entId: number) {
        let url = 'direccion/municipio/' + entId;
        return this.http.get(url)
                    .map( (resp: any) => {
                      return resp;
                    });
      }
    
      findColByMunId(munId: number) {
        let url = 'direccion/coloniamun/' + munId;
        return this.http.get(url)
                    .map( (resp: any) => {
                      return resp;
                    });
      }

      saveDireccion(dir: Direccion) {
        let url = 'direccion/saveDireccion';
        return this.http.post(url, dir)
                    .map( (resp: any) => {
                      return resp;
                    });
      }

}