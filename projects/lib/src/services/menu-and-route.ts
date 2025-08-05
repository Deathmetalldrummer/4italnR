import {Inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, map} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuAndRoute {
  private _menu$ = signal<any[]>([]);
  private _routers$ = signal<any[]>([]);
  public routers$ = new BehaviorSubject([]);
  constructor(private http: HttpClient, @Inject('environment') private environment: any) {}

  init(): any {
    return this.http.get(this.environment.categories)
      .pipe(map((menu: any) => {
        const _menu = menu.map((item: any) => ({ title: item.title, icon: item.icon, path: item.path }))
        const _route = menu.map((item: any) => ({ path: item.path, title: item.title, data: { type: item.title } }));
        this.routers$.next(_route);
        this._menu$.set(_menu);
        this._routers$.set(_route);
      }))
  }

  get menu() {
    return this._menu$;
  }

  get routers() {
    return this._routers$;
  }
}
