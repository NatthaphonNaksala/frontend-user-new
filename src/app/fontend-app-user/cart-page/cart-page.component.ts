// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { Observable, map } from 'rxjs';
// import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
// import { Cart } from 'src/app/models/Cart';
// import { CartItem } from 'src/app/models/CartItem';
// import { CartService } from 'src/app/service/cart.service';
// import { Order } from 'src/app/service/data.service';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html'
// })
// export class CartPageComponent implements OnInit{

//   cart!:Cart;

//   constructor(
//   private cartService: CartService,
//   private router: Router,
//   public dialog: MatDialog,

//   ) {
//   }
//   ngOnInit(): void {
//     this.setCart();
//   }

//   removeFromCart(cartItem:CartItem) {
//     this.cartService.removeFromCart(cartItem.food.id);
//     this.setCart();
//   }

//   changeQuantity(cartItem:CartItem, quantityInString:string){
//     const quantity = parseInt(quantityInString);
//     this.cartService.changeQuantity(cartItem.food.id, quantity);
//     this.setCart();
//   }

//   setCart(){
//     this.cart = this.cartService.getCart();
//   }

//   black(){
//     this.router.navigate(['/page-user']);
//   }


//   openDialog() {
//     if (this.cart.items.length > 0) {
//       this.dialog.open(DialogBoxComponent,
//          {
//         width: '250px',
//         height: '150px',
//       });
//     }
//   }


// }

// import { Component, OnInit } from '@angular/core';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { Observable, map } from 'rxjs';
// import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
// import { Cart } from 'src/app/models/Cart';
// import { CartItem } from 'src/app/models/CartItem';
// import { CartService } from 'src/app/service/cart.service';
// import { Order } from 'src/app/service/data.service';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html'
// })
// export class CartPageComponent implements OnInit{

//   cart!: Cart;

//   order!: Order;
//   files: any = [];
//   orders: any[] = [];

//   foodDetails: any[] = [];


//   constructor(
//     private cartService: CartService,
//     private router: Router,
//     public dialog: MatDialog,
//   ) {}

//   ngOnInit(): void {
//     this.setCart();
//     this.orders.push(this.order);
//   }

//   removeFromCart(cartItem: CartItem) {
//     this.cartService.removeFromCart(cartItem.food.id);
//     this.setCart();
//   }

//   // เพิ่มจำนวนสินค้าในตะกร้า
//   increment(cartItem: CartItem): void {
//     this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity + 1);
//     this.setCart();
//   }

//   // ลดจำนวนสินค้าในตะกร้า
//   decrement(cartItem: CartItem): void {
//     if (cartItem.quantity > 1) {
//       this.cartService.changeQuantity(cartItem.food.id, cartItem.quantity - 1);
//       this.setCart();
//     } else {
//       this.removeFromCart(cartItem);
//     }
//   }

//   setCart() {
//     this.cart = this.cartService.getCart();
//   }

//   black() {
//     this.router.navigate(['/page-user']);
//   }

//   openDialog() {
//     if (this.cart.items.length > 0) {
//       this.dialog.open(DialogBoxComponent, {
//         width: '250px',
//         height: '150px',
//       });
//     }
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { CartService } from 'src/app/service/cart.service';
// import { OrderService, OrderItem } from 'src/app/service/data.service';
// import { Cart } from 'src/app/models/Cart';
// import { CartItem } from 'src/app/models/CartItem';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-cart-page',
//   templateUrl: './cart-page.component.html'
// })
// export class CartPageComponent implements OnInit{

//   cart!: Cart;
//   selectedOrders: any = [];
//   selectedTableId: any; // กำหนดค่าเริ่มต้นให้ selectedTableId เป็น 1
//   selectedTable: any; // ประกาศตัวแปร selectedTable
  
//   constructor(
//     private cartService: CartService,
//     private orderService: OrderService,
//     private router: Router
//   ) {
//     this.selectedTable = { tableId: 7, tableNumber: '7' }; // เปลี่ยนโต๊ะเริ่มต้นเป็นโต๊ะที่มี tableId เป็น 7 และ tableNumber เป็น '7'
//   }

  
  

//   ngOnInit(): void {
//     this.setCart();
    
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

//   setCart() {
//     this.cart = this.cartService.getCart();
//   }

//   black() {
//     this.router.navigate(['/page-user']);
//   }

//   confirmOrder(selectedTableId: number): void {
//     if (this.cart.items.length > 0) {
//       const orderItems: OrderItem[] = this.cart.items.map(cartItem => {
//         const orderItem: OrderItem = {
//           orderItemId: undefined,
//           order: cartItem.food,
//           quantity: cartItem.quantity,
//           totalPrice: cartItem.price,
//           status: 'pending',
//           orderDate: new Date(),
//           transaction_id: undefined,
//           receiptNumber: undefined,
//           tableId: selectedTableId, // เพิ่ม property tableId และกำหนดค่า
//           tableNumber: selectedTableId.toString(), // เพิ่ม property tableNumber และกำหนดค่า
//         };
  
//         return orderItem;
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
  
  
  
// }


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';
import { OrderService, OrderItem } from 'src/app/service/data.service';
import { Cart } from 'src/app/models/Cart';
import { CartItem } from 'src/app/models/CartItem';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html'
})
export class CartPageComponent implements OnInit {

  cart!: Cart;
  selectedOrders: any = [];
  selectedTableId: any; // กำหนดค่าเริ่มต้นให้ selectedTableId เป็น 1
  selectedTable: any; // ประกาศตัวแปร selectedTable

  constructor(
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router
  ) {
    this.selectedTable = { tableId: 7, tableNumber: '7' }; // เปลี่ยนโต๊ะเริ่มต้นเป็นโต๊ะที่มี tableId เป็น 7 และ tableNumber เป็น '7'
    this.selectedTableId = 1; // กำหนดให้ selectedTableId เริ่มต้นเป็น 1
  }

  ngOnInit(): void {
    this.setCart();
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

  setCart() {
    this.cart = this.cartService.getCart();
  }

  black() {
    this.router.navigate(['/page-user']);
  }

  confirmOrder(selectedTableId: number): void {
    if (this.cart.items.length > 0) {
      const orderItems: OrderItem[] = this.cart.items.map(cartItem => {
        const orderItem: OrderItem = {
          orderItemId: undefined,
          order: cartItem.food,
          quantity: cartItem.quantity,
          totalPrice: cartItem.price,
          status: 'pending',
          orderDate: new Date(),
          transaction_id: undefined,
          receiptNumber: undefined,
          tableId: selectedTableId, // เพิ่ม property tableId และกำหนดค่า
          tableNumber: selectedTableId.toString(), // เพิ่ม property tableNumber และกำหนดค่า
        };
        return orderItem;
      });

      this.orderService.addOrderItems(orderItems).subscribe(
        (response) => {
          console.log('Order placed successfully:', response);
          this.cartService.clearCart();
          this.router.navigate(['/page-user']);
        },
        (error) => {
          console.error('Error placing order:', error);
          // Handle error here
        }
      );
    }
  }
}
