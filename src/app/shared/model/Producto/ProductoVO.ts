import { CategoriaProductoVO } from './CategoriaProductoVO';
import { TipoProductoVO } from './TipoProductoVO';
import { UnidadMedidaProdVO } from './UnidadMedidaProdVO';
import { Imagen } from '../Imagen/Imagen'
export class ProductoVO {

public prodId: number;

public prodCostoCompra: number;

public prodCostoVenta: number;

public prodDescrip: string;

public prodEstatus: string;

public prodFechaRegistro: Date;

public prodNombre: string;

public tipoProducto: TipoProductoVO;


public prodExistenciaMin: number;


public prodDesc: number;

public prodEsInsumo : boolean;

public prodClave: string;


public lstImg: Imagen [] = new Array();

public imgDefault: string;

public img;

public compHtml;

public tpoprodNombre;

public usuario: string;

public  cantidadMov: number;

public  tpoMov: number;

public lstProdHijo: ProductoVO[] = new Array();
constructor() {}

}