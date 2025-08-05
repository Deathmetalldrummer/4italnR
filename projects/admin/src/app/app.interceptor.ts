import {Inject, Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpClient, HttpResponse, HttpBackend
} from '@angular/common/http';
import {delay, map, Observable, of, tap} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AppInterceptor implements HttpInterceptor {
  private rawHttp: HttpClient;

  constructor(private httpBackend: HttpBackend, @Inject('environment') private environment: any) {
    this.rawHttp = new HttpClient(httpBackend);
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    switch (request.url) {
      case this.environment.user:
        return of(new HttpResponse({ status: 200, body: { user: this.rejectByChance() } }));
      case this.environment.auth.login:
        // console.log('environment.auth.login', request.body);
        return of(new HttpResponse({ status: 200, body: request.body })).pipe(delay(2000));
      case this.environment.categories:
        // console.log('environment.categories', request.body);
        return this.rawHttp.get('./assets/menu.json').pipe(
          tap(data => console.log(data)),
          map(data => new HttpResponse({ status: 200, body: data })),
          delay(1000)
        )
      case this.environment.products:
        // console.log('environment.products', request.body);
        switch (request.method) {
          case ('GET'):
            return this.rawHttp.get('./assets/books.json').pipe(
              tap(data => console.log(data)),
              map(data => new HttpResponse({ status: 200, body: data })),
              delay(1000)
            )
          case ('POST'):
            return of(new HttpResponse({ status: 200, body: request.body })).pipe(delay(2000));
          case ('PUT'):
              return of(new HttpResponse({ status: 200, body: request.body })).pipe(delay(2000));
          case ('DELETE'):
              return of(new HttpResponse({ status: 200, body: request.body })).pipe(delay(2000));
        }
    }

    // return of(new HttpResponse({ status: 200, body: {} }));
    return next.handle(request);
  }

  /** True = 80%, False = 20% */
  rejectByChance() {
    return Math.random() >= 0.20;
  }
}
