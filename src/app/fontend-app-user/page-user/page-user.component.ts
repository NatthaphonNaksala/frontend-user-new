import { Component, OnInit, inject } from '@angular/core';
import { Router, } from '@angular/router';
import { Cart } from 'src/app/models/Cart';
import { CartService } from 'src/app/service/cart.service';
import { OrderService } from 'src/app/service/data.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',  
})
export class PageUserComponent implements OnInit {

  orders: any[] = [];
  files: any = [];
  searchText: any;
  foodTypes: any = [];
  cart!: Cart;



  foodTypeSelected: boolean = false; // เพิ่มตัวแปรนี้
  selectedFoodType: string | null = null;
  filteredOrders: any = [];

//ส่วนที่เอาไว้Getออเดอร์มา
  constructor(
  private orderService: OrderService,
  private router: Router,
  private cartService: CartService,

  ){}

  ngOnInit(): void {
    this.getFiles();
    this.loadFoodTypes();
    this.setCart();
  }

  setCart() {
    this.cart = this.cartService.getCart();
  }

  //ประเภทอาหารที่เอาไว้ออกมาแสดง
  loadFoodTypes(): void {
    this.orderService.getFoodTypes().subscribe((data: any[]) => {
      this.foodTypes = data;
    });
  }

  selectCategory(foodType: any): void {
    const id = foodType.id;
    this.getFilesByFoodType(id);
    this.foodTypeSelected = true; // เมื่อเลือกหมวดหมู่อาหาร
  }

  showAllOrders(): void {
    this.foodTypeSelected = false; // อย่าลืมตั้งค่า foodTypeSelected เป็น false เพื่อแสดงรายการทั้งหมด
    this.filteredOrders = this.files;
  }

  getFiles(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any[]) => {     
        this.files = response.map(element => ({
          ...element,
          test: 'data:image/jpeg;base64,' + element.data
        }));
      },
      (error: any) => {
        console.error('Error fetching files:', error);
      }
    );
  }

  getFilesByFoodType(id: number): void {
    this.filteredOrders = [];
    this.orderService.getFoodTypeById(id).subscribe(
      (response: any[]) => {
        this.filteredOrders = response.map(element => ({
          ...element,
          test: 'data:image/jpeg;base64,' + element.data
        }));
      },
      (error: any) => {
        console.error('Error fetching files by food type:', error);
      }
    );
  }

  
  detailMenu(order: any){
    this.router.navigate(['/page-user-buy'], { state: { order } });
  }

  navigateToCart() {
    if (this.cart && this.cart.items && this.cart.items.length > 0) {
      this.router.navigateByUrl('/page-cart');
    } 
  }
  
  
  
  
  


}




 

    // this.orderService.getAllOrders().subscribe(data => {
    //   this.orders = data;
    // });

 // OrderDetails(name: string, price: number) {
  //   // สร้างข้อมูลที่ต้องการส่งไปกับ URL
  //   const userBuyData = { name, price };
  //   // กำหนดข้อมูลเพิ่มเติมด้วย NavigationExtras
  //   const navigationExtras: NavigationExtras = {
  //     state: {
  //       userBuy: userBuyData
  //     }
  //   };
  //   // Navigate ไปยัง URL '/page-user/page-user-buy' พร้อมกับข้อมูลที่ต้องการส่ง
  //   this.router.navigateByUrl('/page-user/page-user-buy', navigationExtras);
  // }
