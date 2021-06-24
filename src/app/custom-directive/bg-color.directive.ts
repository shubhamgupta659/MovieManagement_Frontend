import { Directive, ElementRef, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appBgColor]'
})
export class BgColorDirective implements OnInit {

  @HostBinding('style.backgroundColor') color;

  @HostListener('mouseenter') OnMouseEnter(){
    this.color = "rgb(5, 78, 135)";
  }

  @HostListener('mouseleave') OnMouseLeave(){
    this.color = "rgb(33, 150, 243)";
  }

  constructor(public elementRef: ElementRef) { }

  ngOnInit(){
    this.color = "rgb(33, 150, 243)";
    //this.elementRef.nativeElement.style.backgroundColor = "yellow";
  }



}
