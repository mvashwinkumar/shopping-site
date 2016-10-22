"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var product_1 = require('./product');
var draggable_directive_1 = require('./../draggable.directive');
var ProductComponent = (function () {
    function ProductComponent() {
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.computedUrl = this.computeUrl(this.product);
    };
    ProductComponent.prototype.computeUrl = function (p) {
        var _url = '';
        _url = "https:\/\/styletribute.com" + p.smallImage;
        return _url;
    };
    __decorate([
        core_1.Input('data'), 
        __metadata('design:type', product_1.Product)
    ], ProductComponent.prototype, "product", void 0);
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'product-component',
            template: "\n    <div class=\"col-sm-2 col-height\" draggable>\n        <div class=\"thumbnail\">\n        <img class=\"img-responsive\" src=\"{{computedUrl}}\" \n        alt=\"{{product.ident}}\">\n        <div class=\"caption\">\n            <h5 class=\"name\">{{product.name | strtrunc : 45}}</h5>\n            <p *ngIf=\"product.designer\" class=\"designer\">{{product.designer | strtrunc : 14}}</p>\n        </div>\n        </div>\n    </div>\n  ",
            styles: ["\n    .col-height {\n        height: 200px;\n    }\n    .thumbnail {\n        height: 190px;\n    }\n    img {\n        height: 100px;\n        width: 100px;\n    }\n    .name {\n        font-size : 0.8em;\n    }\n    .designer {\n        font-size : 0.65em;\n        color: grey;\n    }\n  "],
            providers: [draggable_directive_1.DraggableDirective]
        }), 
        __metadata('design:paramtypes', [])
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map