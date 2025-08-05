import { Component } from '@angular/core';
import {Icons} from '../../public-api';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'nr-logo',
  imports: [
    Icons,
    RouterLink
  ],
  templateUrl: './logo.html',
  standalone: true,
  styleUrl: './logo.sass'
})
export class Logo {

}
