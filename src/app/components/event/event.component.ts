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
