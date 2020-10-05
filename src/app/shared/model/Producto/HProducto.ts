import {ProductoVO} from './ProductoVO'
import {TpoMovProdVO} from './TpoMovProdVO'
export class HProducto {

    public  hpsId: number;


	public  hpsCantAnterior: number;

	
	public hpsCantidadMovimiento: number;

	
	public  hpsFecha:Date;

	
	public  producto: ProductoVO;
	
	
	public  hpsCantidadExi: number;

	
	public  tmpId: TpoMovProdVO;

	
	public  usuario: string;
	
	
	public  prodNombre:string;
	
	
	public  prodExistenciaActual: string;
	
	
	public  tpoMovimiento: string;
    constructor(){

    }
}