import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'rg-products',
  standalone: true,
  templateUrl: './products.component.html',
  styleUrl: './products.component.sass',
  imports: [
    RouterOutlet
  ]
})
export class ProductsComponent {
}
