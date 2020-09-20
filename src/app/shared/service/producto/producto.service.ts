import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ProductoService{

  constructor(public http: HttpClient,
    public router: Router) { }

    saveProd(prodcuto: any){
      let url = 'prod/save';
    return this.http.post( url, prodcuto)
                .map( (resp: any) => {
                  return resp;
                });
    }

    getProdByestatus(estatus: string){
      let url = 'prod/insumos';
      return this.http.post( url, estatus)
                  .map( (resp: any) => {
                    return resp;
                  });
    }

    findByProdId(prodId : number){
      let url = 'prod/prod';
      return this.http.post( url, prodId)
                  .map( (resp: any) => {
                    return resp;
                  });
    }
}
