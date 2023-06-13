import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  form: FormGroup;
  previewImageSrc: string | null = null;

  constructor(
    public dialogRef: MatDialogRef<PostCreateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      content: [''],
    });
  }

  submitForm() {
    const formData = {
      content: this.form.value.content,
      image: this.previewImageSrc,
    };
    this.dialogRef.close(formData);
  }

  previewImage(event: any) {
    // Update the logic to preview the image (similar to the existing code)
  }

  cancelPreviewImage() {
    // Update the logic to cancel the preview image (similar to the existing code)
  }
}
