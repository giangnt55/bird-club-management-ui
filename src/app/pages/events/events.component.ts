import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BasePaginationParam } from 'src/app/models/paging.model';
import { EventService } from 'src/app/services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  private currentPage: number = 1;
  events: Event[] = [];
  eventRows: any[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.getEvents();
    this.eventRows = this.chunkArray(this.events, 5);
  }

  chunkArray(arr: any[], size: number): any[] {
    const chunkedArray = [];
    for (let i = 0; i < arr.length; i += size) {
      const chunk = arr.slice(i, i + size);
      chunkedArray.push(chunk);
    }
    return chunkedArray;
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
}
