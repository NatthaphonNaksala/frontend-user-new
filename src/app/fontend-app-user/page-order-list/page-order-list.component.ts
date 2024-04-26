import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogBoxEndComponent } from 'src/app/dialog-box-end/dialog-box-end.component';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-page-order-list',
  templateUrl: './page-order-list.component.html'
})
export class PageOrderListComponent implements OnInit{

  cart!:Cart;

  constructor(
    private router: Router,
    private cartService: CartService,
    private dialog: MatDialog,

  ) {}

  ngOnInit(): void {
    this.setCart();
  }

  removeFromCart(cartItem:CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  changeQuantity(cartItem: CartItem, quantityInString: string) {
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
    this.setCart();
  }

  setCart(){
    this.cart = this.cartService.getCart();
  }
  
  black(){
    this.cartService.clearCart();
    this.router.navigate(['/page-user']);
  }

  openDialog() {
    if (this.cart.items.length > 0) {
      this.dialog.open(DialogBoxEndComponent, {
        width: '250px',
        height: '150px',
      });
    }
  }
}
