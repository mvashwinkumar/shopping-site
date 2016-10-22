import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ProductComponent } from './product/product.component';

import { StringTruncatePipe } from './stringtruncate.pipe';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  declarations: [AppComponent, ProductComponent, StringTruncatePipe, DraggableDirective],
  bootstrap: [AppComponent]
})
export class AppModule { }
