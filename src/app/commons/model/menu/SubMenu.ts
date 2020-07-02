import { Menu } from './menu';

export class SubMenu {

    public smeId: number;
    public smeNombre: String;
    public smedesc: String;
    public smeIcono: String;
    public smeURL: String;
    public menu: Menu;
    public smeOrden: Number;
    public subMenus: SubMenu[];

}