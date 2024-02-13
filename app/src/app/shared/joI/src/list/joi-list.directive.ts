import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[joiList]'
})
export class JoiListDirective {

  constructor(private el: ElementRef) {
   }

}
