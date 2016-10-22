import { Component, Input, OnInit } from '@angular/core';
import {Product} from './product';
import { DraggableDirective } from './../draggable.directive';


@Component({
  selector: 'product-component',
  template: `
    <div class="col-sm-2 col-height" draggable>
        <div class="thumbnail">
        <img class="img-responsive" src="{{computedUrl}}" 
        alt="{{product.ident}}">
        <div class="caption">
            <h5 class="name">{{product.name | strtrunc : 45}}</h5>
            <p *ngIf="product.designer" class="designer">{{product.designer | strtrunc : 14}}</p>
        </div>
        </div>
    </div>
  `,
  styles: [`
    .col-height {
        height: 200px;
    }
    .thumbnail {
        height: 190px;
    }
    img {
        height: 100px;
        width: 100px;
    }
    .name {
        font-size : 0.8em;
    }
    .designer {
        font-size : 0.65em;
        color: grey;
    }
  `],
  providers: [DraggableDirective]
})
export class ProductComponent implements OnInit{ 
    @Input('data') product : Product;
    private computedUrl : string;

    constructor() {}

    ngOnInit() {
        this.computedUrl = this.computeUrl(this.product);
    }

    computeUrl(p : any): string {
        let _url = '';

        _url = "https:\/\/styletribute.com"+p.smallImage;
        return _url;
    }
    
}