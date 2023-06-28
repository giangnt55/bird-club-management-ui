import { Component } from '@angular/core';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  email: string | undefined;
  currentPassword: string | undefined;
  newPassword: string | undefined;
  confirmPassword: string | undefined;

  resetForm() {
    this.email = '';
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }
}
