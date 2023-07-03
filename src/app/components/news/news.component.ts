import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { News } from 'src/app/models/news.model';
import { Post } from 'src/app/models/post.model';
import { NewsService } from 'src/app/services/news.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent implements OnInit, OnDestroy {
  news: News[] = [];
  private subscription!: Subscription;
  private currentPage: number = 1;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.getNews();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getNews() {
    this.subscription = this.newsService.getNews().subscribe(
      (response) => {
        const newNews = response.data;
        this.news = [...this.news, ...newNews];
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
}
