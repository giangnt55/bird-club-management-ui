import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PostCreateComponent } from '../../components/post-create/post-create.component';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MoreMenuComponent } from '../more-menu/more-menu.component';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnChanges, AfterViewInit {
  showMoreOptions: boolean = false;
  showSearch = false;

  isSidebarSmaller: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this.getUser();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('sidebar change');
  }
  loggedInAccount!: any | null;

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
    this.changeDetectorRef.detectChanges();
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

  openMoreOptionsDialog() {
    const dialogRef = this.dialog.open(MoreMenuComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Close the dialog
        dialogRef.close();
      }
    });
  }

  logout() {
    this.authService.logout().subscribe(
      (response: Response) => {
        // Clear session storage
        sessionStorage.clear();

        // Clear local storage
        localStorage.clear();
        window.location.href = '/login';
        //this.toastr.success('Logout successfully', 'Success');
      },
      (error) => {
        console.error('Login error:', error);
        this.toastr.error('Error has occoured', 'Error');
      }
    );
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
