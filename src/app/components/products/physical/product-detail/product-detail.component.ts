import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Image } from '@ks89/angular-modal-gallery';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { ProductoVO } from '../../../../shared/model/Producto/ProductoVO';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';

import { ProductoService} from '../../../../shared/service/producto/producto.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
  providers: [NgbRatingConfig]
})
export class ProductDetailComponent implements OnInit {
  public closeResult: string;
  public counter: number = 1;
  public lstProdTmp: ProductoVO[] = new Array();
  source : LocalDataSource;
  producto:ProductoVO = new ProductoVO();

  public imagesRect: Image[] = [
    new Image(0, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(1, { img: 'assets/images/pro3/27.jpg' }, { img: 'assets/images/pro3/27.jpg' }),
    new Image(2, { img: 'assets/images/pro3/1.jpg' }, { img: 'assets/images/pro3/1.jpg' }),
    new Image(3, { img: 'assets/images/pro3/2.jpg' }, { img: 'assets/images/pro3/2.jpg' })]


  constructor(private modalService: NgbModal, config: NgbRatingConfig, 
    private router:Router, public http: HttpClient, private _sanitizer: DomSanitizer,private productoService:ProductoService) {
    config.max = 5;
    config.readonly = false;
    this.  findLstProd();
    this.  findLstProdLsrt();
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
  }

  ngOnInit() {
  }


  findLstProd(){
    const _this = this;
    this.productoService.findByProdId(1).subscribe(
      correcto => {  this.producto = correcto as ProductoVO;
        _this.imagesRect = new Array()
        let index = 0;
        this.producto.lstImg.forEach(function(value) {
          
          _this.imagesRect.push(new Image(0, { img: (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgUrl) as any).
            changingThisBreaksApplicationSecurity }, { img: (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgUrl) as any).
              changingThisBreaksApplicationSecurity }));
              index++;
    });
      },
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
      
  }
  public settings = {
    actions: false,
    columns: {
      img: {
        title: 'Imagen',
        type: 'html',
        editable: false,
        filter: false
      },
      prodNombre: {
        title: 'Nombre',
        editable: false,
      },
      prodExistenciaMin: {
        title: 'Cantidad',
        editable: false,
        
      },
      status: {
        title: 'Estatus',
        type: 'html',
        editable: false,
        filter: false
      },
      
    },
  };


findLstProdLsrt(){
  const _this = this;
   
}
}
