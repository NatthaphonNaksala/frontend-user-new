import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/service/cart.service';
import { Order } from 'src/app/service/data.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit{

  cart!:Cart;

  constructor(
  private cartService: CartService,
  private router: Router,
  public dialog: MatDialog,

  ) {
  }
  ngOnInit(): void {
    this.setCart();
  }

  removeFromCart(cartItem:CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem:CartItem, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }

  black(){
    this.router.navigate(['/page-user']);
  }


  openDialog() {
    if (this.cart.items.length > 0) {
      this.dialog.open(DialogBoxComponent,
         {
        width: '250px',
        height: '150px',
      });
    }
  }


}
