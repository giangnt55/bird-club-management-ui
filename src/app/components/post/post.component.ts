import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  ElementRef,
} from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { LikeService } from 'src/app/services/like.service';
import { Response } from 'src/app/models/response.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit, OnDestroy, OnChanges {
  showFullText: boolean = false;
  isLiked: boolean = false;
  totalLikes: number = 0;

  constructor(private likeService: LikeService, private elementRef: ElementRef) { }

  ngOnChanges(changes: SimpleChanges): void {}

  @Input() post!: Post;

  ngOnInit(): void {
    this.totalLikes = this.post.total_like;
  }
  ngOnDestroy(): void {}

  likePost() {
    if (this.isLiked) {
      // User already liked the post, so unlike it
      this.likeService.likePost(this.post.id).subscribe(
        (response: Response<boolean>) => {
          if (response.status_code === 200) {
            this.totalLikes--;
            this.isLiked = false;
            this.changeIconColor('rgb(38, 38, 38)');
          }
        },
        (error) => {
          // Handle error response
          console.error('Failed to unlike the post:', error);
        }
      );
    } else {
      // User has not liked the post, so like it
      this.likeService.likePost(this.post.id).subscribe(
        (response: Response<boolean>) => {
          if (response.status_code === 200) {
            this.totalLikes++;
            this.isLiked = true;
            this.changeIconColor('red');
          }
        },
        (error) => {
          // Handle error response
          console.error('Failed to like the post:', error);
        }
      );
    }
  }

  private changeIconColor(color: string) {
    const likeIcon = this.elementRef.nativeElement.querySelector('#likeIcon');
    likeIcon.setAttribute('fill', color);
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
