import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-participant-list',
  templateUrl: './participant-list.component.html',
  styleUrls: ['./participant-list.component.css'],
})
export class ParticipantListComponent {


  constructor(private dialog: MatDialog) {}

}
