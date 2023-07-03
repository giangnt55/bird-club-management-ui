import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostCreateComponent } from '../../components/post-create/post-create.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnChanges {
  showMoreOptions: boolean = false;
  showSearch = false;

  isSidebarSmaller: boolean = false;

  constructor(private router: Router, private dialog: MatDialog) {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('sidebar change');
  }
  loggedInAccount!: any | null;
  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
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

  toggleMoreOptions() {
    this.showMoreOptions = !this.showMoreOptions;
  }

  logout() {
    // Your logout implementation
  }
  toggleSearchTable() {
    if (this.showSearch) {
      this.hideSearchBox();
    } else {
      this.showSearchBox();
    }
  }

  hideSearchBox() {
    this.showSearch = false;
    this.isSidebarSmaller = false;
  }

  showSearchBox() {
    this.showSearch = true;
    this.isSidebarSmaller = true;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  redirectToSetting() {}

  redirectToPassword() {}

  changeBackgroundColor() {}
}
