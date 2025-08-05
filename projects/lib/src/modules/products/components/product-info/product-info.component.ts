import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductsService} from '../../services/products.service';
import {NgIf} from '@angular/common';
import {map, switchMap} from 'rxjs';
import {Rate} from '../../../../components/rate/rate';
import {IsAdminState} from '../../../../services/is-admin.state';
import {BasketService} from '../../../basket/services/basket.service';

@Component({
  selector: 'nr-product-info',
  imports: [
    NgIf,
    Rate,
    RouterLink
  ],
  templateUrl: './product-info.component.html',
  standalone: true,
  styleUrl: './product-info.component.sass'
})
export class ProductInfoComponent {
  isAdmin: boolean = false;
  product = signal<any>({});
  constructor(private router: Router,
              private route: ActivatedRoute,
              private isAdminState: IsAdminState,
              private basketService: BasketService,
              private productsService: ProductsService) {
    this.route.params.pipe(
      map(params => params?.['id'] || ''),
      switchMap(id => this.productsService.getById(id))
    ).subscribe(product => {
      this.product.set(product);
    });
    this.isAdmin = this.isAdminState.isAdmin();
  }

  addToCart() {
    this.basketService.basketCountPlus(this.product());
  }
}
