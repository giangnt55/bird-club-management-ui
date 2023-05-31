import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  posts = [
    {
      imageUrl:
        'https://i.pinimg.com/564x/7d/0d/6d/7d0d6de4a1944d7f0d0f9b012c05e532.jpg',
      title: 'Post Title 1',
      description: 'Post description or caption 1',
    },
    {
      imageUrl:
        'https://i.pinimg.com/564x/ba/89/13/ba89133ce6ceae7d58168ab96b68e3e4.jpg',
      title: 'Post Title 2',
      description: 'Post description or caption 2',
    },
    // Add more post objects as needed
  ];
}
