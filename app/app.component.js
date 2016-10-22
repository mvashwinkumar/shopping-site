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
var product_service_1 = require('./product/product.service');
var AppComponent = (function () {
    function AppComponent(productService) {
        this.productService = productService;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.productService.getProductsExt().subscribe(function (products) { return _this.products = products; }, function (err) { return _this.errorMessage = err; });
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n    <h1>Shopping Application</h1>\n    <div class=\"container-fluid\">\n        <div class=\"row\">\n            <div class=\"row-height\">\n                <product-component *ngFor=\"let p of products\" [data]=\"p\"></product-component>\n            </div>\n        </div>        \n    </div>\n  ",
            styles: ["\n    \n  "],
            providers: [product_service_1.ProductService]
        }), 
        __metadata('design:paramtypes', [product_service_1.ProductService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map