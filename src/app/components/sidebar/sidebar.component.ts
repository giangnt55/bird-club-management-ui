import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostCreateComponent } from '../../components/post-create/post-create.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  constructor(private router: Router, private dialog: MatDialog) {}
  loggedInAccount!: any | null;
  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
      // Use the account information here
      console.log(this.loggedInAccount);
    }
  }

  showMoreOptions: boolean = false;

  openDialog() {
    const dialogRef = this.dialog.open(PostCreateComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }

  toggleMoreOptions() {
    this.showMoreOptions = !this.showMoreOptions;
  }

  logout() {
    // Your logout implementation
  }
}
