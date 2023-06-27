import { Component, Input, OnInit } from '@angular/core';
import { DetailComment } from 'src/app/models/comment.model';

@Component({
  selector: 'app-commment',
  templateUrl: './commment.component.html',
  styleUrls: ['./commment.component.css'],
})
export class CommmentComponent implements OnInit {
  @Input() detailComment!: DetailComment;
  loggedInAccount!: any | null;

  ngOnInit(): void {
    const storedAccountInfo = sessionStorage.getItem('account_infor');
    if (storedAccountInfo) {
      this.loggedInAccount = JSON.parse(storedAccountInfo);
    }
  }
}
