import {Component, EventEmitter, Input, Output} from '@angular/core';
import {InputStep} from '../../../../components/input-step/input-step';

@Component({
  selector: 'nr-basket-card',
  templateUrl: './basket-card.component.html',
  styleUrl: './basket-card.component.sass',
  imports: [
    InputStep
  ],
  standalone: true
})
export class BasketCardComponent {
  @Input('data') basket: any = {};

  @Output() del: EventEmitter<any> = new EventEmitter();
  @Output() countChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  remove(id: string) {
    this.del.emit(id);
  }

  inputStepChanged(value: number) {
    this.countChange.emit(value);
  }
}
