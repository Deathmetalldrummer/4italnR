import {effect, NgModule} from '@angular/core';
import {Route, Router, RouterModule, Routes} from '@angular/router';
import {ProductAddComponent} from './components/product-add/product-add.component';
import {ProductsComponent} from './products.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {MenuAndRoute} from '../../services/menu-and-route';
import {ProductInfoComponent} from './components/product-info/product-info.component';
import {ProductEditComponent} from './components/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    title: 'Все продукты',
    component: ProductsComponent,
    children: [
      {
        path: 'add',
        component: ProductAddComponent,
        data: {type: 'all'},
      },
      {
        path: 'book/:id',
        component: ProductInfoComponent,
      },
      {
        path: 'book/:id/edit',
        component: ProductEditComponent,
      },
      {
        path: '',
        component: ProductListComponent,
        data: {type: 'all'},
      },
      // {
      //   path: '**',
      //   redirectTo: '/'
      // }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {
  constructor(private menuAndRouteService: MenuAndRoute, private router: Router) {
    effect(() => {
      const route = this.findRouteByComponent(this.router.config, ProductsComponent);
      const _routes = menuAndRouteService.routers();
      if (route) {
        const child: Routes = route.children || [];
        route.children = [...this.generateRoutes(_routes), ...child];
        router.resetConfig(router.config);
      }
    });
  }

  private generateRoutes(baseRoutes: any[]) {
    const _routes = [];

    for (const item of baseRoutes) {
      _routes.push({
        ...item,
        component: ProductListComponent,
      });
      _routes.push({
        ...item,
        path: item.path + '/add',
        component: ProductAddComponent,
      });
    }
    return _routes;
  }


  findRouteByComponent(routes: Route[], targetComponent: any): Route | null {
    for (const route of routes) {
      if (route.component === targetComponent) {
        return route;
      }
      const loadedRoutes = (route as any)._loadedRoutes as Route[] | undefined;
      if (loadedRoutes) {
        const foundInLoaded = this.findRouteByComponent(loadedRoutes, targetComponent);
        if (foundInLoaded) return foundInLoaded;
      }

      if (route?.children) {
        const foundInChildren = this.findRouteByComponent(route.children, targetComponent);
        if (foundInChildren) return foundInChildren;
      }
    }

    return null;
  }
}

