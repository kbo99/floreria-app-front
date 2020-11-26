import { Municipio } from './Municipio';
export class Colonia {
    public  colId: number;

	public  colCp: string;

    public  colNom: string;
    
    public municipio: Municipio = new Municipio();

    constructor() { }
}