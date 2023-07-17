import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { DeleteConfirmDialogComponent } from 'src/app/components/delete-confirm-dialog/delete-confirm-dialog.component';
import { DevelopingDialogComponent } from 'src/app/components/developing-dialog/developing-dialog.component';
import { AdminPagingParam } from 'src/app/models/dashboard.model';
import { PaginationResponse } from 'src/app/models/paging.model';
import { Post } from 'src/app/models/post.model';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { DatePipe } from '@angular/common';
import { EventCreateComponent } from 'src/app/components/event-create/event-create.component';

@Component({
  selector: 'app-staff-events',
  templateUrl: './staff-events.component.html',
  styleUrls: ['./staff-events.component.css'],
})
export class StaffEventsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  keyword: string = '';
  pageSize: number = 5;
  page: number = 1;
  data: PaginationResponse<Event> = {
    offset: 1,
    data: [],
    page_size: 5,
    total_count: 0,
    total_pages: 0,
  };

  constructor(
    private eventService: EventService,
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
    this.getEvents();
  }

  openDevelopingDialog(): void {
    this.dialog.open(DevelopingDialogComponent);
  }

  getEvents(): void {
    const paging: AdminPagingParam = {
      id: null,
      create_at_from: null,
      page: this.page,
      page_size: this.pageSize,
      order_by: null,
      keyword: this.keyword,
    };
    this.subscription = this.eventService.getEvents(paging).subscribe(
      (response) => {
        this.data = response;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  confirmDelete(event: Event): void {
    const dialogRef = this.dialog.open(DeleteConfirmDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        this.subscription = this.eventService.deleteEvent(event.id).subscribe(
          (response) => {
            this.getEvents();
            this.toastr.success('Delete successfully');
          },
          (error) => {
            this.toastr.error(error.error.message);
          }
        );
      }
    });
  }

  onCreateClick(): void {
    const dialogRef = this.dialog.open(EventCreateComponent);

    // dialogRef.afterClosed().subscribe((result) => {

    // });
  }

  onsearchEntered(): void {
    // Perform the search based on the keyword
    this.getEvents();
  }

  previousPage(): void {
    if (this.page > 1) {
      this.page--;
      this.getEvents();
    }
  }

  nextPage(): void {
    const totalPages = this.data.total_pages;
    if (this.page < totalPages) {
      this.page++;
      this.getEvents();
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.data.total_pages) {
      this.page = pageNumber;
      this.getEvents();
    }
  }

  getPageRange(): number[] {
    return Array.from({ length: this.data.total_pages }, (_, i) => i + 1);
  }

  getStatusLabel(status: number | undefined): string {
    if (status === undefined) {
      return '';
    }

    switch (status) {
      case 1:
        return 'Upcoming';
      case 2:
        return 'Happening';
      case 3:
        return 'Cancelled';
      case 4:
        return 'Ending';
      default:
        return '';
    }
  }

  getHostTypeLabel(host_type: number | undefined): string {
    if (host_type === undefined) {
      return '';
    }

    switch (host_type) {
      case 1:
        return 'Offline';
      case 2:
        return 'Online';
      default:
        return '';
    }
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
