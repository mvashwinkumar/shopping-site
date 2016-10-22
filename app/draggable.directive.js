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
require('rxjs/add/operator/map');
var DraggableDirective = (function () {
    function DraggableDirective(element) {
        var _this = this;
        this.element = element;
        this.mouseup = new core_1.EventEmitter();
        this.mousedown = new core_1.EventEmitter();
        this.mousemove = new core_1.EventEmitter();
        this.element.nativeElement.style.position = 'relative';
        this.element.nativeElement.style.cursor = 'pointer';
        this.mousedrag = this.mousedown.asObservable().map(function (event) {
            event.preventDefault();
            return {
                left: event.clientX - _this.element.nativeElement.getBoundingClientRect().left,
                top: event.clientY - _this.element.nativeElement.getBoundingClientRect().top
            };
        }).subscribe(function (imageOffset) { return _this.mousemove.asObservable().map(function (event) { return ({
            top: event.clientY - imageOffset.top,
            left: event.clientX - imageOffset.left
        }); }).subscribe(_this.mouseup); });
    }
    DraggableDirective.prototype.onMouseup = function (event) { this.mouseup.next(event); };
    DraggableDirective.prototype.onMousedown = function (event) { this.mousedown.next(event); };
    DraggableDirective.prototype.onMousemove = function (event) { this.mousemove.next(event); };
    DraggableDirective.prototype.onInit = function () {
        var _this = this;
        this.mousedrag.subscribe({
            next: function (pos) {
                // Update position
                _this.element.nativeElement.style.top = pos.top + 'px';
                _this.element.nativeElement.style.left = pos.left + 'px';
            }
        });
    };
    __decorate([
        core_1.HostListener('mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMouseup", null);
    __decorate([
        core_1.HostListener('mousedown', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMousedown", null);
    __decorate([
        core_1.HostListener('mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DraggableDirective.prototype, "onMousemove", null);
    DraggableDirective = __decorate([
        core_1.Directive({
            selector: '[draggable]'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DraggableDirective);
    return DraggableDirective;
}());
exports.DraggableDirective = DraggableDirective;
//# sourceMappingURL=draggable.directive.js.map