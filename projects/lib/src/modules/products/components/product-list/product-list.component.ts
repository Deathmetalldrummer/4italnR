import {Component, OnInit, signal} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BasketService, ProductsService, MenuAndRoute, IsAdminState} from '../../../../public-api';
import {ProductCardAddComponent} from '../product-card-add/product-card-add.component';
import {ProductCardComponent} from '../product-card/product-card.component';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'rg-product-list',
  standalone: true,
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.sass',
  imports: [
    ProductCardAddComponent,
    ProductCardComponent,
    NgIf,
    NgForOf,
  ]
})
export class ProductListComponent implements OnInit {
  isAdmin: boolean = false;
  products$ = signal<any[]>([]);
  type: string = '';
  layout: 'list' | 'grid' = 'grid';

  constructor(private productsService: ProductsService,
              private activatedRoute: ActivatedRoute,
              private menuAndRoute: MenuAndRoute,
              private isAdminState: IsAdminState,
              private basket: BasketService) {
  }


  ngOnInit() {
    this.isAdmin = this.isAdminState.isAdmin();
    this.type = this.activatedRoute.snapshot.data['type'];
    this.productsService.products.subscribe(products => {
      if (this.type === 'all') {
        this.products$.set(products);
      } else {
        const productsFiltered = products.filter((product: any) => {
          return product.category.includes(this.type);
        });
        this.products$.set(productsFiltered);
      }
    });

    this.activatedRoute.queryParams.subscribe((params) => {
      const search = params['search'];
      if (search) {
        const products = this.productsService.products.value.filter((product: any) => {
          const isAuthor = product.author.includes(search);
          const isTitle = product.title.includes(search);
          return isAuthor || isTitle;
        });
        this.products$.set(products);
      }
    })
  }

  addToCart($event: any) {
    this.basket.basketCountPlus($event);
  }
}
