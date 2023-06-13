import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  OnChanges,
} from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit, OnChanges {
  @ViewChild('fileInput') fileInput!: ElementRef;
  placeholder = "What's on your mind?";
  previewImageSrc: string | null = null;

  constructor(private storage: AngularFireStorage) {}

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
      const filePath = 'path/to/upload/' + file.name;
      const task = this.storage.upload(filePath, file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.storage
              .ref(filePath)
              .getDownloadURL()
              .subscribe((downloadURL) => {
                console.log('Image uploaded. URL:', downloadURL);
                // Perform further actions with the downloadURL (e.g., store in database)
                // Reset previewImageSrc and clear file input here if needed
                this.previewImageSrc = null;
                this.fileInput.nativeElement.value = '';
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
