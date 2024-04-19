import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
import { DialogBoxComponent } from 'src/app/dialog-box/dialog-box.component';
import { CartService } from 'src/app/service/cart.service';
import { Order, OrderService } from 'src/app/service/data.service';

@Component({
  selector: 'app-page-user-buy',
  templateUrl: './page-user-buy.component.html',
})
export class PageUserBuyComponent implements OnInit{

  order!: Order;
  files: any = [];
  orders: any[] = [];

  constructor(
  public dialog: MatDialog,
  private router: Router,
  private cartService: CartService,
  private orderService: OrderService,
  private route: ActivatedRoute,
  ){}

  ngOnInit(): void {
    // ดึงข้อมูลรายการที่ส่งมาจากหน้าก่อนหน้า
    this.order = history.state.order;
    
    // ดึงไฟล์ที่เกี่ยวข้องกับรายการนี้
    // this.getFilesForOrder(this.order.id.toString());
  
    // ให้ orders เท่ากับออเดอร์ที่ส่งมาจากหน้าก่อนหน้า
    this.orders.push(this.order);
  }

  addToCart(){
    this.cartService.addToCart(this.order);
    this.router.navigate(['/page-cart']);
  }

  black(){
    this.router.navigate(['/page-user']);
  }
 
}

// orders: any[] = [];

// private orderService: OrderService,


// ngOnInit(): void {
//   this.orderService.getAllOrders().subscribe(data => {
//     this.orders = data;
//   });
// }


    // const navigation = this.router.getCurrentNavigation();
    // if (navigation) {
    //   const state = navigation.extras.state;
    //   if (state) {
    //     this.order = state['order'];
    //   }
    // }


      // getFilesForOrder(orderId: string): void {
  //   this.orderService.getFilesForOrder(orderId).subscribe(
  //     (response: any[]) => {
  //       this.files = response;
  //     },
  //     (error: any) => {
  //       console.error('Error fetching files for order:', error);
  //     }
  //   );
  // }
  
  // openDialog(){
  //   this.dialog.open(DialogBoxComponent,{
  //     width: '250px',
  //     height: '150px',      
  //   })
  // }