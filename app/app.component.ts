import { Component, OnInit } from '@angular/core';
import {Product} from './product/product';
import {ProductService} from './product/product.service';

@Component({
  selector: 'my-app',
  template: `
    <h1>Shopping Application</h1>
    <div class="container-fluid">
        <div class="row">
            <div class="row-height">
                <product-component *ngFor="let p of products" [data]="p"></product-component>
            </div>
        </div>        
    </div>
  `,
  styles: [`
    
  `],
  providers: [ProductService]
})
export class AppComponent implements OnInit{
    products : Product[];
    errorMessage : string;

    constructor(private productService : ProductService) {}

    ngOnInit() {
        this.productService.getProductsExt().subscribe(
            products => this.products = products,
            err => this.errorMessage = err
        );
    }
}