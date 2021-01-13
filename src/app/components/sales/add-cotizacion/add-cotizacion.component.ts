import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
import { Router } from '@angular/router';

import { PagoTipoVO } from 'src/app/shared/model/Venta/PagoTipoVO';
import { PagoMetodoVO } from 'src/app/shared/model/Venta/PagoMetodoVO';
import { VentaService } from 'src/app/shared/service/Venta/venta.service';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.scss']
})
export class AddCotizacionComponent implements OnInit {
  public generalForm: FormGroup;
  public date: Date;

  minDate: Date;
  maxDate: Date;

  lstTipoPago : PagoTipoVO [] = new Array();
  lstMetodoPag : PagoMetodoVO [] = new Array();

  public lstProd: ProductoVO[] = new Array();
  //constructor() {}

  constructor(private _sanitizer: DomSanitizer, private router: Router, public _authService: AuthService,
    private formBuilder: FormBuilder, private calendar: NgbCalendar,  private datePipe: DatePipe,
    private ventaService : VentaService, private productoService:ProductoService) { 

    this.createGeneralForm();
    this.findByPtipEstatus();
    this.findByPmetEstatus();
    this.findLstProd();
    const currentYear = new Date().getFullYear();
      
    this.minDate = new Date(currentYear, new Date().getMonth(), new Date().getDay()- 1);
    this.maxDate = new Date();
  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      fechaIni: [(new Date()).toISOString(),Validators.required],
      fechaEntrega: [(new Date()).toISOString(),Validators.required],
      ptipId: [''],
      mtpId: [''],
      prodId: [''],
      ventaPrecioTotal: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      ventaPrecioProd: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      ventaPrecioEnvio: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      direccion: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
    });
  }

  findByPtipEstatus(){
    this.ventaService.findByPtipEstatus('AC').subscribe(
      correcto => {
        this.lstTipoPago = correcto as Array<PagoTipoVO>;
    },
     error => {
       console.error("error al ejecutar findByPtipEstatus");
     });
  }

  findByPmetEstatus(){
    this.ventaService.findByPmetEstatus('AC').subscribe(
      correcto => {
        this.lstMetodoPag = correcto as Array<PagoMetodoVO>;
    },
     error => {
       console.error("error al ejecutar findByPmetEstatus");
     });
  }


  reset(){
    this.generalForm.reset();
    this.createGeneralForm();
  }

  ngOnInit(): void {
  }

  findLstProd(){
    const _this = this;
    //Obtemos los insumos de la tabla productos, con estatus ACTIVO (AC) y especificamos que el producto NO es insumo (false)
    this.productoService.getProdByestatus('AC', false).subscribe(
      correcto => {
        this.lstProd = correcto as Array<ProductoVO>;
       
    },
     error => {
       console.error("Usuario o contraseña invalidos");
     } );
    
  }

}
