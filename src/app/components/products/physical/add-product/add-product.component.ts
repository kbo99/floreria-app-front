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


  constructor(private fb: FormBuilder, public http: HttpClient, 
    private _sanitizer: DomSanitizer, private router: Router, private productoService:ProductoService) {
    this.productForm = this.fb.group({
      prodNombre: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodCostoVenta: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodClave: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      prodDescrip: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      size: ['', Validators.required],
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
  this.producto.prodEstatus = 'PC';
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


findLstProd(){
  const _this = this;
    this.http.post('http://localhost:8005/prod/insumos','AC').subscribe({
      next: data => {
        this.lstProdTmp = data as Array<ProductoVO>;
        this.lstProdTmp.forEach(function(value) {
         
          if(value.imgDefault !== null && value.imgDefault.length > 0){
            value.img = "<img src='" + (_this._sanitizer.bypassSecurityTrustResourceUrl(value.imgDefault) as any).
            changingThisBreaksApplicationSecurity
            +"' class='imgTable'>"
          }
         // _this.lstProd.push(value);
        });

    
      this.source = new LocalDataSource(this.lstProdTmp)
   
      },
      error: error => console.error('There was an error!', error)

  });
}

insumos(){
  this.router.navigate([ 'products/physical/sub-category']);
}
}
