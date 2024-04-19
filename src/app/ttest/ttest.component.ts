import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

@Component({
  selector: 'app-ttest',
  templateUrl: './ttest.component.html'
})
export class TtestComponent {

  constructor(public dialog: MatDialog){}

  openDialog(){
    this.dialog.open(DialogBoxComponent,{
      width: '250px',
      height: '200px',      
    })
  }

}
