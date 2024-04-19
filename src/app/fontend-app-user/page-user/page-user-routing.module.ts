import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageUserComponent } from './page-user.component';

const routes: Routes = [
  { 
    path: '', 
    component: PageUserComponent,
    children: [
      { 
        path: 'page-user-buy', 
        loadChildren: () => import('./page-user-buy/page-user-buy.module').then(m => m.PageUserBuyModule) 
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageUserRoutingModule { }
