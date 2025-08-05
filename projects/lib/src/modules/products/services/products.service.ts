import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, map, tap} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    products$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

    constructor(private http: HttpClient, @Inject('environment') private environment: any) {
        this.http.get(environment.products)
            .subscribe(res => {
                const _res = JSON.parse(JSON.stringify(res));
                this.products$.next(_res);
            });
    }

    get products() {
        return this.products$;
    }

    getById(id: string) {
        return this.products$.pipe(map(products => {
            return products.find(product => product.id === +id);
        }));
    }

    getByIds(id: string[]) {
        return this.products$.pipe(map(products => {
            return products.filter(product => id.indexOf(product.id) > -1);
        }));
    }

    add(product: any) {
      return this.http.post(this.environment.products, product)
        .pipe(
          tap(value => {
            const products = this.products$.value;
            const val = {...value, id: products.length + 1};
            this.products$.next([val, ...products]);
          })
        )
    }
    update(product: any) {
      return this.http.put(this.environment.products, product)
        .pipe(
          tap((value: any) => {
            let products = this.products$.value;
            products = products.map((item) => item.id === value.id ? value : item)
            this.products$.next(products);
          })
        )
    }
    delete(id: string) {
      return this.http.delete(this.environment.products, {body: id})
    }
}
