import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {Icons} from '../../../../components/icons/icons';

@Component({
  selector: 'rg-product-card-add',
  standalone: true,
  templateUrl: './product-card-add.component.html',
  styleUrl: './product-card-add.component.sass',
  imports: [
    RouterLink,
    Icons
  ]
})
export class ProductCardAddComponent {
}
