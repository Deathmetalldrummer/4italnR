import { Component, EventEmitter, Input, Output } from '@angular/core';
import {Icons} from '../../../../components/icons/icons';
import {Rate} from '../../../../components/rate/rate';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'rg-product-card',
  templateUrl: './product-card.component.html',
  standalone: true,
  styleUrl: './product-card.component.sass',
  imports: [
    Icons,
    Rate,
    RouterLink
  ]
})
export class ProductCardComponent {
    @Input() product: any = {};
    @Output() actionClick: EventEmitter<any> = new EventEmitter<any>();

    constructor() {}

    addToCart() {
        this.actionClick.emit(this.product);
    }
}
