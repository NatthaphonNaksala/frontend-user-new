// import { Component, Inject } from '@angular/core';
// import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { CartService } from '../service/cart.service';
// import { Order } from '../service/data.service';

// @Component({
//   selector: 'app-dialog-box',
//   templateUrl: './dialog-box.component.html',

// })
// export class DialogBoxComponent {

//   order!: Order;

//   constructor(
//     @Inject(MAT_DIALOG_DATA) public data: any,
//     public dialogRef: MatDialogRef<DialogBoxComponent>,
//     private router: Router,
//     private cartService: CartService,


//   ) {}

//   onNoClick(): void {
//     this.dialogRef.close();
//   }

//   confirmAction(): void {
//     // this.cartService.addToCart(this.order);
//     this.router.navigate(['/page-order-list']); 
//   }
  

  

// }


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Cart } from '../models/Cart';
import { OrderItem, OrderService } from '../service/data.service';
import { CartItem } from '../models/CartItem';


@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
})
export class DialogBoxComponent {
  table: any;
  cart!: Cart;
  selectedTableId: any;
  selectedTable: any;
  orderHistory: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,

  ) {
    this.table = data.table; // รับข้อมูลโต๊ะที่เลือกมาจาก MAT_DIALOG_DATA
    this.cart = data.cart; // รับข้อมูลตะกร้าสินค้าที่เลือกมาจาก MAT_DIALOG_DATA
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAction(): void {
    this.router.navigate(['/page-order-list']); 
  }


  
 
}


// confirmOrder(): void {
//   if (this.cart.items.length > 0 && this.selectedTableId) {
//     const orderItems: OrderItem[] = this.cart.items.map(cartItem => {
//       return {
//         orderItemId: undefined,
//         order: cartItem.food,
//         quantity: cartItem.quantity,
//         totalPrice: CartItem.totalPrice(this.cart.items),
//         status: 'pending',
//         orderDate: new Date(),
//         tableId: this.selectedTableId,
//         tableNumber: this.selectedTableId.toString(),
//         transaction_id: undefined,
//         receiptNumber: undefined,
//       };
//     });

//     this.orderService.addOrderItems(orderItems).subscribe(
//       (response) => {
//         console.log('Order placed successfully:', response);
//         // Clear the cart only after successful order placement

//         // Update order history in local storage
//         this.updateOrderHistoryInLocalStorage(orderItems);
//         this.cartService.clearCart();
//         this.dialogRef.close(true); // ปิด Dialog และส่งค่า true กลับไป
//       },
//       (error) => {
//         console.error('Error placing order:', error);
//         // Handle error here
//       }
//     );
//   }
// }




// updateOrderHistoryInLocalStorage(orderItems: OrderItem[]) {
// const orderHistory = localStorage.getItem('orderHistory');
// let updatedOrderHistory = orderHistory ? JSON.parse(orderHistory) : [];

// // เพิ่มข้อมูลการสั่งซื้อใหม่เข้าไปในประวัติการสั่งซื้อ
// updatedOrderHistory = updatedOrderHistory.concat(orderItems);

// // อัพเดทข้อมูลใน Local Storage
// localStorage.setItem('orderHistory', JSON.stringify(updatedOrderHistory));
// }