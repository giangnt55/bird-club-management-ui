import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Follower } from 'src/app/models/follow.model';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-follower-dialog',
  templateUrl: './follower-dialog.component.html',
  styleUrls: ['./follower-dialog.component.css'],
})
export class FollowerDialogComponent {
  @Input() followers: Follower[] | null | undefined;

  constructor(
    private dialogRef: MatDialogRef<FollowerDialogComponent>,
    private followService: FollowService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.followers = data.followers;
  }

  followClick(follwer: Follower) {
    const createFollow = {
      follow_to: follwer?.creator?.id,
    };

    this.followService.create(createFollow).subscribe(
      (response) => {
        follwer.is_followed = true;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        // Handle error during post creation
        this.toastr.error('Failed to follow this user');
      }
    );
  }

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
  }
}
