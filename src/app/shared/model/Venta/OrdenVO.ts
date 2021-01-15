import { OrdenEstatusVO } from "./OrdenEstatusVO";
import { HoraEntregaVO } from "./HoraEntregaVO";
import { CaptacionVO } from "./CaptacionVO";
import { PagoTipoVO } from "./PagoTipoVO";
import { PagoMetodoVO } from "./PagoMetodoVO";
import { Persona } from '../Persona/Persona';
import { Usuario } from '../usuario/Usuario';
import { ProductoVO } from '../Producto/ProductoVO';

export class OrdenVO{

    public ordId : number;
    public ordenEstatus : OrdenEstatusVO;
    public perId : Persona;
    public usuId : Usuario;
    public prodId : ProductoVO;
    public ordCatalogo : string;
    public ordFpedido : Date;
    public ordFentrega : Date;
    public hrenIdIntervalo : HoraEntregaVO;
    public hrenIdHora : HoraEntregaVO;
    public ordDireccion : string;
    public ordReferencia : string;
    public ordDestinatario : string;
    public ordDtelefono : string;
    public capIdCaptacion : CaptacionVO;
    public capIdContacto : CaptacionVO;
    public ordPrecioProd : number;
    public ordPrecioEnvio : number;
    public ordPrecioTotal : number;
    public ptipId : PagoTipoVO;
    public pmetId : PagoMetodoVO;
    public ordFcreacion : Date;
    public ordFmodifica : Date;


    public oesNombre : string;
    public oesDescripcion : string;
    public oesEstatus : string;

    constructor(){
        this.ordenEstatus = new OrdenEstatusVO();
        this.perId = new Persona;
        this.usuId = new Usuario;
        this.prodId = new ProductoVO;
        this.hrenIdIntervalo = new HoraEntregaVO;
        this.hrenIdHora = new HoraEntregaVO;
        this.capIdCaptacion = new CaptacionVO;
        this.capIdContacto = new CaptacionVO;
        this.ptipId = new PagoTipoVO;
        this.pmetId = new PagoMetodoVO;
    }
}