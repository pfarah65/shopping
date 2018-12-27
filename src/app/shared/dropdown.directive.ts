import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})

export class DropdownDirective {
  constructor(private eRef: ElementRef){}
  @HostBinding('class.open') isOpen = false;
  // @HostListener('click') toggleOpen(){
  //   //this.isOpen = !this.isOpen;
  // }
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (this.eRef.nativeElement.contains(event.target)) {
      this.isOpen = !this.isOpen;
    } else {
      this.isOpen = false;
    }
  }
}
