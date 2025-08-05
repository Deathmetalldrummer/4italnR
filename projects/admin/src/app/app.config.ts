import {
  ApplicationConfig, inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {provideRouter, Router} from '@angular/router';

import { routes } from './app.routes';
import {environment} from '../environments/environment.development';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {AuthState} from '../../../lib/src/services/auth.state';
import {MenuAndRoute} from '../../../lib/src/services/menu-and-route';
import {lastValueFrom} from 'rxjs';
import {AppInterceptor} from './app.interceptor';
import {IsAdminState} from '../../../lib/src/services/is-admin.state';



export const appConfig: ApplicationConfig = {
  providers: [
    { provide: 'environment', useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    provideAppInitializer(appInit),
    provideHttpClient(withInterceptorsFromDi()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
  ]
};


async function appInit() {
  const isAdmin = inject(IsAdminState);
  const authState = inject(AuthState);
  const router = inject(Router);
  const menuAndRoute = inject(MenuAndRoute);

  isAdmin.setIsAdmin(true);
  await lastValueFrom(authState.initUser())
  // const isAuth = authState.isAuth$();
  // await routerLink(isAuth, router);
  // return isAuth ? await lastValueFrom(menuAndRoute.init()) : true;
  return await lastValueFrom(menuAndRoute.init());
}



async function routerLink(isAuth: boolean, router: Router) {
  const path = location.pathname;
  const isAuthPath = path === '/auth';

  if (!isAuth && !isAuthPath) {
    return router.navigate(['auth']);
  }

  if (isAuth && isAuthPath) {
    return router.navigate(['/']);
  }

  return router.navigate([path]);
}
