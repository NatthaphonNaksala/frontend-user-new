import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageUserBuyRoutingModule } from './page-user-buy-routing.module';
import { PageUserBuyComponent } from './page-user-buy.component';


@NgModule({
  declarations: [
    PageUserBuyComponent
  ],
  imports: [
    CommonModule,
    PageUserBuyRoutingModule,
    
  ]
})
export class PageUserBuyModule { }
