import {Directive, EventEmitter, ElementRef, HostListener} from '@angular/core';
import 'rxjs/add/operator/map';


@Directive({
  selector: '[draggable]'
})
export class DraggableDirective {
  mousedrag;
  mouseup   = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();

  @HostListener('mouseup', ['$event'])
  onMouseup(event) { this.mouseup.next(event); }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) { this.mousedown.next(event); }

  @HostListener('mousemove', ['$event'])
  onMousemove(event) { this.mousemove.next(event); }

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.cursor = 'pointer';

    

    this.mousedrag = this.mousedown.asObservable().map(event => {
        (<MouseEvent>event).preventDefault();
        return {
          left: (<MouseEvent>event).clientX - this.element.nativeElement.getBoundingClientRect().left,
          top:  (<MouseEvent>event).clientY - this.element.nativeElement.getBoundingClientRect().top
        };
      }).subscribe(imageOffset => this.mousemove.asObservable().map(event => ({
        top:  (<MouseEvent>event).clientY - imageOffset.top,
        left: (<MouseEvent>event).clientX - imageOffset.left
      })).subscribe(this.mouseup));

  }


  onInit() {
    this.mousedrag.subscribe({
      next: pos => {
        // Update position
        this.element.nativeElement.style.top  = pos.top  + 'px';
        this.element.nativeElement.style.left = pos.left + 'px';
      }
    });
  }

}