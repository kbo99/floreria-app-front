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

public tipoProductoVO: TipoProductoVO;


public prodExistenciaMin: number;


public prodDesc: number;



public prodClave: string;


public lstImg: Imagen [] = new Array();

public imgDefault: string;

public img;

constructor() {}

}