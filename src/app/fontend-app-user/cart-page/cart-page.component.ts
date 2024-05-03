import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/data.service';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  selectedTableId: any;
  selectedTable: any;
  orderHistory: any;
  selectedDetails: any[] = [];

  constructor(
    private dialog: MatDialog,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAllTables();
    this.setCart();
    this.loadOrderHistoryFromLocalStorage();
  }


  loadOrderHistoryFromLocalStorage() {
    const orderHistory = localStorage.getItem('orderHistory');
    if (orderHistory) {
      this.orderHistory = JSON.parse(orderHistory);
    }
  }

  getAllTables(): void {
    this.orderService.getAllTables().subscribe(tables => {
      const table = tables.find(table => table.tableId === 1);
      if (table) {
        this.selectedTable = table;
        this.selectedTableId = table.tableId;
      }
    });
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

  removeFromCart(cartItem: CartItem) {
    this.cartService.removeFromCart(cartItem.food.id);
    this.setCart();
  }

  increment(cartItem: CartItem): void {
    this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
    this.setCart();
  }

  decrement(cartItem: CartItem): void {
    if (cartItem.quantity > 1) {
      this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity - 1);
      this.setCart();
    } else {
      this.removeFromCart(cartItem);
    }
  }

  black() {
    this.router.navigate(['/page-user']);
  }

  openDialog() {
    if (this.cart.items.length > 0) {
      this.dialog.open(DialogBoxComponent, {
        width: '250px',
        height: '150px',
        data: { table: this.selectedTable, cart: this.cart }
      });
    }
  }

}
