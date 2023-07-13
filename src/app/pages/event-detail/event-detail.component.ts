import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ParticipantListComponent } from 'src/app/components/participant-list/participant-list.component';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent {
  constructor(private dialog: MatDialog) {}

  openParticipantsDialog() {
    const dialogRef = this.dialog.open(ParticipantListComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }
}
