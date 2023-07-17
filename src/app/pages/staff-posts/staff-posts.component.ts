import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DevelopingDialogComponent } from 'src/app/components/developing-dialog/developing-dialog.component';
import { AdminPagingParam } from 'src/app/models/dashboard.model';
import { PaginationResponse } from 'src/app/models/paging.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-staff-posts',
  templateUrl: './staff-posts.component.html',
  styleUrls: ['./staff-posts.component.css'],
})
export class StaffPostsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  keyword: string = '';
  pageSize: number = 5;
  page: number = 1;
  data: PaginationResponse<Post> = {
    offset: 1,
    data: [],
    page_size: 5,
    total_count: 0,
    total_pages: 0,
  };

  constructor(
    private postService: PostService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.getPosts();
  }

  openDevelopingDialog(): void {
    this.dialog.open(DevelopingDialogComponent);
  }

  getPosts(): void {
    const paging: AdminPagingParam = {
      id: null,
      create_at_from: null,
      page: this.page,
      page_size: this.pageSize,
      order_by: null,
      keyword: this.keyword,
    };
    this.subscription = this.postService.getPosts(paging).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  confirmDelete(post: Post): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.subscription = this.postService.deletePost(post.id).subscribe(
          (response) => {
            this.getPosts();
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
    this.getPosts();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getPosts();
    }
  }

  nextPage(): void {
    const totalPages = this.data.total_pages;
    if (this.page < totalPages) {
      this.page++;
      this.getPosts();
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.data.total_pages) {
      this.page = pageNumber;
      this.getPosts();
    }
  }

  getPageRange(): number[] {
    return Array.from({ length: this.data.total_pages }, (_, i) => i + 1);
  }

  formatDate(date: Date | null | undefined): string {
    const formattedStart = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
    return `${formattedStart}`;
  }

  convertToTimeZone7Plus(date: Date | null | undefined) {
    if (!date) {
      return null;
    }
    const originalDate = new Date(date);
    originalDate.setHours(originalDate.getHours() + 7);

    // Adjust the converted date to the desired format
    const formattedDate = originalDate.toLocaleString('en-US');

    return formattedDate;
  }
}
