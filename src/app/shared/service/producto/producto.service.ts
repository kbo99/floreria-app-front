import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ProductoVO } from '../../model/Producto/ProductoVO';

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

    getProdByestatus(estatus: string, esInsumo: boolean){
      let url = 'prod/insumos';
      let param = new ProductoVO();
      param.prodEstatus = estatus;
      param.prodEsInsumo = esInsumo;

      return this.http.post( url, param)
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

    saveTpoProd(prodcuto: any){
      let url = 'prod/savetpo';
    return this.http.post( url, prodcuto)
                .map( (resp: any) => {
                  return resp;
                });
    }

    getTpoProdByestatus(estatus: string){
      let url = 'prod/tpoprod';
      return this.http.post( url, estatus)
                  .map( (resp: any) => {
                    return resp;
                  });
    }

    getTpoMovByestatus(){
      let url = 'prod/tpomov';
      return this.http.post( url, null)
                  .map( (resp: any) => {
                    return resp;
                  });
    }


    saveHstProd(prodcuto: any){
      let url = 'prod/saveHtpo';
    return this.http.post( url, prodcuto)
                .map( (resp: any) => {
                  return resp;
                });
    }

    findByParams(params: any){
      let url = 'prod/findByParam';
      return this.http.post( url, params)
                  .map( (resp: any) => {
                    return resp;
                  });
    }

    updateProd(prodcuto: any){
      let url = 'prod/updateProd';
    return this.http.post( url, prodcuto)
                .map( (resp: any) => {
                  return resp;
                });
    }
}
