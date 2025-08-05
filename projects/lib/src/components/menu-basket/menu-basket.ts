import {Component, input} from '@angular/core';
import {NgIf, NgTemplateOutlet} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Icons} from '../icons/icons';

@Component({
  selector: 'nr-menu-basket',
  imports: [
    NgTemplateOutlet,
    NgIf,
    RouterLink,
    Icons
  ],
  templateUrl: './menu-basket.html',
  styleUrl: './menu-basket.sass',
  standalone: true
})
export class MenuBasket {
  count = input<number>(0);
}
