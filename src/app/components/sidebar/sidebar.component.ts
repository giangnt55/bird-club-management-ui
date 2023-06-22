import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostCreateComponent } from '../../components/post-create/post-create.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  showOptions: boolean = false;
  showSearch = false;

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

  openDialog() {
    const dialogRef = this.dialog.open(PostCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }
  toggleSearchTable() {
    this.showSearch = !this.showSearch;
  }

  stopPropagation(event: Event){
    event.stopPropagation();
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  redirectToSetting(){}

  redirectToPassword(){}

  logout(){}
}
