import { Component, OnInit } from '@angular/core';
import { categoryDB } from 'src/app/shared/tables/category';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductoVO } from '../../../../shared/model/Producto/ProductoVO';
import { Imagen } from '../../../../shared/model/Imagen/Imagen';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';

import { ProductoService} from '../../../../shared/service/producto/producto.service';
import { Cosnt } from 'src/app/shared/utils/Const';
import { Router } from '@angular/router';
import { TipoProductoVO } from 'src/app/shared/model/Producto/TipoProductoVO';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent implements OnInit {
  public closeResult: string;
  public sub_categories = []
  public productForm: FormGroup;
  public tpoForm: FormGroup;
  public counter: number = 1;
  public producto: ProductoVO;
  public lstImg: Imagen[] = new Array();
  public lstProd: ProductoVO[] = new Array();
  public lstProdTmp: ProductoVO[] = new Array();
  lstTpoProd:TipoProductoVO [] = new Array();
  tipoProducto: TipoProductoVO = new TipoProductoVO();
  source : LocalDataSource;
  lastClickTime: number = 0;
  public url = [{
    img: "assets/images/user.png",
  },
  ]

  constructor(private modalService: NgbModal, private reference: NgbModal,private fb: FormBuilder,
    private _sanitizer: DomSanitizer, private productoService:ProductoService, private router: Router, 
    public _authService: AuthService, private activeModal: NgbActiveModal) {
    this.productForm = this.fb.group({
      prodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodCostoCompra: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodCostoVenta: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodClave: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      tpoprodId: ['',Validators.required],
    });

    this.tpoForm = this.fb.group({
      tpoprodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      tpoprodDecrip: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    });
   
  }


  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  opentpo(content) {

    this.reference.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.activeModal.close();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  public dismiss(): void {
    this.activeModal.dismiss(false);
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
  onUserRowSelect(event) { 
   
    if (this.lastClickTime === 0) {
      this.lastClickTime = new Date().getTime();
    } else {
      const change = (new Date().getTime()) - this.lastClickTime;
      if (change < 800) {
        sessionStorage.setItem(Cosnt.INS_CONFIG,JSON.stringify(event.data));
    this.router.navigate([ 'products/physical/sub-category-detail']);
      }
      this.lastClickTime = 0;
    }
} 



  public settings = {
    actions: false,
    columns: {
      img: {
        title: 'Imagen',
        type: 'html',
        editable: false,
        filter: false,
        select: false,
      },
      prodNombre: {
        title: 'Nombre',
        editable: false,
      },
      prodClave: {
        title: 'Codigo',
        editable: false,
      },
      tpoprodNombre: {
        title: 'Tipo Producto',
        editable: false,
        
      },
      prodCostoCompra: {
        title: 'Precio',
        editable: false,
      },
      prodExistenciaMin: {
        title: 'Existencia',
        editable: false,
        
      },
      compHtml: {
        title: 'Estatus',
        type: 'html',
        editable: true,
        filter: false
      },
      
    },
  };

  
  increment() {
    this.counter += 1;
  }

  decrement() {
    if (this.counter > 1) {
      this.counter -= 1;
    }
  }

  onChangeEvent_NumProd(event: any){
    this.counter = event.target.value;
  }

  onlyNumberKey(event) { 
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57; 
  }
  
  //FileUpload
  readUrl(event: any, i) {
    if (event.target.files.length === 0)
      return;
    //Image upload validation
    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    // Image upload
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      if(i >= this.lstImg.length){
        let img:Imagen = new Imagen();
        img.imgId = 0;
        img.imgUrl = reader.result.toString();
        this.lstImg.push(img);
      }else {
        this.lstImg[i].imgUrl = reader.result.toString();
      }
     this.url[i].img = reader.result.toString();
    }
  }

  ngOnInit() {
   this.findLstProd();
   this.findTpoLstProd();
  }
save(){

    this.producto = this.productForm.value;
  this.producto.prodExistenciaMin = this.counter;
  this.producto.lstImg = this.lstImg;
  this.producto.prodEstatus = 'AC';
  this.producto.tipoProducto = new TipoProductoVO();
  this.producto.tipoProducto.tpoprodId = this.productForm.value.tpoprodId;
  this.producto.usuario = this._authService.payload.user_name;
  this.productoService.saveProd(this.producto).subscribe(
    correcto => {this.modalService.dismissAll('Cross click');
    this.producto = new ProductoVO();
    this.productForm.reset();
    this.counter = 0;
    this.url[0].img = "assets/images/user.png";
    this.findLstProd()},
   error => {
     console.error("Usuario o contraseña invalidos");
   } );
}
 
findLstProd(){
  const _this = this;
  this.productoService.getProdByestatus('AC').subscribe(
    correcto => {
      this.lstProdTmp = correcto as Array<ProductoVO>;
      console.log(correcto)
        this.lstProdTmp.forEach(function(value) {
    
          if(value.imgDefault !== null && value.imgDefault.length > 0){
            value.img = "<img src='" + (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgDefault) as any).
            changingThisBreaksApplicationSecurity
            +"' class='imgTable'>"
          }
          value.compHtml = "<i class='fa fa-circle font-success f-12'></i>";  
          value.tpoprodNombre = "";
          if(value.tipoProducto !== null){
            value.tpoprodNombre = value.tipoProducto.tpoprodNombre;
          }
        
    });
    this.source = new LocalDataSource(this.lstProdTmp)
  },
   error => {
     console.error("Usuario o contraseña invalidos");
   } );


}
toggleMe(id: any): void {
  console.log(event); 
  //sessionStorage.setItem(Cosnt.PROD_CONFIG,JSON.stringify(id));
 // this.router.navigate([ 'products/physical/add-product']);
}

findTpoLstProd(){
  this.productoService.getTpoProdByestatus('AC').subscribe(
    correcto => {
      this.lstTpoProd = correcto as Array<TipoProductoVO>;
        
  },
   error => {
     console.error("Usuario o contraseña invalidos");
   } );


}

saveTpo(){
  this.tipoProducto = new TipoProductoVO();
  this.tipoProducto = this.tpoForm.value;
  this.tipoProducto.tpoprodEstatus = 'AC';
  this.productoService.saveTpoProd(this.tipoProducto).subscribe(
    correcto =>  {this.tipoProducto = new TipoProductoVO();
    this.  findTpoLstProd();
    this.tpoForm.reset();
    this.dismiss();
    Swal.fire({
      title: 'Aviso',
      text: 'Se guardo Tipo Producto con Exito \n',
    });},
   error => {
     console.error("Usuario o contraseña invalidos");
   } );


}

}
