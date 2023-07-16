import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit, OnDestroy {
  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private postService: PostService,
    private dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.targetId = this.data.targetId;
  }

  targetId: string;

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private subscription!: Subscription;

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }

  openDeleteClick(): void {
    this.subscription = this.postService.deletePost(this.targetId).subscribe(
      (response) => {
        this.toastr.success('Deleted');
        window.location.reload();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
