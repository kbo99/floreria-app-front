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
						{ path: '/products/tipo-pro/tipo-producto', title: 'Tipo Producto', type: 'link' },
						{ path: '/products/physical/sub-category', title: 'Insumos', type: 'link' },
						{ path: '/products/physical/movimiento-insumo', title: 'Movimiento Insumos', type: 'link' },
						{ path: '/products/physical/product-list', title: 'Producto Configurado', type: 'link' },
						{ path: '/products/physical/add-product', title: 'Agregar Producto', type: 'link' },
					]
				},
				
			]
		},
		{
			title: 'Ventas', icon: 'dollar-sign', type: 'sub', active: false, children: [
				{ path: '/sales/orders', title: 'Ordenes', type: 'link' },
				{ path: '/sales/transactions', title: 'Transacciones', type: 'link' },
			]
		},
	//	{
		//	title: 'Cupones', icon: 'tag', type: 'sub', active: false, children: [
		//		{ path: '/coupons/list-coupons', title: 'lista de Cupones', type: 'link' },
		//		{ path: '/coupons/create-coupons', title: 'Crear Cupones', type: 'link' },
		//	]
		//},
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
			title: 'Usuarios', icon: 'user-plus', type: 'sub', active: false, children: [
				{ path: '/users/list-user', title: 'Lista de Usuarios', type: 'link' },
				{ path: '/users/create-user', title: 'Crear Usuarios', type: 'link' },
			]
		},
		//{
		//	title: 'Vendedores', icon: 'users', type: 'sub', active: false, children: [
		//		{ path: '/vendors/list-vendors', title: 'Lista de Vnededores', type: 'link' },
		//		{ path: '/vendors/create-vendors', title: 'Crear Vendedor', type: 'link' },
		//	]
		//},
		// {
		// 	title: 'Localization', icon: 'chrome', type: 'sub', children: [
		// 		{ path: '/localization/translations', title: 'Translations', type: 'link' },
		// 		{ path: '/localization/currency-rates', title: 'Currency Rates', type: 'link' },
		// 		{ path: '/localization/taxes', title: 'Taxes', type: 'link' },
		// 	]
		// },
		//{
		//	title: 'Reportes', path: '/reports', icon: 'bar-chart', type: 'link', active: false
		//},
		//{
		//	title: 'Configuracion', icon: 'settings', type: 'sub', children: [
		//		{ path: '/settings/profile', title: 'Perfirl', type: 'link' },
		//	]
		//},
		// {
		// 	title: 'Invoice', path: '/invoice', icon: 'archive', type: 'link', active: false
		// },
		// {
		// 	title: 'Login',path: '/auth/login', icon: 'log-in', type: 'link', active: false
		// }
	]
	// Array
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
