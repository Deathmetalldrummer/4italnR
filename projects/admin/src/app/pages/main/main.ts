import {Component, signal} from '@angular/core';
import {BasketService, Layout, Logo, Menu, MenuAndRoute, MenuBasket, Search} from '../../../../../lib/src/public-api';
import {Router, RouterOutlet} from '@angular/router';

@Component({
  selector: 'admin-main',
  imports: [Layout, Logo, Menu, RouterOutlet, Search, MenuBasket],
  templateUrl: './main.html',
  styleUrl: './main.sass',
  standalone: true
})
export class Main {
  menu: any[] = [];
  basketCount = signal<number>(0);
  constructor(private menuAndRouteService: MenuAndRoute,
              private basketService: BasketService,
              private router: Router) {
    this.menu = menuAndRouteService.menu();
    basketService.basket.subscribe((val: any[]) => {
      let x = 0;
      val.map(v => x += (v?.count || 1));
      this.basketCount.set(x);
    });
  }



  onKeyword(val: string){
    if (val) {
      this.router.navigate(['/'], {
        queryParams: { search: val },
      });
    } else {
      this.router.navigate(['/'], {
        queryParams: {},
      });
    }

  };
}
