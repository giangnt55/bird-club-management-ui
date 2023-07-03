import { Component } from '@angular/core';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent {
  showSecondTimeInput: boolean = false;

  constructor() {}

  toggleTimeInput() {
    this.showSecondTimeInput = !this.showSecondTimeInput;
  }
}
