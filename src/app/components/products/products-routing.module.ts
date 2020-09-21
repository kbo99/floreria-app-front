import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { TipoProductoComponent } from './tipo-pro/tipo-producto/tipo-producto.component';
import { SubCategoryDetailComponent } from './physical/sub-category-detail/sub-category-detail.component';
import { MovimientoInsumoComponent } from './physical/movimiento-insumo/movimiento-insumo.component';
import { MovimientoInsumoDetailComponent } from './physical/movimiento-insumo-detail/movimiento-insumo-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'physical/category',
        component: CategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'physical/sub-category',
        component: SubCategoryComponent,
        data: {
          title: "Insumos",
          breadcrumb: "Insumos"
        }
      },
      {
        path: 'physical/sub-category-detail',
        component: SubCategoryDetailComponent,
        data: {
          title: "Editar Insumo",
          breadcrumb: "Editar"
        }
      },
      {
        path: 'physical/movimiento-insumo',
        component: MovimientoInsumoComponent,
        data: {
          title: "Movimiento Insumo",
          breadcrumb: "Editar"
        }
      },
      
      {
        path: 'physical/movimiento-insumo-detail',
        component: MovimientoInsumoDetailComponent,
        data: {
          title: "Detalle Movimiento Insumo",
          breadcrumb: "Editar"
        }
      },
      {
        path: 'physical/product-list',
        component: ProductListComponent,
        data: {
          title: "Lista Productos",
          breadcrumb: "Lista Productos"
        }
      },
      {
        path: 'physical/product-detail',
        component: ProductDetailComponent,
        data: {
          title: "Detalle Producto",
          breadcrumb: "Detalle"
        }
      },
      {
        path: 'physical/add-product',
        component: AddProductComponent,
        data: {
          title: "Agregar Producto",
          breadcrumb: "Agregar"
        }
      },
      {
        path: 'digital/digital-category',
        component: DigitalCategoryComponent,
        data: {
          title: "Category",
          breadcrumb: "Category"
        }
      },
      {
        path: 'digital/digital-sub-category',
        component: DigitalSubCategoryComponent,
        data: {
          title: "Sub Category",
          breadcrumb: "Sub Category"
        }
      },
      {
        path: 'digital/digital-product-list',
        component: DigitalListComponent,
        data: {
          title: "Product List",
          breadcrumb: "Product List"
        }
      },
      {
        path: 'digital/digital-add-product',
        component: DigitalAddComponent,
        data: {
          title: "Add Products",
          breadcrumb: "Add Product"
        }
      },
      {
        path: 'tipo-pro/tipo-producto',
        component: TipoProductoComponent,
        data: {
          title: "Agregar Tipo Producto",
          breadcrumb: "Agregar Tipo"
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
