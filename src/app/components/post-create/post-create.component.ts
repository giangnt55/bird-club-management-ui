import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnChanges,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { PostService } from '../../services/post.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit, OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef;
  placeholder = "What's on your mind?";
  previewImageSrc: string | null = null;

  constructor(
    private storage: AngularFireStorage,
    private postService: PostService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.previewImageSrc = null;
  }

  ngOnChanges() {
    // Handle changes here if needed
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
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
    if (this.previewImageSrc !== null) {
      const file = this.dataURLtoFile(this.previewImageSrc, 'image.png');
      const timestamp = new Date().getTime();
      const randomNumber = Math.floor(Math.random() * 1000000);
      const fileName = `image_${timestamp}_${randomNumber}.png`;
      const filePath = 'path/to/upload/' + fileName;
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.storage
              .ref(filePath)
              .getDownloadURL()
              .subscribe((downloadURL) => {
                // Get the content
                const content = document
                  .querySelector('.content')
                  ?.textContent?.trim();

                // Create a new post object
                const post = {
                  title: 'Post Title',
                  content: content || '', // Ensure content is defined and provide a default value
                  image: downloadURL,
                };

                // Call the createPost method from the post service
                this.postService.createPost(post).subscribe(
                  (response) => {
                    // Handle successful post creation
                    console.log('Post created:', response);
                    // Reset previewImageSrc and clear file input here if needed
                    // this.previewImageSrc = null;
                    // this.fileInput.nativeElement.value = '';
                    this.cancelPreviewImage();
                    this.toastr.success('Post created successfully');
                  },
                  (error) => {
                    // Handle error during post creation
                    this.toastr.error('Failed to create post');
                  }
                );
              });
          })
        )
        .subscribe();
    }
  }

  private dataURLtoFile(dataURL: string, fileName: string): File {
    const arr = dataURL.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch !== null ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  }
}
