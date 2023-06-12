import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router) {}

  redirectToHome() {
    this.router.navigate(['/home']); // Replace '/home' with your actual home route
  }

  redirectToProfile() {
    this.router.navigate(['/profile']);
  }

  redirectToNews() {
    this.router.navigate(['/news']);
  }
}
