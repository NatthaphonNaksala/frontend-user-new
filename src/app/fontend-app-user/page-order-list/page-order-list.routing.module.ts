
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageOrderListComponent } from './page-order-list.component';

const routes: Routes = [
  {
    path: "",
    component: PageOrderListComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageOrderListRoutingModule { }