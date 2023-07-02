import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';
import { environment } from '../environments/environment';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private apiUrl: string = environment.apiUrl;
  private totalRequests = 0;
  private ignoredAPIs: string[] = [
    `${this.apiUrl}/like`,
    `${this.apiUrl}/comment`,
  ];

  constructor(private loadingService: LoaderService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const apiUrl = request.url;
    if (!this.shouldIgnoreApi(apiUrl)) {
      this.totalRequests++;
      this.loadingService.setLoading(true);
    }

    return next.handle(request).pipe(
      finalize(() => {
        if (!this.shouldIgnoreApi(apiUrl)) {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            this.loadingService.setLoading(false);
          }
        }
      })
    );
  }

  private shouldIgnoreApi(apiUrl: string): boolean {
    for (const ignoredApi of this.ignoredAPIs) {
      if (apiUrl.startsWith(ignoredApi)) {
        return true;
      }
    }
    return false;
  }
}
