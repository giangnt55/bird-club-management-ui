import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  imageUrl: string | null = null;
  loggedInAccount!: any | null;
  form: FormGroup;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
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
    }

    this.imageUrl = this.loggedInAccount.avatar;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.imageUrl = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  uploadImage() {
    this.firebaseService.uploadImage(this.imageUrl).subscribe(
      (downloadURL) => {
        // Get the content
        const content = document.querySelector('.content')?.textContent?.trim();
      },
      (error) => {
        this.toastr.error('Failed to upload image');
      }
    );
  }

  // onSaveClick(): void {
  //   const userUpdate = {
  //     fullname: this.
  //   }
  // }
}
