import { Injectable } from "@angular/core";
import { Cart } from "../models/Cart";
import { Order, OrderService } from "./data.service";
import { CartItem } from "../models/CartItem";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { environment } from "../environment/environment";


@Injectable({
    providedIn: 'root'
  })
export class CartService {
    private cart:Cart = new Cart();
    private baseUrl = environment.apiUrl;
    constructor(    private orderService: OrderService,
    private http: HttpClient
    ){}


    addToCart(food: Order):void {
        let cartItem = this.cart.items.find(item => item.food.id === food.id);
        if(cartItem) {
            this.changeQuantity(food.id, cartItem.quantity + 1 );
            return;
        }
        this.cart.items.push(new CartItem(food));
    }

    removeFromCart(foodId:number): void {
        this.cart.items = 
        this.cart.items.filter(item => item.food.id != foodId);
    }

    changeQuantity(foodId: number, quantity: number) {
        let cartItem = this.cart.items.find(item => item.food.id === foodId);
        if (!cartItem) return;
        cartItem.quantity = quantity;
    }
    

    getCart():Cart{
        return this.cart;
    }


}

