import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserUpdate } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit, OnDestroy {
  imageUrl: string | null = null;
  loggedInAccount!: any | null;
  form: FormGroup;
  private subscription!: Subscription;
  private isChangeImg: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private changeDetectorRef: ChangeDetectorRef,
    private firebaseService: FirebaseService
  ) {
    this.form = this.formBuilder.group({
      fullname: '',
      introduction: '',
      avatar: '',
      role: '',
      status: '',
      email: '',
      phone_number: '',
      address: '',
    });
  }

  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
      this.form.patchValue(this.loggedInAccount);
    }

    this.imageUrl = this.loggedInAccount.avatar;
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
    this.isChangeImg = true;
  }

  uploadImage() {
    this.firebaseService.uploadImage(this.imageUrl).subscribe(
      (downloadURL) => {
        // Get the content
        const content = document.querySelector('.content')?.textContent?.trim();
        this.imageUrl = downloadURL;
        return this.imageUrl;
      },
      (error) => {
        this.toastr.error('Failed to upload image');
        return this.imageUrl;
      }
    );
  }

  onSaveClick(): void {
    if (this.form.valid) {
      this.form.value.avatar = this.imageUrl;
      this.loggedInAccount = { ...this.loggedInAccount, ...this.form.value };

      // Save the updated account information to session storage
      sessionStorage.setItem(
        'account_infor',
        JSON.stringify(this.loggedInAccount)
      );

      const userUpdate: UserUpdate = this.form.value as UserUpdate;

      this.subscription = this.usersService
        .updateUserInfor(this.loggedInAccount.id, userUpdate)
        .subscribe(
          (response) => {
            this.toastr.success('Profile updated successfully');
            this.changeDetectorRef.detectChanges();
          },
          (error) => {
            this.toastr.error(error.error.message, 'Error');
          }
        );
    }
  }
}
