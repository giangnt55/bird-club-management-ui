import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css'],
})
export class NewsCreateComponent {
  title = 'angular';
  public Editor = ClassicEditor;
  public blogTitle!: string;
  public blogCoverImage!: string;
  public blogContent!: string;

  public onReady(editor: any): void {
    const element = editor.ui.view.toolbar.element;
    const parent = editor.ui.view.toolbar.element.parentElement;

    parent.insertBefore(element, parent.firstChild);
  }

  constructor(private storage: AngularFireStorage) {}

  public saveBlog(): void {
    // Implement your logic to save the blog post data here
    console.log('Blog Title:', this.blogTitle);
    console.log('Cover Image URL:', this.blogCoverImage);
    console.log('Content:', this.blogContent);
  }
}
