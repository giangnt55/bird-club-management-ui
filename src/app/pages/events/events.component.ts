import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasePaginationParam } from 'src/app/models/paging.model';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateComponent } from 'src/app/components/event-create/event-create.component';
import { AdminPagingParam } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private currentPage: number = 1;
  events: Event[] = [];
  filteredEvents: Event[] = [];
  selectedDateOption = 'any';
  isJoined = false;
  isFollowed: boolean = false;

  constructor(
    private eventService: EventService,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getEvents() {
    const paging: AdminPagingParam = {
      keyword: null,
      id: null,
      create_at_from: null,
      page: this.currentPage,
      page_size: 50,
      order_by: null,
    };

    this.subscription = this.eventService.getEvents(paging).subscribe(
      (response) => {
        const newEvents = response.data;
        this.events = [...this.events, ...newEvents];
        this.filteredEvents = this.events;
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  updateSelectedDate(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to midnight
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0); // Set the time to midnight

    if (this.selectedDateOption === 'today') {
      // Filter logic for today's date
      this.filteredEvents = this.events.filter((event) => {
        const startDate = new Date(event.start_date);
        startDate.setHours(0, 0, 0, 0); // Set the time to midnight
        return startDate.getTime() === today.getTime();
      });
    } else if (this.selectedDateOption === 'tomorrow') {
      // Filter logic for tomorrow's date
      this.filteredEvents = this.events.filter((event) => {
        const startDate = new Date(event.start_date);
        startDate.setHours(0, 0, 0, 0); // Set the time to midnight
        return startDate.getTime() === tomorrow.getTime();
      });
    } else {
      // Show all events
      this.filteredEvents = this.events;
    }
  }

  updateFollowedFilter(): void {
    this.isFollowed = !this.isFollowed;
    if (this.isFollowed) {
      // Filter only the followed events
      this.filteredEvents = this.filteredEvents.filter(
        (event) => event.is_joined == true
      );
    } else {
      // Filter only the followed events
      this.filteredEvents = this.events;
    }

    this.changeDetectorRef.detectChanges();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EventCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }
}
