import {Directive, EventEmitter, ElementRef, HostListener, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
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

    this.mousedown.map(event => {
      // return image offset value
      return {
        top : (<MouseEvent>event).clientY - this.element.nativeElement.getBoundingClientRect().top,
        left : (<MouseEvent>event).clientX - this.element.nativeElement.getBoundingClientRect().left
      }
    }).flatMap(imageOffset => {
      this.mousemove.map(pos => ({
        top: (<MouseEvent>pos).clientY - imageOffset.top,
        left: (<MouseEvent>pos).clientX - imageOffset.left
      })).takeUntil(this.mouseup);
    })

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


  ngOnInit() {
    this.mousedrag.subscribe({
      next: pos => {
        // Update position
        this.element.nativeElement.style.top  = pos.top  + 'px';
        this.element.nativeElement.style.left = pos.left + 'px';
      }
    });
  }

}