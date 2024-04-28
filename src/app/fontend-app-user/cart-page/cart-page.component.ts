// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { CartService } from 'src/app/service/cart.service';
// import { OrderService, OrderItem } from 'src/app/service/data.service';
// import { Cart } from 'src/app/models/Cart';
// import { CartItem } from 'src/app/models/CartItem';
// import { Observable } from 'rxjs';
// import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html'
// })
// export class CartPageComponent implements OnInit {
//   cart!: Cart;
//   selectedTableId: any;
//   selectedTable: any;

//   constructor(
//     private dialog: MatDialog,
//     private cartService: CartService,
//     private orderService: OrderService,
//     private router: Router
//   ) {}

//   ngOnInit(): void {
//     this.getAllTables();
//     this.setCart();
//   }

//   getAllTables(): void {
//     this.orderService.getAllTables().subscribe(tables => {
//       const table = tables.find(table => table.tableId === 1);
//       if (table) {
//         this.selectedTable = table;
//         this.selectedTableId = table.tableId;
//       }
//     });
//   }

//   setCart() {
//     this.cart = this.cartService.getCart();
//   }

//   removeFromCart(cartItem: CartItem) {
//     this.cartService.removeFromCart(cartItem.food.id);
//     this.setCart();
//   }

//   increment(cartItem: CartItem): void {
//     this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
//     this.setCart();
//   }

//   decrement(cartItem: CartItem): void {
//     if (cartItem.quantity > 1) {
//       this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity - 1);
//       this.setCart();
//     } else {
//       this.removeFromCart(cartItem);
//     }
//   }

//   black() {
//     this.router.navigate(['/page-user']);
//   }

//   confirmOrder(): void {
//     if (this.cart.items.length > 0 && this.selectedTableId) {
//       const orderItems: OrderItem[] = this.cart.items.map(cartItem => {
//         return {
//           orderItemId: undefined,
//           order: cartItem.food,
//           quantity: cartItem.quantity,
//           totalPrice: cartItem.price,
//           status: 'pending',
//           orderDate: new Date(),
//           tableId: this.selectedTableId,
//           tableNumber: this.selectedTableId.toString(),
//           transaction_id: undefined,
//           receiptNumber: undefined,
//         };
//       });

//       this.orderService.addOrderItems(orderItems).subscribe(
//         (response) => {
//           console.log('Order placed successfully:', response);
//           this.cartService.clearCart();
//           this.router.navigate(['/page-user']);
//         },
//         (error) => {
//           console.error('Error placing order:', error);
//           // Handle error here
//         }
//       );
//     }
//   }

//   openDialog() {
//     if (this.cart.items.length > 0) {
//       this.dialog.open(DialogBoxComponent, {
//         width: '250px',
//         height: '150px',
//         data: { table: this.selectedTable }
//       });
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrderService, OrderItem, Order } from 'src/app/service/data.service';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { Observable } from 'rxjs';
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

  confirmOrder(): void {
    if (this.cart.items.length > 0 && this.selectedTableId) {
        const orderItems: OrderItem[] = this.cart.items.map(cartItem => {
            return {
                orderItemId: undefined,
                order: cartItem.food,
                quantity: cartItem.quantity,
                totalPrice: CartItem.totalPrice(this.cart.items),
                status: 'pending',
                payment_status: 'uncomplete',
                orderDate: new Date(),
                tableId: this.selectedTableId,
                tableNumber: this.selectedTableId.toString(),
                transaction_id: undefined,
                receiptNumber: undefined,
                details_id: this.selectedDetails.map(detail => detail.id)[0], // Assuming you only need the first detail id
              };
        });

        this.orderService.addOrderItems(orderItems).subscribe(
            (response) => {
                console.log('Order placed successfully:', response);
                this.openDialog();

                // Clear the cart only after successful order placement

                // Update order history in local storage
                this.updateOrderHistoryInLocalStorage(orderItems);
                this.cartService.clearCart();
            }
            ,
            (error) => {
                console.error('Error placing order:', error);
                // Handle error here
            }
        );
    }
}

  updateOrderHistoryInLocalStorage(orderItems: OrderItem[]) {
    const orderHistory = localStorage.getItem('orderHistory');
    let updatedOrderHistory = orderHistory ? JSON.parse(orderHistory) : [];
  
    // เพิ่มข้อมูลการสั่งซื้อใหม่เข้าไปในประวัติการสั่งซื้อ
    updatedOrderHistory = updatedOrderHistory.concat(orderItems);
  
    // อัพเดทข้อมูลใน Local Storage
    localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));
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
