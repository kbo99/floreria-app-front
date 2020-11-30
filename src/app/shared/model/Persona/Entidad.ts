import { Pais } from "./Pais";

export class Entidad {
    public  entId?: number;

	public  entAbr?: string;

	public  entNom?: string;

    public  pais?: Pais;
    
    constructor() { }
}