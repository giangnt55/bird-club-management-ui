import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostCreateComponent } from '../../components/post-create/post-create.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  constructor(private router: Router, private dialog: MatDialog) {}

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
