import { Component, forwardRef, Input, Injector } from '@angular/core';
import { BaseControlValueAccessor } from '../utils/base-control-value-accessor';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
@Component({
  selector: 'coin-market-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent extends BaseControlValueAccessor<string> {
  @Input() type = 'text';
  @Input() min: number;
  @Input() max: number;
  @Input() step: number;

  constructor(injector: Injector) {
    super(injector);
  }

  onMouseUp(value: any): void {
    if (this.type === 'number' && value) {
      this.onChange(value);
    }
  }

  onKeyDown(event: any): boolean {
    return this.type === 'number' ? event.keyCode !== 69 : null;
  }
}
