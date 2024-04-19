import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page.component';

const routes: Routes = [
  { 
    path: '', 
    component: CartPageComponent,
    children: [
      { 
        path: 'page-cart', 
        loadChildren: () => import('./cart-page.module').then(m => m.CartPageModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartPageRoutingModule { }
