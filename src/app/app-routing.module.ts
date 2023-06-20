import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsReadingComponent } from './pages/news-reading/news-reading.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ListNewsComponent } from './pages/list-news/list-news.component';
import { NewsCreateComponent } from './pages/news-create/news-create.component';
import { TestComponent } from './pages/test/test.component';
import { ChatsComponent } from './pages/chats/chats.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'news', component: NewsReadingComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'list-news', component: ListNewsComponent },
  { path: 'create-news', component: NewsCreateComponent },
  { path: 'test', component: TestComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'inbox', component: ChatsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
