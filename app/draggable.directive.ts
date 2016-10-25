import {Directive, EventEmitter, ElementRef, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/RX';

@Directive({
  selector: '[draggable]'
})
export class DraggableDirective implements OnInit{
  mousedrag;
  mouseup   = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();

  @HostListener('document:mouseup', ['$event'])
  onMouseup(event) { 
    this.mouseup.emit(event); 
  }

  @HostListener('mousedown', ['$event'])
  onMousedown(event) {
    event.preventDefault();
    this.mousedown.emit(event); 
  }

  @HostListener('document:mousemove', ['$event'])
  onMousemove(event) { 
    this.mousemove.next(event); 
  }

  constructor(private element: ElementRef) {
    this.element.nativeElement.style.position = 'relative';
    this.element.nativeElement.style.cursor = 'pointer';

    this.mousedrag = this.mousedown.map(event => {
      // return image offset value
      let coords = this.element.nativeElement.getBoundingClientRect();
      return {
        top : coords.top,
        left : coords.left
      }
    }).flatMap(imageOffset => {
      return this.mousemove.map(pos => ({
        top: (<MouseEvent>pos).clientY - imageOffset.top,
        left: (<MouseEvent>pos).clientX - imageOffset.left
      })).takeUntil(this.mouseup);
    })

  }


  ngOnInit() {
    this.mousedrag.subscribe(pos => {
        // Update position
        this.element.nativeElement.style.top  = pos.top  + 'px';
        this.element.nativeElement.style.left = pos.left + 'px';
      }
    );
  }

}