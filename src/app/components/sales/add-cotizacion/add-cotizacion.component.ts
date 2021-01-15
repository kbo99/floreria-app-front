import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbCalendar, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/shared/service/auth/auth-service';
import { Router } from '@angular/router';

import { PagoTipoVO } from 'src/app/shared/model/Venta/PagoTipoVO';
import { PagoMetodoVO } from 'src/app/shared/model/Venta/PagoMetodoVO';
import { VentaService } from 'src/app/shared/service/Venta/venta.service';
import { PersonaService } from 'src/app/shared/service/persona/persona.service';
import { Persona } from 'src/app/shared/model/Persona/Persona';
import { NombrePersonaPipe } from 'src/app/pipes/NombrePersonaPipe';
import { DireccionPipe } from 'src/app/pipes/direccion.pipe';
import { Direccion } from 'src/app/shared/model/Persona/Direccion';
import { HoraEntregaVO } from 'src/app/shared/model/Venta/HoraEntregaVO';
import { UsuarioService } from 'src/app/shared/service/usuarios/usuario-service';
import { Usuario } from 'src/app/shared/model/usuario/Usuario';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';
import { CaptacionVO } from 'src/app/shared/model/Venta/CaptacionVO';
import { OrdenVO } from 'src/app/shared/model/Venta/OrdenVO';
import { ProductoService } from 'src/app/shared/service/producto/producto.service';
import { ProductoVO } from 'src/app/shared/model/Producto/ProductoVO';

@Component({
  selector: 'app-add-cotizacion',
  templateUrl: './add-cotizacion.component.html',
  styleUrls: ['./add-cotizacion.component.scss']
})
export class AddCotizacionComponent implements OnInit {
  public generalForm: FormGroup;
  public cteBuscaClienteForm : FormGroup;
  public date: Date;
  public closeResult: string;

  minDate: Date;
  maxDate: Date;

  lstTipoPago : PagoTipoVO [] = new Array();
  lstMetodoPag : PagoMetodoVO [] = new Array();
  lstDirecCte : Direccion [] = new Array();
  lstHoraEntrega : HoraEntregaVO [] = new Array();
  lstIntervalos : HoraEntregaVO [] = new Array();
  lstHorarios : HoraEntregaVO [] = new Array();
  lstVendedor : Usuario [] = new Array();
  lstProd : ProductoVO [] = new Array();
  lstCaptacion : CaptacionVO [] = new Array();
  isDivInfoVisible : boolean = false;

  public clienteSelected : Persona;
  public personas: Persona[] = [];
  public dirSelected : Direccion;
  public detalleProducto : ProductoVO;

  public ordenVO : OrdenVO;

  public lstProd: ProductoVO[] = new Array();
  //constructor() {}

  constructor(private modalService: NgbModal,private _sanitizer: DomSanitizer, private router: Router, public _authService: AuthService,
    private formBuilder: FormBuilder, private calendar: NgbCalendar,  private datePipe: DatePipe,
    private ventaService : VentaService,
    private _personaService: PersonaService,
    private _usuarioService: UsuarioService,
    private productoService:ProductoService) { 

    private ventaService : VentaService, private productoService:ProductoService) { 
    this.createGeneralForm();
    this.findByPtipEstatus();
    this.findByPmetEstatus();
    this.findByHrenEstatus();
    this.findAllUsuarios();
    this.findLstProd();
    this.findByCapEstatus();
    this.findLstProd();
    const currentYear = new Date().getFullYear();
      
    this.minDate = new Date(currentYear, new Date().getMonth(), new Date().getDay()- 1);
    this.maxDate = new Date();
  }

  reset(){
    this.generalForm.reset();
    this.createGeneralForm();
    this.isDivInfoVisible = false;
  }

  ngOnInit(): void {
    this.createCteBuscaClienteForm();
  }

  createGeneralForm() {
    this.generalForm = this.formBuilder.group({
      fechaIni: [(new Date()).toISOString(),Validators.required],
      fechaEntrega: [(new Date()).toISOString(),Validators.required],
      ptipId: [''],
      pmetId: [''],
      ventaPrecioTotal: new FormControl({value: 0}, Validators.required),
      mtpId: [''],
      prodId: [''],
      ventaPrecioTotal: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      ventaPrecioProd: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      ventaPrecioEnvio: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      intervalo: [''],
      horaPref: [''],
      dirEnvio: [''],
      refEnvio: [''],
      nomDestinatario: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      telDestinatario: new FormControl({value: 0}, Validators.required),
      producto: [''],
      detProdutcto: new FormControl({value: '', disabled: true}),
      vendedor: [''],
      nomCatalogo: ['', [Validators.required, Validators.pattern('[a-zA-Z][a-zA-Z ]+[a-zA-Z]$')]],
      redCaptacion: [''],
      redContacto: ['']
    });
  }

