import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Rate} from '../../../../components/rate/rate';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: 'rg-product-add',
  templateUrl: './product-add.component.html',
  standalone: true,
  styleUrl: './product-add.component.sass',
  imports: [
    ReactiveFormsModule,
    NgIf,
    Rate
  ]
})
export class ProductAddComponent {
    type: string = '';
    form!: FormGroup;
    constructor(private route: ActivatedRoute,
                private fb: FormBuilder,
                private router: Router,
                private productsService: ProductsService) {
        this.type = route.snapshot.data['type'] || 'all';
        this.form = this.fb.group({
          title: [''],
          cover: [''],
          author: [''],
          price: [0],
          rate: [0, [Validators.min(0), Validators.max(5)]],
          description: ['']
        });
    }



  onSubmit() {
    if (this.form.valid) {
      const res = {
        ...this.form.value,
        category: this.type === 'all' ? [] : this.type
      }
      this.productsService.add(res).subscribe(() => this.router.navigate(['/']),);
    }
  }
}
