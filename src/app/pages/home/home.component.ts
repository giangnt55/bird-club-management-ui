import { Component } from '@angular/core';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  posts: Post[] = [
    {
      id: '1',
      imageUrl:
        'https://i.pinimg.com/564x/7d/0d/6d/7d0d6de4a1944d7f0d0f9b012c05e532.jpg',
      title: 'Post Title 1',
      description: 'Post description or caption 1',
      likeCount: 0,
      commentCount: 0,
      shareCount: 0,
      createdAt: new Date(),
      editedAt: new Date(),
    },
    // Add more post objects as needed
  ];
}
