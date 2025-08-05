import {Component, input, InputSignal, OnInit} from '@angular/core';

@Component({
  selector: 'nr-icons',
  imports: [],
  templateUrl: './icons.html',
  standalone: true,
  styleUrl: './icons.sass'
})
export class Icons {
  name: InputSignal<string> = input<string>('');
}
