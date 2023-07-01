import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './pages/home/home.component';
import { PostComponent } from './components/post/post.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewsReadingComponent } from './pages/news-reading/news-reading.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RemommendNewsComponent } from './components/remommend-news/remommend-news.component';
import { NewsComponent } from './components/news/news.component';
import { AuthInterceptor } from './interceptors/auth-interceptor.interceptor';
import { PostCreateComponent } from './components/post-create/post-create.component'; // Import the AuthInterceptor
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/app/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { NewsCreateComponent } from './pages/news-create/news-create.component';
import { ListNewsComponent } from './pages/list-news/list-news.component';
import { TestComponent } from './pages/test/test.component';
import { NewsItemComponent } from './components/news-item/news-item.component';
import { HotNewsComponent } from './components/hot-news/hot-news.component';
import { ChatsComponent } from './pages/chats/chats.component';
import { ProfilePostComponent } from './components/profile-post/profile-post.component';
import { PostDialogComponent } from './components/post-dialog/post-dialog.component';
import { CommmentComponent } from './components/commment/commment.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { MenuDialogComponent } from './menu-dialog/menu-dialog.component';
import { HighlightUsernameDirective } from './helpers/highlight-username.directive';
import { LikeComponent } from './components/like/like.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { EventComponent } from './components/event/event.component';
import { EventsComponent } from './pages/events/events.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';
import { SuggestionUserComponent } from './components/suggestion-user/suggestion-user.component';
import { UserComponent } from './components/user/user.component';
@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    PostComponent,
    LoginComponent,
    ProfileComponent,
    NewsReadingComponent,
    RegisterComponent,
    UserCardComponent,
    SpinnerComponent,
    RemommendNewsComponent,
    NewsComponent,
    PostCreateComponent,
    CreateArticleComponent,
    NewsCreateComponent,
    ListNewsComponent,
    TestComponent,
    NewsItemComponent,
    HotNewsComponent,
    ChatsComponent,
    ProfilePostComponent,
    PostDialogComponent,
    CommmentComponent,
    DateAgoPipe,
    MenuDialogComponent,
    HighlightUsernameDirective,
    LikeComponent,
    UpdateProfileComponent,
    PostDetailComponent,
    UpdatePasswordComponent,
    EventComponent,
    EventsComponent,
    EventDetailComponent,
    SuggestionUserComponent,
    UserComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    CKEditorModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    }),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Add the AuthInterceptor
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
