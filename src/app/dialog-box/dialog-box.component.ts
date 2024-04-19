import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CartService } from '../service/cart.service';
import { Order } from '../service/data.service';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',

})
export class DialogBoxComponent {

  order!: Order;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    private router: Router,
    private cartService: CartService,


  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAction(): void {
    // this.cartService.addToCart(this.order);
    this.router.navigate(['/page-order-list']); 
  }
  

}
