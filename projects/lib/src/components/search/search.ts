import {Component, effect, output, signal} from '@angular/core';
import {Icons} from '../icons/icons';

@Component({
  selector: 'nr-search',
  imports: [
    Icons
  ],
  templateUrl: './search.html',
  standalone: true,
  styleUrl: './search.sass'
})
export class Search {
  // локальный signal для поля ввода
  keyword = signal('');

  // output сигнал — родитель может подписаться
  readonly keywordChange = output<string>();

  // debounce вручную (не RxJS)
  private lastTimeout: ReturnType<typeof setTimeout> | null = null;
  private readonly debounceMs = 300;

  constructor() {
    effect(() => {
      const val = this.keyword();
      if (this.lastTimeout) clearTimeout(this.lastTimeout);
      this.lastTimeout = setTimeout(() => {
        this.keywordChange.emit(val);
      }, this.debounceMs);
    });
  }

  updateKeyword(value: string) {
    this.keyword.set(value);
  }

  searchNow() {
    this.keywordChange.emit(this.keyword());
  }
}
