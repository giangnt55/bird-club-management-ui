import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-item',
  templateUrl: './news-item.component.html',
  styleUrls: ['./news-item.component.css'],
})
export class NewsItemComponent {
  constructor(private router: Router) {}
  getDetail() {
    console.log('@@@@@');
    this.router.navigate(['/news', '123123123sajkdsakjsa']);
  }
}
