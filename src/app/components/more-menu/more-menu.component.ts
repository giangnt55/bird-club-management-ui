import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { MenuDialogComponent } from 'src/app/menu-dialog/menu-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-more-menu',
  templateUrl: './more-menu.component.html',
  styleUrls: ['./more-menu.component.css'],
})
export class MoreMenuComponent {
  constructor(
    private dialogRef: MatDialogRef<MenuDialogComponent>,
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  onCancelClick(): void {
    // Close the dialog
    this.dialogRef.close();
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
