import { Injectable } from "@angular/core";
import { Cart } from "../models/Cart";
import { Order, OrderItem, OrderService } from "./data.service";
import { CartItem } from "../models/CartItem";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environment/environment";

@Injectable({
    providedIn: 'root'
  })
  export class CartService {
      private cart: Cart = new Cart();
      private baseUrl = environment.apiUrl;
      private CART_STORAGE_KEY = 'cart'; // เพิ่มการกำหนดค่าคงที่ CART_STORAGE_KEY

      constructor(
          private orderService: OrderService,
          private http: HttpClient
      ) {}
  
      addToCart(food: Order): void {
        let cartItem = this.cart.items.find(item => item.food.id === food.id);
        if (cartItem) {
            this.changeQuantity(food.id, cartItem.quantity + 1);
            return;
        }
        this.cart.items.push(new CartItem(food));
        this.saveCart(this.cart); // อัพเดตข้อมูลใน local storage เมื่อมีการเพิ่มสินค้าในตะกร้า
    }
    
    removeFromCart(foodId: number): void {
        this.cart.items = this.cart.items.filter(item => item.food.id !== foodId);
        this.saveCart(this.cart); // อัพเดตข้อมูลใน local storage เมื่อมีการลบสินค้าในตะกร้า
    }
    
    changeQuantity(foodId: number, quantity: number): void {
        let cartItem = this.cart.items.find(item => item.food.id === foodId);
        if (!cartItem) return;
        cartItem.quantity = quantity;
        this.saveCart(this.cart); // อัพเดตข้อมูลใน local storage เมื่อมีการเปลี่ยนแปลงปริมาณสินค้าในตะกร้า
    }
    
  
      getCart(): Cart {
          return this.cart;
      }

      // เพิ่มเมธอด addOrderItems() เพื่อส่งรายการอาหารไปยัง API เพื่อบันทึกลงในฐานข้อมูล
      addOrderItems(orderItems: OrderItem[]): Observable<any> {
          return this.http.post(`${this.baseUrl}/orderItems`, orderItems);
      }

      saveCart(cart: Cart): void {
        localStorage.setItem(this.CART_STORAGE_KEY, JSON.stringify(cart));
      }

      clearCart(): void {
        this.cart.items = [];
      }
      
} 
