import { Order } from "../service/data.service";

export class CartItem{

    constructor(food:Order){
        this.food = food;
    }

    food: Order;
    quantity:number = 1;

    get price():number {
        return this.food.price * this.quantity;
    }

        // คำนวณราคารวมของรายการทั้งหมดในตะกร้า
        static totalPrice(cartItems: CartItem[]): number {
            let totalPrice = 0;
            for (const cartItem of cartItems) {
                totalPrice += cartItem.price;
            }
            return totalPrice;
        }
}
