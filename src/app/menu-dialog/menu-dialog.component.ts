import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.css'],
})
export class MenuDialogComponent {
  constructor(private dialogRef: MatDialogRef<MenuDialogComponent>) {}

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
