import {Component, computed, input, InputSignal} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {Icons} from '../icons/icons';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'nr-menu',
  imports: [
    NgIf,
    Icons,
    RouterLink,
    NgForOf,
    RouterLinkActive
  ],
  templateUrl: './menu.html',
  standalone: true,
  styleUrl: './menu.sass'
})
export class Menu {
  menu: InputSignal<any[]> = input<any[]>([]);
  menuLength = computed(() => this.menu().length);
}
