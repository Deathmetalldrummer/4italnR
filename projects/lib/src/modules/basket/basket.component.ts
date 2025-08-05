import {Component} from '@angular/core';
import {BasketListComponent} from './components/basket-list/basket-list.component';

@Component({
  selector: 'nr-basket',
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.sass',
  standalone: true,
  imports: [
    BasketListComponent
  ]
})
export class BasketComponent {
}
