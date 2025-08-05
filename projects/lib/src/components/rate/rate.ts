import {Component, computed, input, OnInit} from '@angular/core';
import {Icons} from '../icons/icons';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'nr-rate',
  imports: [
    Icons,
    NgForOf,
    NgIf
  ],
  templateUrl: './rate.html',
  standalone: true,
  styleUrl: './rate.sass'
})
export class Rate {
  rate = input<number>(0);
  integer = computed(() => Math.trunc(this.rate()));
  fractional = computed(() => Math.ceil(this.rate() - this.integer()));

  get intArr() {
    return Array.from({ length: this.integer() }, (_, i) => i);
  }
  get remainderArr() {
    return Array.from({ length: 5 - this.integer() - Math.ceil(this.fractional()) }, (_, i) => i);
  }
}
