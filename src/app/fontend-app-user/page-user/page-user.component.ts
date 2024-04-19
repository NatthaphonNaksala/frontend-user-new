import { Component, OnInit, inject } from '@angular/core';
import { Router, } from '@angular/router';
import { OrderService } from 'src/app/service/data.service';

@Component({
  selector: 'app-page-user',
  templateUrl: './page-user.component.html',  
})
export class PageUserComponent implements OnInit {

  orders: any[] = [];
  files: any = [];
  searchText: any;

//ส่วนที่เอาไว้Getออเดอร์มา
  constructor(
  private orderService: OrderService,
  private router: Router,
  ){}

  ngOnInit(): void {
    this.getFiles();
  }

  getFiles(): void {
    this.orderService.getAllOrders().subscribe(
      (response: any[]) => {
        response.forEach(element => {
          element.test = 'data:image/jpeg;base64,' + element.data;
          this.orders.push(element);
        });
        console.log(this.orders);
      },
      (error: any) => {
        console.error('Error fetching files:', error);
      }
    );
  }

  detailMenu(order: any){
    this.router.navigate(['/page-user-buy'], { state: { order } });
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
