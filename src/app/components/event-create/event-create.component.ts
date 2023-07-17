import {
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FirebaseService } from 'src/app/services/firebase.service';
import { EventService } from 'src/app/services/event.service';
import { EventCreateDto } from 'src/app/models/event.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css'],
})
export class EventCreateComponent implements OnInit, OnDestroy {
  form: FormGroup;
  previewImageSrc: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  placeholder = "What's on your mind?";
  loggedInAccount!: any | null;
  private subscription!: Subscription;

  constructor(
    public dialogRef: MatDialogRef<EventCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private eventService: EventService,
    private toastr: ToastrService,
    private firebaseService: FirebaseService
  ) {
    this.form = this.formBuilder.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      expectedMembersFrom: [0, Validators.min(0)],
      expectedMembersTo: [0, Validators.min(0)],
      eventOption: ['', Validators.required],
      description: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
      // Use the account information here
      console.log(this.loggedInAccount);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  penFileInput() {
    this.fileInput.nativeElement.click();
  }

  submitForm() {
    const formData = {
      content: this.form.value.content,
      image: this.previewImageSrc,
    };
    this.dialogRef.close(formData);
  }

  handleInput(event: any) {
    const content = event.target.textContent.trim();
    const editableDiv = event.target as HTMLElement;

    if (content === '') {
      editableDiv.dataset['placeholder'] = this.placeholder;
    } else {
      delete editableDiv.dataset['placeholder'];
    }
  }

  previewImage(event: any) {
    const previewContainer = document.getElementById('imagePreview');
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const image = document.createElement('img');
      image.src = reader.result as string;
      image.classList.add('img-thumbnail');
      previewContainer!.innerHTML = '';
      previewContainer!.appendChild(image);
      this.previewImageSrc = image.src;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  cancelPreviewImage() {
    this.previewImageSrc = null;
    const previewContainer = document.getElementById('imagePreview');
    previewContainer!.innerHTML = '';
    this.fileInput.nativeElement.value = '';
  }

  uploadImage() {
    this.firebaseService.uploadImage(this.previewImageSrc).subscribe(
      (downloadURL) => {
        // Get the content
        const content = document.querySelector('.content')?.textContent?.trim();
        this.previewImageSrc = downloadURL;
      },
      (error) => {
        this.toastr.error('Failed to upload image');
      }
    );
  }

  createEvent() {
    if (this.form.invalid) {
      return;
    }

    this.uploadImage();

    const formData = this.form.value;
    const eventDto: EventCreateDto = {
      event_name: formData.eventName,
      status: 1, // Update with the appropriate status value
      type: 1, // Update with the appropriate type value
      cover_image: this.previewImageSrc ?? '', // Set the cover image or an empty string if not available
      description: formData.description,
      max_participants: formData.expectedMembersTo,
      min_participants: formData.expectedMembersFrom,
      start_date: new Date(formData.startTime),
      end_date: new Date(formData.endTime),
      location: formData.location,
      prerequisite: '', // Update with the prerequisite value if applicable
      evaluation_strategy: '', // Update with the evaluation strategy value if applicable
    };

    this.subscription = this.eventService.createEvent(eventDto).subscribe(
      (response) => {
        this.toastr.success('Created');
      },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    );
  }
}
