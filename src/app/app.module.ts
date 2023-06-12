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
import { TestComponent } from './pages/test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { RemommendNewsComponent } from './components/remommend-news/remommend-news.component';
import { NewsComponent } from './components/news/news.component';
import { AuthInterceptor } from './interceptors/auth-interceptor.interceptor'; // Import the AuthInterceptor

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
    TestComponent,
    SpinnerComponent,
    RemommendNewsComponent,
    NewsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
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
