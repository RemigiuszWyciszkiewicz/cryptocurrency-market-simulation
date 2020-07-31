import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[coinMarketPercentageChangeTheme]',
})
export class PercentageChangeThemeDirective implements OnInit {
  @Input('coinMarketPercentageChangeTheme') value;

  constructor(readonly elementRef: ElementRef<any>, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, this.value < 0 ? 'value-profit-danger' : 'value-profit-success');
  }
}
