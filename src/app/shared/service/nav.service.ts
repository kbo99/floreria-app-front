import { Injectable, HostListener, Inject } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { WINDOW } from "./windows.service";
// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {

	public screenWidth: any
	public collapseSidebar: boolean = false

	constructor(@Inject(WINDOW) private window) {
		this.onResize();
		if (this.screenWidth < 991) {
			this.collapseSidebar = true
		}
	}

	// Windows width
	@HostListener("window:resize", ['$event'])
	onResize(event?) {
		this.screenWidth = window.innerWidth;
	}

	MENUITEMS: Menu[] = [
		{
			path: '/dashboard/default', title: 'Dashboard', icon: 'home', type: 'link', badgeType: 'primary', active: false
		},
		{
			title: 'Productos', icon: 'box', type: 'sub', active: false, children: [
				{
					title: 'Floreria', type: 'sub', children: [
						{ path: '/products/physical/sub-category', title: 'Insumos', type: 'link' },
						{ path: '/products/physical/product-list', title: 'Producto Configurado', type: 'link' },
						{ path: '/products/physical/product-detail', title: 'Detalle Producto', type: 'link' },
						{ path: '/products/physical/add-product', title: 'Agregar Producto', type: 'link' },
					]
				},
				
			]
		},
		{
			title: 'Ventas', icon: 'dollar-sign', type: 'sub', active: false, children: [
				{ path: '/sales/orders', title: 'Pedidos', type: 'link' },
				{ path: '/sales/transactions', title: 'Ventas', type: 'link' },
			]
		},
		{
			title: 'Promociones', icon: 'tag', type: 'sub', active: false, children: [
				{ path: '/coupons/list-coupons', title: 'Listado Promocion', type: 'link' },
				{ path: '/coupons/create-coupons', title: 'Crear Promocion', type: 'link' },
			]
		},
		// {
		// 	title: 'Pages', icon: 'clipboard', type: 'sub', active: false, children: [
		// 		{ path: '/pages/list-page', title: 'List Page', type: 'link' },
		// 		{ path: '/pages/create-page', title: 'Create Page', type: 'link' },
		// 	]
		// },
		// {
		// 	title: 'Media', path: '/media', icon: 'camera', type: 'link', active: false
		// },
		// {
		// 	title: 'Menus', icon: 'align-left', type: 'sub', active: false, children: [
		// 		{ path: '/menus/list-menu', title: 'Menu Lists', type: 'link' },
		// 		{ path: '/menus/create-menu', title: 'Create Menu', type: 'link' },
		// 	]
		// },
		{
			title: 'Usuario', icon: 'user-plus', type: 'sub', active: false, children: [
				{ path: '/users/list-user', title: 'Lista Usuarios', type: 'link' },
				{ path: '/users/create-user', title: 'Crear Usuario', type: 'link' },
			]
		},
		{
			title: 'Reportes', path: '/reports', icon: 'bar-chart', type: 'link', active: false
		},
		{
			title: 'Settings', icon: 'settings', type: 'sub', children: [
				{ path: '/settings/profile', title: 'Profile', type: 'link' },
			]
		},
		{
			title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
		}
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
