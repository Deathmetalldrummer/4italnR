import {Route} from '@angular/router';
import {Main} from './main';

export default [
  {
    path: '',
    title: 'Главная',
    component: Main,
    children: [
      {
        path: 'basket',
        title: 'Корзина покупок',
        loadChildren: () => import('../../../../../lib/src/public-api').then(x => x.BasketRoutingModule),
      },
      {
        path: '',
        title: 'Все товары',
        loadChildren: () => import('../../../../../lib/src/public-api').then(x => x.ProductsRoutingModule),
      },
    ]
  },
] satisfies Route[];