  createCteBuscaClienteForm() {
    this.cteBuscaClienteForm = this.formBuilder.group({
      nombre: ['']
      ,lblNomCliente: new FormControl({value: '', disabled: true})
      ,dirId: ['']
      ,dirSelected: new FormControl({value: '', disabled: true})
    })
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

  findByHrenEstatus(){
    this.ventaService.findByHrenEstatus('AC').subscribe(
      correcto => {
        //Obtenemos los horarios
        this.lstHoraEntrega = correcto as Array<HoraEntregaVO>;
        //Filtramos por los horarios que son intervalos
        this.lstIntervalos = this.lstHoraEntrega.filter(horaEntrega => horaEntrega.hrenIdPadre === null);
    },
     error => {
       console.error("error al ejecutar findByHrenEstatus");
     });
  }

  /**
   * Se obtiene a los vendedores
   */
  findAllUsuarios(){
    this._usuarioService.findAll().subscribe(
      correcto => {
        this.lstVendedor = correcto as Array<Usuario>;
    },
     error => {
       console.error("error al ejecutar findAllUsuarios");
     });
  }

  /** Obtemos la lista de productos configurados */
  findLstProd(){
    const _this = this;
    //Obtemos los insumos de la tabla productos, con estatus ACTIVO (AC) y especificamos que el producto NO es insumo (false)
    this.productoService.getProdByestatus('AC', false).subscribe(
      correcto => {
        this.lstProd = correcto as Array<ProductoVO>;
    },
     error => {
       console.error("error al ejecutar findLstProd");
     } );
    
  }

  findByCapEstatus(){
    this.ventaService.findByCapEstatus('AC').subscribe(
      correcto => {
        this.lstCaptacion = correcto as Array<CaptacionVO>;
    },
     error => {
       console.error("error al ejecutar findByCapEstatus");
     });
  }

  open(content) {

    this.personas = null;
    this.isDivInfoVisible = false;
    this.cteBuscaClienteForm.get('dirSelected').setValue("");
    this.generalForm.get('dirEnvio').setValue("");
    this.generalForm.get('nomDestinatario').setValue("");

    var perNombre: string = this.cteBuscaClienteForm.get('nombre').value;
    
    //Se valida que hayan capturado  
    if (perNombre != "") {
      this._personaService.findPerByNombre(perNombre, null).subscribe(item => {
        this.personas = item;
        //Validamos si la consulta trae resultados para mostrat el popup
        if (item.length > 0) {
          this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;      
          }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          });
        }
      } );
    }
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

  /**
   * Cachamos el cliente seleccionado
   * @param event 
   */
  selectCliente(event) {
    this.modalService.dismissAll();

    //Mostramos los datos del cliente seleccinado
    this.isDivInfoVisible = true;
    this.clienteSelected = event.data as Persona;
    this.cteBuscaClienteForm.get('lblNomCliente').setValue(this.clienteSelected.perNombre);
    this.generalForm.get('nomDestinatario').setValue(this.clienteSelected.perNombre);
    //document.getElementById('lblNomCliente').innerHTML = this.clienteSelected.perNombre;
    this.lstDirecCte = this.clienteSelected.direccions;
  }

  /**
   * Cachamos la direccion seleccionada
   * @param dirId
   */
  onChangeDirCte(dirId) { 
    var dirCompleta : string;
    //Buscamos la direccion seleccionada
    this.lstDirecCte.forEach(element => {
      if (element.dirId == dirId) {
        this.dirSelected = element;
      }
    });
    //Obtenemos la direccion completa
    dirCompleta = new DireccionPipe().transform(this.dirSelected);

    //Asignamos la direccion completa
    this.cteBuscaClienteForm.get('dirSelected').setValue(dirCompleta);
    this.generalForm.get('dirEnvio').setValue(dirCompleta);
  }

  /**
   * Cachamos el intervalo de horario seleccionado
   * @param hrenId
   */
  onChangeIntervalo(hrenId) { 
    //console.log("Direccion: ", hrenId);
    if (this.lstHorarios && this.lstHoraEntrega.length > 0) {
      this.lstHorarios = this.lstHoraEntrega.filter(horaEntrega => horaEntrega.hrenIdPadre == hrenId);
    }
  }

  /**
   * Chamos el producto seleccionado para poder obtener su detalle
   * @param prodId
   */
  onChangeProducto(prodId) { 
    //Buscamos el producto seleccionado
    this.lstProd.forEach(element => {
      if (element.prodId == prodId) {
        this.detalleProducto = element;
      }
    });
    //Asignamos el detalle del producto seleccionado
    this.generalForm.get('detProdutcto').setValue(this.detalleProducto.prodDescrip);
    //Asignamos el costo del producto seleccionado
    this.generalForm.get('ventaPrecioProd').setValue(this.detalleProducto.prodCostoVenta);
  }

  public settings = {
    mode: 'external',
    actions: {      
      columnTitle: 'Acciones',
      add: false,
      edit: true,
      delete: false,
      position: 'right',
      custom: [
         { name: 'viewrecord', title: '<i class="fa fa-clone"></i>'}
       ]
    },
    columns: {
      perId: {
        title: 'ID',
        type: 'string',
        filter: false
      },
      perNombre: {
        title: 'Nombre',
        type: 'string',
        filter: false,
        valuePrepareFunction: (cell, row) => {
         return new NombrePersonaPipe().transform(row,2);
         }
      },
    }
    
  };

  onSubmit() {
    // console.log("submit: ", this.accountForm.value);
    
    this.ordenVO = new OrdenVO();
    this.ordenVO.ordenEstatus.oesId = 1;
    this.ordenVO.perId = this.clienteSelected;
    this.ordenVO.usuId.usuId = this.generalForm.get('vendedor').value;
    this.ordenVO.prodId.prodId = this.generalForm.get('producto').value;
    this.ordenVO.ordCatalogo = this.generalForm.get('nomCatalogo').value;
    this.ordenVO.ordFpedido = this.generalForm.get('fechaIni').value;
    this.ordenVO.ordFentrega = this.generalForm.get('fechaEntrega').value;
    this.ordenVO.hrenIdIntervalo.hrenId = this.generalForm.get('intervalo').value;
    this.ordenVO.hrenIdHora.hrenId = this.generalForm.get('horaPref').value;
    this.ordenVO.ordDireccion = this.generalForm.get('dirEnvio').value;
    this.ordenVO.ordReferencia = this.generalForm.get('refEnvio').value;
    this.ordenVO.ordDestinatario = this.generalForm.get('nomDestinatario').value;
    this.ordenVO.ordDtelefono = this.generalForm.get('telDestinatario').value;
    this.ordenVO.capIdCaptacion.capId = this.generalForm.get('redCaptacion').value;
    this.ordenVO.capIdContacto.capId = this.generalForm.get('redContacto').value;
    this.ordenVO.ordPrecioProd = this.generalForm.get('ventaPrecioProd').value;
    this.ordenVO.ordPrecioEnvio = this.generalForm.get('ventaPrecioEnvio').value;
    this.ordenVO.ordPrecioTotal = this.generalForm.get('ventaPrecioTotal').value;
    this.ordenVO.ptipId.ptipId = this.generalForm.get('ptipId').value;
    this.ordenVO.pmetId.pmetId = this.generalForm.get('pmetId').value;

    
    console.log("Orden: ",this.ordenVO);

    this.ventaService.generaOrden(this.ordenVO).subscribe(
      correcto => this.ngOnInit(),
      error => console.error("Error al guardar la ordenUsuario", error));

    /*
    this.usuario.usuPassword = this.accountForm.get('password').value
    this.usuario.persona.perNombre =  this.accountForm.get('perNombre').value
    this.usuario.persona.perApePate =  this.accountForm.get('perApePate').value
    this.usuario.persona.perApeMat =  this.accountForm.get('perApeMate').value
    this.usuario.persona.perEmail =  this.accountForm.get('perEmail').value
    this.usuario.usuUsuario =  this.accountForm.get('perEmail').value
  
    this._usuarioService.generateUserN(this.usuario).subscribe(
            correcto => this.ngOnInit(),
            error => console.error("Error al guardar Usuario", error));
    */
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
