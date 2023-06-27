import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DetailComment } from 'src/app/models/comment.model';
import { CommentService } from 'src/app/services/comment.service';
import { LikeService } from '../like.service';

@Component({
  selector: 'app-commment',
  templateUrl: './commment.component.html',
  styleUrls: ['./commment.component.css'],
})
export class CommmentComponent implements OnInit {
  @Input() detailComment!: DetailComment;
  loggedInAccount!: any | null;

  constructor(
    private dialog: MatDialog,
    private likeService: LikeService,
    private commentService: CommentService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
  }
}
