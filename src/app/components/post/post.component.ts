import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {
  showFullText: boolean = false;
  isLiked: boolean = false;

  constructor(private likeService: LikeService) { }

  ngOnChanges(changes: SimpleChanges): void {}

  @Input() post!: Post;

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  likePost() {
    // this.likeService.likePost().subscribe(
    //   response => {
    //     console.log('Post Liked', response);
    //     this.isLiked = !this.isLiked;
    //     // Perform any additional actions after liking the post
    //   },
    //   error => {
    //     console.error('Failed to like the post', error);
    //     // Handle the error or display an error message to the user
    //   }
    // );
    // console.log('Post Liked');
  }

  sharePost() {
    // Implement the logic for sharing a post
    console.log('Post Shared');
  }

  commentPost() {
    // Implement the logic for commenting on a post
    console.log('Post Commented');
  }
}
