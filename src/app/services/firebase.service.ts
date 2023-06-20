import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  constructor(private storage: AngularFireStorage) {}

  uploadImage(previewImageSrc: string | null): Observable<string> {
    return new Observable<string>((observer) => {
      if (previewImageSrc) {
        const file = this.dataURLtoFile(previewImageSrc, 'image.png');
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
                  observer.next(downloadURL);
                  observer.complete();
                });
            })
          )
          .subscribe();
      } else {
        observer.error('No image selected');
      }
    });
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
