import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {ProductoVO} from '../../../../shared/model/Producto/ProductoVO';
import { Imagen } from '../../../../shared/model/Imagen/Imagen';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductoService} from '../../../../shared/service/producto/producto.service';
import { Cosnt } from '../../../../shared/utils/Const';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public productForm: FormGroup;
  public counter: number = 1;
  public producto: ProductoVO;
  public lstImg: Imagen[] = new Array();
  currVerifiedLoanOfficerPhoto;
  public lstProdTmp: ProductoVO[] = new Array();
  source : LocalDataSource;
  @ViewChild('imgRef') img:ElementRef;
 private _imgg = '';
   public url = [{
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  },
  {
    img: "assets/images/user.png",
  }
  ]

prodTmp:string;
  constructor(private fb: FormBuilder, public http: HttpClient, 
    private _sanitizer: DomSanitizer, private router: Router, 
    private productoService:ProductoService, private auth:AuthService) {

      
      if(sessionStorage.getItem(Cosnt.PROD_CONFIG) !== null 
      || sessionStorage.getItem(Cosnt.PROD_ADD_IN) !== null){
        this.parseParamSession(sessionStorage.getItem(Cosnt.PROD_CONFIG) !== null ? Cosnt.PROD_CONFIG :
        Cosnt.PROD_ADD_IN);
       
       }else{
        this.productForm = this.fb.group({
          prodId: [0],
          prodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodCostoVenta: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodDescrip: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        });
       }
      
   
  }

  parseParamSession(param:any){
    this.producto = JSON.parse(sessionStorage.getItem(param)) as ProductoVO;
    sessionStorage.removeItem(param);
    this.initComp();
    if(param === Cosnt.PROD_ADD_IN){
      this.findLstProd();
    }
  }

  initComp(){

     //Se recupera todo el detalle del producto, para obtener las imagenes relacionadas
     //this.productoService.findByProdId(this.producto.prodId).subscribe(
      //correcto => {
        //this.producto =  correcto as ProductoVO;
        //console.log(correcto);

        if(this.producto.lstImg && this.producto.lstImg !== undefined && this.producto.lstImg !== null && 
          this.producto.lstImg.length > 0){
    
          this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(Cosnt.amazon_s3_endpoint + this.producto.lstImg[0].imgUrl) as any).
          changingThisBreaksApplicationSecurity;
        }
        this.productForm = this.fb.group({
          prodId: [this.producto.prodId],
          prodNombre: [this.producto.prodNombre, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodCostoVenta: [this.producto.prodCostoVenta, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
          prodDescrip: [this.producto.prodDescrip, [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
        });
        let indexImg:number = 0;
        const _this = this;
        this.producto.lstImg.forEach(function(value) {
         _this.url[indexImg].img =    
        (_this._sanitizer.bypassSecurityTrustResourceUrl(Cosnt.amazon_s3_endpoint + value.imgUrl) as any).
            changingThisBreaksApplicationSecurity;
            indexImg++;
         
       // });


      });
  }


  public get imgg() : SafeHtml {
     return this._sanitizer.bypassSecurityTrustResourceUrl(this._imgg);
  }
  increment() {
    this.counter += 1;
  }

  decrement() {
    this.counter -= 1;
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
     this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.url[0].img ) as any).
    changingThisBreaksApplicationSecurity;
    }
  }

  ngOnInit() {
    //this.findLstProd();
  }
save(){
  this.producto = this.productForm.value;
  this.producto.prodExistenciaMin = this.counter;
  this.producto.lstImg = this.lstImg;
  this.producto.prodEstatus = 'AC';
  this.producto.usuario = this.auth.payload.user_name;
  this.producto.lstProdHijo = this.lstProdTmp; 
  this.productoService.saveProd(this.producto).subscribe(
    correcto => { Swal.fire({
      title: 'Aviso',
      text: 'Se guardo Producto con Exito \n',
    });
    this.producto = correcto as ProductoVO;
    this.currVerifiedLoanOfficerPhoto = (this._sanitizer.bypassSecurityTrustResourceUrl(this.producto.lstImg[0].imgUrl) as any).
    changingThisBreaksApplicationSecurity;},
   error => {
     console.error("Usuario o contraseña invalidos");
   } );

}
 
public settings = {
  actions: false,
  columns: {
    prodClave: {
      title: 'Codigo',
      editable: false,
    },
    prodNombre: {
      title: 'Nombre',
      editable: false,
    },
    cantidadMov: {
      title: 'Cantidad',
      editable: false,
      
    },
    
  },
};


findLstProd(){
  this.lstProdTmp = this.producto.lstProdHijo as Array<ProductoVO>;
   
    this.source = new LocalDataSource(this.lstProdTmp)
 
}

insumos(){
if(this.producto === undefined)
  this.producto = new ProductoVO();  


  this.producto.prodCostoVenta = this.productForm.value.prodCostoVenta;
  this.producto.prodDescrip = this.productForm.value.prodDescrip;
  this.producto.prodNombre = this.productForm.value.prodNombre;

this.producto.prodExistenciaMin = this.counter;


 
if(this.lstImg.length > 0){
  this.lstImg.forEach(item =>{
    this.producto.lstImg.push(item);
  });
}
console.log(this.producto.lstImg);
this.producto.lstProdHijo = this.lstProdTmp
sessionStorage.setItem(Cosnt.INS_CONFIG,JSON.stringify(this.producto));
this.router.navigate([ 'products/physical/add-pin']);
 
  
}
}
