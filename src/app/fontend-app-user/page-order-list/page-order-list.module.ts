import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageOrderListComponent } from './page-order-list.component';
import { PageOrderListRoutingModule } from './page-order-list.routing.module';


@NgModule({
  declarations: [
    PageOrderListComponent
  ],
  imports: [
    CommonModule,
    PageOrderListRoutingModule
  ]
})
export class PageOrderListModule { }