import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnChanges, AfterViewInit {
  constructor(private router: Router) {}
  ngAfterViewInit(): void {
    console.log('after init', this.router.url);
  }

  title = 'bird-club-management-ui';

  ngOnInit(): void {
    console.log('routt init', this.router.url);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('routt chnage', this.router.url);
  }

  // Code smell
  isAdminUrls(): boolean {
    const restrictedUrls: string[] = [
      '/dashboard',
      '/admin-users',
      '/admin-settings',
    ];
    const currentRoute = this.router.url;

    return restrictedUrls.includes(currentRoute);
  }

  // Code smell
  isStaffUrls(): boolean {
    const restrictedUrls: string[] = [
      '/staff',
      '/staff-users',
      '/staff-events',
      '/staff-posts',
      '/staff-articles',
      '/staff-birds',
      '/staff-settings',
    ];
    const currentRoute = this.router.url;

    return restrictedUrls.includes(currentRoute);
  }

  // Code smell
  isAuthUrls(): boolean {
    const restrictedUrls: string[] = ['/login', '/register'];
    const currentRoute = this.router.url;

    return restrictedUrls.includes(currentRoute);
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
