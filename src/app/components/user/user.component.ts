import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { FollowService } from 'src/app/services/follow.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  @Input() user!: User;
  loggedInAccount!: any | null;
  private subscription!: Subscription;
  showReplies: boolean = false;
  followed: boolean = false;

  constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private followService: FollowService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
  }

  followClick(userId: any) {
    const createFollow = {
      follow_to: userId,
    };

    this.followService.create(createFollow).subscribe(
      (response) => {
        this.followed = true;
      },
      (error) => {
        // Handle error during post creation
        this.toastr.error('Failed to follow this user');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
