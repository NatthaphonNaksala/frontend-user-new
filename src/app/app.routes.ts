import { Routes } from "@angular/router";
import { PageUserComponent } from "./fontend-app-user/page-user/page-user.component";

export const routes: Routes = [
    {
      path: '',
      redirectTo: '/page-user',
      pathMatch: 'full',
    },
    {   
        path: "page-user",
        loadChildren: () => import("./fontend-app-user/page-user/page-user.module").then(m => m.PageUserModule)
    },
    {
      path: "page-user-buy",
      loadChildren: () => import("./fontend-app-user/page-user/page-user-buy/page-user-buy.module").then(m => m.PageUserBuyModule)
    },
    {
      path: "page-cart",
      loadChildren: () => import("./fontend-app-user/cart-page/cart-page.module").then(m => m.CartPageModule)

    },
    {
      path: "page-order-list",
      loadChildren: () => import("./fontend-app-user/page-order-list/page-order-list.module").then(m => m.PageOrderListModule)

    }

  ];
