import {computed, Inject, Injectable, Signal, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, tap} from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthState {
  private _user = signal<User | null>(null);

  readonly user$ = computed(() => this._user());
  readonly isAuth$ = computed((): boolean => !!this._user());

  constructor(private http: HttpClient, @Inject('environment') private environment: any) {
  }

  get user(): Signal<User | null> {
    return this.user$;
  }

  set user(user: User | null) {
    this._user.set(user);
  }

  initUser(): Observable<User> {
    return this.http.get(this.environment.user)
      .pipe(
        map((body: any) => body.user),
        tap((user: any) => this.user = user)
      )
  }

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.environment.auth.login, {email, password})
      .pipe(tap((user) => this.user = user));
  }

  signup(email: string, password: string) {
    return this.http.post<User>(this.environment.auth.register, {email, password});
  }

  confirmEmail(token: string) {
    return this.http.post(this.environment.auth.confirm, {token});
  }

  logout() {
    this.user = null;
  }
}
