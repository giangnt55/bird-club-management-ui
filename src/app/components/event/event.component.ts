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
import { ParticipateService } from 'src/app/services/participate.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
})
export class EventComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;

  @Input() event!: Event;
  isFollow: boolean = false;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    private participantService: ParticipateService,
    private toastr: ToastrService
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

  joinEvent(eventId: string) {
    this.participantService.joinEvent(eventId).subscribe(
      (response) => {
        this.toastr.success('Followed successfully');
        this.event.is_joined = true;
        this.event.total_participant++;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }

  outEvent(eventId: string) {
    this.participantService.outEvent(eventId).subscribe(
      (response) => {
        this.toastr.success('Unfollowed successfully');
        this.event.is_joined = false;
        this.event.total_participant--;
        this.changeDetectorRef.detectChanges();
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
