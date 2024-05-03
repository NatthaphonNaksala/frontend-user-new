import { InjectionToken, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageUserComponent } from './fontend-app-user/page-user/page-user.component';
import { HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CartPageComponent } from './fontend-app-user/cart-page/cart-page.component';
import { PageOrderListComponent } from './fontend-app-user/page-order-list/page-order-list.component';
import { DialogBoxEndComponent } from './dialog-box-end/dialog-box-end.component';


export const MAT_MDC_DIALOG_DATA = new InjectionToken<any>('MatMdcDialogData');


@NgModule({
  declarations: [
    AppComponent,
    PageUserComponent,
    FilterPipe,
    DialogBoxComponent,
    CartPageComponent,
    PageOrderListComponent,
    DialogBoxEndComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
  ],
  providers: [MatDialogModule, { provide: MAT_MDC_DIALOG_DATA, useValue: {} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
