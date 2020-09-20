import { Component, OnInit } from '@angular/core';
import { productDB } from 'src/app/shared/tables/product-list';
import { ProductoVO } from '../../../../shared/model/Producto/ProductoVO';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public product_list = []
  public producto: ProductoVO;
  public lstProd: ProductoVO[] = new Array();
  constructor(
    private _sanitizer: DomSanitizer, public http: HttpClient, private router: Router) {
    this.findLstProd();
  }

  ngOnInit() {}
  findLstProd(){
    const _this = this;
      this.http.post('http://localhost:8005/prod/insumos','PC').subscribe({
        next: data => {
          this.lstProd = data as Array<ProductoVO>;
          this.lstProd.forEach(function(value) {
           
            if(value.imgDefault !== null && value.imgDefault.length > 0){
              value.img = "<img src='" + (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgDefault) as any).
              changingThisBreaksApplicationSecurity
              +"' class='imgTable'>"
            }
           // _this.lstProd.push(value);
          });
  
        },
        error: error => console.error('There was an error!', error)
  
    });
  }
  edita(){
this.router.navigate['/physical/product-detail'];
  }
}
