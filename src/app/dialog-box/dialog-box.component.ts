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
  selectedDetails: any[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService,
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

  onNoClick(): void {
    this.dialogRef.close();
  }

  goPageorderlist(){
    this.router.navigate(['/page-order-list']);
    this.dialogRef.close();

  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

  confirmOrder(): void {
    console.log('confirmOrder function called');
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
  
          // Update order history in local storage
          this.router.navigate(['/page-order-list']);
          this.updateOrderHistoryInLocalStorage(orderItems);
          this.cartService.clearCart();

          // Navigate to page-order-list
        },
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

}