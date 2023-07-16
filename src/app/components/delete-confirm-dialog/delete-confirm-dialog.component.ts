import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-confirm-dialog',
  templateUrl: './delete-confirm-dialog.component.html',
  styleUrls: ['./delete-confirm-dialog.component.css'],
})
export class DeleteConfirmDialogComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<DeleteConfirmDialogComponent>
  ) {}

  onDeleteClick(): void {
    // Close the dialog with the result indicating the delete action
    this.dialogRef.close('delete');
  }

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
