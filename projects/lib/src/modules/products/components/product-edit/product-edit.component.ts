import {Component, signal} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {map, switchMap} from 'rxjs';
import {ProductsService} from '../../services/products.service';
import {NgIf} from '@angular/common';
import {Rate} from '../../../../components/rate/rate';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';

@Component({
  selector: 'nr-product-edit',
  imports: [
    NgIf,
    Rate,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './product-edit.component.html',
  standalone: true,
  styleUrl: './product-edit.component.sass'
})
export class ProductEditComponent {
  type: string = '';
  form!: FormGroup;
  product = signal<any>({});
  constructor(private router: Router,
              private route: ActivatedRoute,
              private fb: FormBuilder,
              private productsService: ProductsService) {
    this.type = route.snapshot.data['type'] || 'all';
    this.route.params.pipe(
      map(params => params?.['id'] || ''),
      switchMap(id => this.productsService.getById(id))
    ).subscribe(product => {
      this.form = this.fb.group({
        title: [product.title],
        cover: [product.cover],
        author: [product.author],
        price: [product.price],
        rate: [product.rate, [Validators.min(0), Validators.max(5)]],
        description: [product.description]
      });
      this.product.set(product);
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const res = {
        ...this.product(),
        ...this.form.value,
      }
      this.productsService.update(res).subscribe(() => this.router.navigate(['/book/', this.product().id]),);
    }
  }
}
