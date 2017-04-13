import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ProductEditComponent } from './product-edit.component';
import { ProductEditInfoComponent } from './product-edit-info.component';
import { ProductEditTagsComponent} from './product-edit-tags.component';


import { ProductFilterPipe } from './product-filter.pipe';
import { ProductService } from './product.service';
import { ProductResolver,ProductListResolver } from './product-resolver-service'

import { SharedModule } from '../shared/shared.module';
import { ProductEditGuard } from './product-guard.service'

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([      
          {
            path:'',
            component: ProductListComponent,
            resolve: { products: ProductListResolver }
          },
          { 
            path:':id',
            component:ProductDetailComponent, 
            resolve: { product: ProductResolver } 
          },
          { 
            path:':id/edit',
            component:ProductEditComponent, 
           // canDeactivate:[ ProductEditGuard ],
            resolve: { product: ProductResolver },
            children:[
              { path:'', redirectTo:'info', pathMatch:'full'},
              { path:'info', component:ProductEditInfoComponent },
              { path:'tags', component: ProductEditTagsComponent }
            ] 
          }             
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService,
    ProductResolver,
    ProductListResolver,
    ProductEditGuard
  ]
})
export class ProductModule {}
