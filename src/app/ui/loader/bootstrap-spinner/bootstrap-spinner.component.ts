import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerType = 'border' | 'grow';
export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

@Component({
  selector: 'coin-market-spinner',
  templateUrl: './bootstrap-spinner.component.html',
  styleUrls: ['./bootstrap-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent {
  @Input() message: string;
  @Input() status: string;
  @Input() size: SpinnerSize = 'md';
  @Input() type: SpinnerType = 'border';
  @Input() color: SpinnerColor = 'primary';
  @Input() boxHeight: number;

  get getPreferedHeight(): object {
    return {
      height: this.boxHeight ? `${this.boxHeight}rem` : 'auto',
    };
  }
}
