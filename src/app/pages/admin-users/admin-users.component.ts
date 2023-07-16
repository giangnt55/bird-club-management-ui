import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DevelopingDialogComponent } from 'src/app/components/developing-dialog/developing-dialog.component';
import { UserCardComponent } from 'src/app/components/user-card/user-card.component';
import { AdminPagingParam } from 'src/app/models/dashboard.model';
import { PaginationResponse } from 'src/app/models/paging.model';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  //members: User[] = [];
  private subscription!: Subscription;
  keyword: string = '';
  pageSize: number = 5;
  page: number = 1;
  data: PaginationResponse<User> = {
    offset: 1,
    data: [],
    page_size: 5,
    total_count: 0,
    total_pages: 0,
  };

  constructor(
    private usersService: UsersService,
    private dialog: MatDialog,
    private toastr: ToastrService
  ) {}

  openDevelopingDialog(): void {
    this.dialog.open(DevelopingDialogComponent);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getMembers();
  }

  getMembers(): void {
    const paging: AdminPagingParam = {
      id: null,
      create_at_from: null,
      page: this.page,
      page_size: this.pageSize,
      order_by: null,
      keyword: this.keyword,
    };
    this.subscription = this.usersService.getMembers(paging).subscribe(
      (response) => {
        //this.members = response.data;
        this.data = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  openMemberDialog(member: User) {
    const dialogRef = this.dialog.open(UserCardComponent, {
      data: member,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }

  confirmDelete(member: User): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.subscription = this.usersService.deleteMember(member.id).subscribe(
          (response) => {
            this.getMembers();
            this.toastr.success('Delete successfully');
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
      }
    });
  }

  onsearchEntered(): void {
    // Perform the search based on the keyword
    this.getMembers();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getMembers();
    }
  }

  nextPage(): void {
    const totalPages = this.data.total_pages;
    if (this.page < totalPages) {
      this.page++;
      this.getMembers();
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.data.total_pages) {
      this.page = pageNumber;
      this.getMembers(); // Call the method to fetch members for the selected page
    }
  }

  getPageRange(): number[] {
    return Array.from({ length: this.data.total_pages }, (_, i) => i + 1);
  }
}
