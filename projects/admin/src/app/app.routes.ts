import {Routes} from '@angular/router';

export const routes: Routes = [
  // {
  //   path: 'auth',
  //   loadChildren: () => import('./pages/auth/auth.routes'),
  // },
  {
    path: '',
    loadChildren: () => import('./pages/main/main.routes'),
    data: {
      isAdmin: true
    }
  },
  {
    path: '**',
    redirectTo: ''
  }
];
