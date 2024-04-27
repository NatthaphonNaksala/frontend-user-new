// data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';

export interface Order {
  id: number;
  name: string;
  food_type: string;
  price: number;
  image: string;
  test?: string;
}

// export interface OrderItem {
//   orderItemId?: number;
//   order: Order;
//   orderDate: Date;
//   totalPrice: number;
//   tableNumber?: string; // ใช้ tableNumber แทนการกำหนดโต๊ะเป็นสตริงโดยตรง
//   status: string;
//   transaction_id?: any;
//   quantity: number;
//   receiptNumber?: string;
// }

interface Food {
  name: string;
  price: number;
  // สามารถเพิ่มคุณสมบัติอื่น ๆ ของอาหารตามต้องการได้
}




export class OrderItem {
  orderItemId: number | undefined;
  order: Order | undefined;
  orderDate: Date | undefined;
  totalPrice: number | undefined;
  tableId: number | undefined; // เพิ่มฟิลด์ tableId เพื่อเก็บรหัสโต๊ะ
  status: string | undefined;
  tableNumber: string | undefined;
  transaction_id: any;
  quantity: number | undefined;
  receiptNumber: string | undefined;
}


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  addOrderItems(orderItems: OrderItem[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/orderItems`, orderItems);
  }
  
  ////

  getAllOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.baseUrl}/orders`);
  }

  getOrdersById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/${id}`)
  }

  getOrderById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/orderById/${id}`);
  }

  createOrder(order: Order): Observable<Order> {
    return this.http.post<Order>(`${this.baseUrl}/addOrder`, order);
  }

  updateOrder(order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/update`, order);
  }

  deleteOrder(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/delete/${id}`);
  }

  getImageUrlById(order: Order): Observable<Order> {
    return this.http.get<Order>(`${this.baseUrl}/files/${order.id}/file`);
  }
  
  ////

  getFoodDetails(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/details`);
  }
  
  getAllTables(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/tables`);
  }
  

  getTableDataByTableId(tableId: number): Observable<OrderItem[]> {
    return this.http.get<OrderItem[]>(
      `${this.baseUrl}/orderItems/getTableData/${tableId}`
    );
  }

  getFoodTypes(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8085/food-types');
  }

  getFoodTypeById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/getFoodTypeById/${id}`)
  }


}
