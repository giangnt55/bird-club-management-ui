import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Following } from 'src/app/models/follow.model';
import { FollowService } from 'src/app/services/follow.service';
import { FollowerDialogComponent } from '../follower-dialog/follower-dialog.component';

@Component({
  selector: 'app-following-dialog',
  templateUrl: './following-dialog.component.html',
  styleUrls: ['./following-dialog.component.css'],
})
export class FollowingDialogComponent {
  @Input() followings: Following[] | null | undefined;

  constructor(
    private dialogRef: MatDialogRef<FollowerDialogComponent>,
    private followService: FollowService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.followings = data.followings;
  }

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
