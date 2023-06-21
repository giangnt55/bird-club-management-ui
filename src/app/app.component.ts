import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges {
  constructor(private router: Router) {}

  title = 'bird-club-management-ui';

  ngOnInit(): void {
    console.log('routt', this.router.url);
    // if (currentUrl === '/inbox') {
    //   // Apply the styles for /inbox
    //   console.log('ok');
    //   this.applyInboxStyles();
    // }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('routt chnage', this.router.url);
  }

  applyInboxStyles(): void {
    const sidebar = document.querySelector('.sidebar');
    const logoImg = document.querySelector('.logo-img');
    const logoIcon = document.querySelector('.logo-icon');
    const sidebarButtons = document.querySelectorAll(
      '.sidebar button > span > span'
    );

    if (sidebar && logoImg && logoIcon && sidebarButtons) {
      sidebar.classList.add('inbox-styles');
      logoImg.classList.add('inbox-styles');
      logoIcon.classList.add('inbox-styles');
      sidebarButtons.forEach((button) => button.classList.add('inbox-styles'));
    }
  }

  getCurrentUrl(): string {
    return window.location.href;
  }

  getCurrentRoutePath(): string {
    return this.router.url;
  }
}
