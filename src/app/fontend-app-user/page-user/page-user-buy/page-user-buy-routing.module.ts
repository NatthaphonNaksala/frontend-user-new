import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUserBuyComponent } from './page-user-buy.component';

const routes: Routes = [
  {
    path: "",
    component: PageUserBuyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageUserBuyRoutingModule { }
