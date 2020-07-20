import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

export type ModalSize = 'lg' | 'md' | 'sm' | 'auto';

@Component({
  selector: 'coin-market-modal-card',
  templateUrl: './modal-card.component.html',
  styleUrls: ['./modal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalCardComponent {
  @Input() modalTitle: string;
  @Input() modalSize: ModalSize = 'md';
  @Input() loading: boolean;
  @Input() loadingMessage: string;
  @Input() hideFooter = false;
  @Input() hideCancel = false;
  @Output() cancel: EventEmitter<void> = new EventEmitter<void>();

  onCancel(): void {
    this.cancel.next();
  }
}
