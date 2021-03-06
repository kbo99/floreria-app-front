import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CKEditorModule } from 'ngx-ckeditor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ProductsRoutingModule } from './products-routing.module';
import { CategoryComponent } from './physical/category/category.component';
import { SubCategoryComponent } from './physical/sub-category/sub-category.component';
import { ProductListComponent } from './physical/product-list/product-list.component';
import { AddProductComponent } from './physical/add-product/add-product.component';
import { DigitalCategoryComponent } from './digital/digital-category/digital-category.component';
import { DigitalSubCategoryComponent } from './digital/digital-sub-category/digital-sub-category.component';
import { DigitalListComponent } from './digital/digital-list/digital-list.component';
import { DigitalAddComponent } from './digital/digital-add/digital-add.component';
import { ProductDetailComponent } from './physical/product-detail/product-detail.component';
import { GalleryModule } from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { TipoProductoComponent } from './tipo-pro/tipo-producto/tipo-producto.component';
import { SubCategoryDetailComponent } from './physical/sub-category-detail/sub-category-detail.component';
import { MovimientoInsumoComponent } from './physical/movimiento-insumo/movimiento-insumo.component';
import { MovimientoInsumoDetailComponent } from './physical/movimiento-insumo-detail/movimiento-insumo-detail.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatMomentDateModule } from "@angular/material-moment-adapter"; 
import { MatNativeDateModule } from '@angular/material/core';
import { AddInsumoProdComponent } from './physical/add-insumo-prod/add-insumo-prod.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  maxFilesize: 50,
  url: 'https://httpbin.org/post',
};



@NgModule({
  declarations: [CategoryComponent, SubCategoryComponent,
     ProductListComponent, AddProductComponent, 
     DigitalCategoryComponent, DigitalSubCategoryComponent, 
     DigitalListComponent, DigitalAddComponent, ProductDetailComponent, 
     TipoProductoComponent, SubCategoryDetailComponent, MovimientoInsumoComponent, 
     MovimientoInsumoDetailComponent, AddInsumoProdComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
    ProductsRoutingModule,
    Ng2SmartTableModule,
    NgbModule,
    DropzoneModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatCheckboxModule,  
    MatRadioModule,
    GalleryModule.forRoot()
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
      
    },
    NgbActiveModal,
    DatePipe
  ]
})
export class ProductsModule { }
