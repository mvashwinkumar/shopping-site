import { Component, OnInit, ElementRef, HostListener, EventEmitter } from '@angular/core';
import {Product} from './product/product';
import {ProductService} from './product/product.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';

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
    scroll = new EventEmitter();
    pageNum : number;
    scrollEnd;
    observer;

    @HostListener('window:scroll', ['$event'])
    onScroll(event) {
        this.scroll.emit(event);
    }

    constructor(private productService : ProductService, private _el : ElementRef) {
        this.pageNum = 1;
        this.scrollEnd = this.scroll.map(event => {
            console.log(window.innerHeight - document.body.scrollTop);
            return {
                documentScroll : document.body.scrollTop,
                windowScroll : window.innerHeight
            };
        })
        .filter(o => o.windowScroll - o.documentScroll < 300);
    }

    ngOnInit() {
        this.productService.getProductsExt().subscribe(
            (products) => {
                this.products = products;
                this.pageNum++;
            },
            err => this.errorMessage = err
        );

        this.observer = (e => {
            this.productService.getProductsExt(this.pageNum).subscribe(
                (products) => {
                    this.products.push(...products);
                    this.pageNum++;
                    this.scrollEnd.subscribe(this.observer);
                },
                err => this.errorMessage = err
            );
        });

        this.scrollEnd.subscribe(this.observer);
    
    }
    
}