import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Icons} from '../icons/icons';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'nr-input-step',
  imports: [
    Icons,
    FormsModule
  ],
  templateUrl: './input-step.html',
  standalone: true,
  styleUrl: './input-step.sass'
})
export class InputStep {
  @Input() value: number = 1;
  @Output() changed: EventEmitter<any> = new EventEmitter();

  plus() {
    if (this.value < 99999) {
      this.value++;
    }
    this.changed.emit(this.value);
  }

  minus() {
    if (this.value > 1) {
      this.value--;
    }
    this.changed.emit(this.value);
  }

  onChanged(value: number) {
    this.value = +value;
    this.changed.emit(this.value);
  }
}
