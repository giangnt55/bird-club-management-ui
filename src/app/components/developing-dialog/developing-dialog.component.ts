import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-developing-dialog',
  templateUrl: './developing-dialog.component.html',
  styleUrls: ['./developing-dialog.component.css'],
})
export class DevelopingDialogComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<DevelopingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {}

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
