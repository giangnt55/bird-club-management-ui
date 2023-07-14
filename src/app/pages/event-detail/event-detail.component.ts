import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ParticipantListComponent } from 'src/app/components/participant-list/participant-list.component';
import { EventService } from 'src/app/services/event.service';
import { Event } from 'src/app/models/event.model';

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

  constructor(
    private toastr: ToastrService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private eventService: EventService,
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

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
