import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CartService } from '../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box-end',
  templateUrl: './dialog-box-end.component.html'
})
export class DialogBoxEndComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DialogBoxEndComponent>,
    private router: Router,
    private cartService: CartService,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmAction(): void {
    this.cartService.clearCart();
    this.router.navigate(['/page-user']); // เมื่อคลิกยืนยันให้นำผู้ใช้ไปยังหน้ารายการออเดอร์
  }

}
