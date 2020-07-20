import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'coin-market-modal-card-body',
  template: ` <ng-content></ng-content> `,
  styleUrls: ['./modal-card-body.component.scss'],
})
export class ModalCardBodyComponent {
  @Input()
  @HostBinding('style.minHeight.px')
  minHeight: number;
}
