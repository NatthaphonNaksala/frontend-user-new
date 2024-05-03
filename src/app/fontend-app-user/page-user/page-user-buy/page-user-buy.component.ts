import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from '@angular/router';
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
  selectedDetails: any[] = [];
  foodDetails: any[] = [];

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
    this.getFoodDetails();
  }

  getFoodDetails(): void {
    this.orderService.getFoodDetails().subscribe(
      (data: any[]) => {
        this.foodDetails = data;
      },
      (error: any) => {
        console.error('Error fetching food details:', error);
      }
      );
    }

  // addToCart(){
  //   this.cartService.addToCart(this.order);
  //   this.router.navigate(['/page-cart']);
  // }
  addToCart() {
    // ตรวจสอบว่ามีรายการอาหารที่ถูกเลือกหรือไม่
    if (this.orders.length > 0) {
        // สร้างรายการอาหารที่เลือกเพื่อเพิ่มลงในตะกร้า
        const selectedOrder = this.orders[0]; // สมมติว่ามีรายการอาหารเพียงรายการเดียว
        // ตรวจสอบว่ามีรายการอาหารที่เลือกรายละเอียดหรือไม่
        if (this.selectedDetails.length > 0) {
            // เพิ่มรายการอาหารลงในตะกร้าพร้อมกับรายละเอียดที่เลือก
            selectedOrder.selectedDetails = this.selectedDetails;
        }
        this.cartService.addToCart(selectedOrder); // เพิ่มรายการอาหารลงในตะกร้า
        this.router.navigate(['/page-cart']); // นำผู้ใช้ไปยังหน้าตะกร้าสินค้า
    } else {
        console.log('No food item selected.'); // หากไม่มีรายการอาหารที่ถูกเลือก
      }
  }

  black(){
    this.router.navigate(['/page-user']);
  }
  
  toggleDetailSelection(detail: any): void {
      const index = this.selectedDetails.findIndex(selectedDetail => selectedDetail.id === detail.id);
      if (index === -1) {
          // Add the selected detail
          this.selectedDetails.push(detail);
      } else {
          // Remove the selected detail
          this.selectedDetails.splice(index, 1);
      }
    }

}