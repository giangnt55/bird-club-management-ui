import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
import {
  Component,
  ElementRef,
  ViewChild,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  form: FormGroup;
  previewImageSrc: string | null = null;
  @ViewChild('fileInput') fileInput!: ElementRef;
  placeholder = "What's on your mind?";
  loggedInAccount!: any | null;

  constructor(
    public dialogRef: MatDialogRef<PostCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private postService: PostService,
    private toastr: ToastrService,
    private firebaseService: FirebaseService
  ) {
    this.form = this.formBuilder.group({
      content: [''],
    });
  }
  ngOnInit(): void {
    // Retrieve the stored account information from session storage
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
      // Use the account information here
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

        // Create a new post object
        const post = {
          title: 'Post Title',
          content: content || '',
          image: downloadURL,
        };

        // Call the createPost method from the post service
        this.postService.createPost(post).subscribe(
          (response) => {
            // Handle successful post creation
            console.log('Post created:', response);
            this.cancelPreviewImage();
            this.toastr.success('Post created successfully');
            window.location.reload();
          },
          (error) => {
            // Handle error during post creation
            this.toastr.error('Failed to create post');
          }
        );
      },
      (error) => {
        // Handle error during image upload
        console.error('Image upload error:', error);
        this.toastr.error('Failed to upload image');
      }
    );
  }
}
