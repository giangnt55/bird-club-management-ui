import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ParticipantListComponent } from 'src/app/components/participant-list/participant-list.component';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';
import { FeedbackService } from 'src/app/services/feedback.service';
import {
  Feedback,
  FeedbackCreateDto,
  FeedbackParam,
} from 'src/app/models/feedback.model';
import { TimeService } from 'src/app/time.service';
import { DatePipe } from '@angular/common';
import { ParticipateService } from 'src/app/services/participate.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent implements OnInit, OnDestroy {
  private subscription!: Subscription;
  loggedInAccount!: any | null;
  eventId!: string | null;
  event!: Event;
  feedbacks: Feedback[] = [];
  feedback: FeedbackCreateDto = {
    rating: 0,
    content: '',
    event_id: '',
  };

  constructor(
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private participantService: ParticipateService,
    private eventService: EventService,
    private feedbackService: FeedbackService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }

    this.subscription = this.route.params.subscribe((params) => {
      this.eventId = params['id'];
      this.getEvent();
      this.getFeedbacks();
    });
  }
  openParticipantsDialog() {
    const dialogRef = this.dialog.open(ParticipantListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }

  getEvent() {
    if (this.eventId) {
      this.subscription = this.eventService.getEvent(this.eventId).subscribe(
        (response) => {
          this.event = response;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      console.log('Event ID is null');
    }
  }

  getFeedbacks() {
    if (this.eventId) {
      const paging: FeedbackParam = {
        event_id: this.eventId,
        content: null,
        page: null,
        page_size: null,
        order_by: null,
        id: null,
        create_at_from: null,
      };

      this.subscription = this.feedbackService.gets(paging).subscribe(
        (response) => {
          this.feedbacks = response.data;
        },
        (error) => {
          console.log('Error:', error);
        }
      );
    } else {
      console.log('Event ID is null');
    }
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  getEmptyStars(rating: number): number[] {
    return Array(5 - rating).fill(0);
  }

  submitFeedback() {
    if (this.eventId) {
      this.feedback.event_id = this.eventId;
      this.feedbackService.feedback(this.feedback).subscribe(
        (response) => {
          // Handle success response
          this.toastr.success('Feedback successfully');

          this.changeDetectorRef.detectChanges(); // Trigger change detection
        },
        (error) => {
          // Handle error response
          this.toastr.error(error.error.message, 'Error');
        }
      );
    } else {
      console.log('Event ID is null');
    }
  }

  formatDate(date: Date | null | undefined): string {
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
