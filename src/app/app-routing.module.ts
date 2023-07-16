import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsReadingComponent } from './pages/news-reading/news-reading.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListNewsComponent } from './pages/list-news/list-news.component';
import { NewsCreateComponent } from './pages/news-create/news-create.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { BirdComponent } from './pages/bird/bird.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminUsersComponent } from './pages/admin-users/admin-users.component';
import { StaffUsersComponent } from './pages/staff-users/staff-users.component';
import { StaffPostsComponent } from './pages/staff-posts/staff-posts.component';
import { StaffArticlesComponent } from './pages/staff-articles/staff-articles.component';
import { StaffBirdsComponent } from './pages/staff-birds/staff-birds.component';
import { StaffSettingsComponent } from './pages/staff-settings/staff-settings.component';
import { BirdDetailComponent } from './components/bird-detail/bird-detail.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { StaffEventsComponent } from './pages/staff-events/staff-events.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  {
    path: 'news',
    component: ListNewsComponent,
  },
  { path: 'news/:id', component: NewsReadingComponent },
  { path: 'create-news', component: NewsCreateComponent },
  { path: 'bird', component: BirdComponent },
  { path: 'inbox', component: ChatsComponent },
  { path: 'update-profile', component: UpdateProfileComponent },
  { path: 'update-password', component: UpdatePasswordComponent },
  { path: 'events', component: EventsComponent },
  { path: 'events/:id', component: EventDetailComponent },
  { path: 'admin', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile/:username', component: ProfileComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'staff', redirectTo: '/staff-posts', pathMatch: 'full' },
  { path: 'staff-events', component: StaffEventsComponent },
  { path: 'staff-posts', component: StaffPostsComponent },
  { path: 'staff-settings', component: StaffSettingsComponent },
  { path: 'bird-detail', component: BirdDetailComponent },
  { path: 'user-card', component: UserCardComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
