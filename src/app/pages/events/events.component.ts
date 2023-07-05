import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasePaginationParam } from 'src/app/models/paging.model';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event.model';
import { MatDialog } from '@angular/material/dialog';
import { EventCreateComponent } from 'src/app/components/event-create/event-create.component';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private currentPage: number = 1;
  events: Event[] = [];
  selectedDateOption: string = 'anyz'; // Store the selected date option
  selectedDate: string = ''; // Store the selected date for filtering
  isFollowed: boolean = false;

  constructor(private eventService: EventService, private dialog: MatDialog) {}

  ngOnInit() {
    this.getEvents();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getEvents() {
    const paging: BasePaginationParam = {
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
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }

  updateSelectedDate(): void {
    const today = new Date().toISOString().split('T')[0]; // Get the current date
    const tomorrow = new Date(Date.now() + 86400000)
      .toISOString()
      .split('T')[0]; // Get tomorrow's date

    if (this.selectedDateOption === 'today') {
      this.selectedDate = today;
    } else if (this.selectedDateOption === 'tomorrow') {
      this.selectedDate = tomorrow;
    }
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
