import {Component} from '@angular/core';
import {BasketCardComponent} from '../basket-card/basket-card.component';
import {NgForOf} from '@angular/common';
import {BasketService} from '../../services/basket.service';
import {Router} from '@angular/router';

@Component({
  selector: 'nr-basket-list',
  templateUrl: './basket-list.component.html',
  styleUrl: './basket-list.component.sass',
  imports: [
    BasketCardComponent,
    NgForOf
  ],
  standalone: true
})
export class BasketListComponent {
  basket: any[] = [];
  constructor(private basketService: BasketService, private router: Router) {
    this.basketService.basket.subscribe((val: any[]) => {
      if (!val.length) this.router.navigate(['/']).then();
      this.basket = [...val];
    });
  }

  remove(id: string) {
    this.basketService.removeBasket(id);
  }

  countChange(count: number, product: any) {
    this.basketService.setBasketCount(product, count)};
}
