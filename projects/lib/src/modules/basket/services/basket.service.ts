import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class BasketService {

    private basket$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor() {}

    basketCountPlus(product: any) {
        let _product = this.basket$.value.find(item => item.id === product.id) || product;
        let count: number = _product?.count || 0;
        _product.count = ++count;
        this.basket = _product;
    }
    basketCountMinus(product: any) {
        let _product = this.basket$.value.find(item => item.id === product.id) || product;
        let count: number = _product?.count || 0;
        _product.count = --count;
        this.basket = _product;
    }
    setBasketCount(product: any, value: number) {
        const _product = this.basket$.value.find(item => item.id === product.id) || product;
        _product.count = value;
        this.basket = _product;
    }

    get basket() {
        return this.basket$;
    }

    set basket(value: any) {
        const basket = this.basket$.value;
        const hasBasket = !!basket.length;
        if (!hasBasket) {
            this.basket$.next([value]);
        } else {
            const newBasket = basket.find(item => item.id === value.id);
            if (!newBasket) {
                this.basket$.next([value, ...basket]);
            } else {
                this.basket$.next(
                    basket.map((val: any) => val.id === value.id ? value : val)
                );
            }
        }
    }

    removeBasket(value: string) {
        this.basket.next(this.basket$.value.filter(item => item.id !== value));
    }
}
