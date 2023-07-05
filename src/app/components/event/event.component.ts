import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Event } from '../../models/event.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  @Input() event!: Event;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  formatDate(date: Date): string {
    const formattedStart = this.datePipe.transform(date, 'dd/MM/yyyy HH:mm');
    return `${formattedStart}`;
  }
}
