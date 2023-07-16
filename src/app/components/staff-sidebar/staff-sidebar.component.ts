import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DevelopingDialogComponent } from '../developing-dialog/developing-dialog.component';

@Component({
  selector: 'app-staff-sidebar',
  templateUrl: './staff-sidebar.component.html',
  styleUrls: ['./staff-sidebar.component.css'],
})
export class StaffSidebarComponent {
  private subscription!: Subscription;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  openDevelopingDialog(): void {
    this.dialog.open(DevelopingDialogComponent);
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
}
