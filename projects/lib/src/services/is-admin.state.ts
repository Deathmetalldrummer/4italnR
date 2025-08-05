import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IsAdminState {
  readonly isAdmin = signal<boolean>(false);

  setIsAdmin(value: boolean) {
    this.isAdmin.set(value);
  }
  reset() {
    this.isAdmin.set(false);
  }
}
