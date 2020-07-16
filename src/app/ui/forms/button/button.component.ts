import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type StyleElementTypes = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'link';
type SizeElementTypes = 'lg' | 'md' | 'sm' | 'xs';
type ElementTypes = 'button' | 'link' | 'submit';
type TypeElementTypes = 'outline' | 'text';

@Component({
  selector: 'coin-market-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() linkUrl: string;
  @Input() type: ElementTypes = 'button';
  @Input() styleElement: StyleElementTypes = 'primary';
  @Input() sizeElement: SizeElementTypes;
  @Input() typeElement: TypeElementTypes;
  @Input() disabled: boolean;
  @Input() loader: boolean;
  @Input() fullWidth: boolean;

  @Output() clickEvent: EventEmitter<void> = new EventEmitter();

  ngOnInit(): void {
    if (this.type === 'link' && !this.linkUrl) {
      throw new Error('Wrong parameters for link type button! Link type button require param: linkUrl');
    }
  }

  getElementClasses(): string {
    const elementDefaultClass = this.getDefaultElementClass();

    if (this.styleElement) {
      return `${elementDefaultClass} ${this.getStyleElementClass()} ${this.getSizeElementClass()}`;
    } else {
      return elementDefaultClass;
    }
  }

  onButtonClick(): void {
    this.clickEvent.emit();
  }

  private getDefaultElementClass(): string {
    const elementDefaultClass = ['btn'];

    if (this.fullWidth) {
      elementDefaultClass.push('btn-block');
    }

    return elementDefaultClass.join(' ');
  }

  private getStyleElementClass(): string {
    const newStyleElement = ['btn'];

    switch (this.typeElement) {
      case 'outline':
        newStyleElement.push('outline');
        break;
      case 'text':
        newStyleElement.push('text');
        break;
    }

    newStyleElement.push(this.styleElement);

    return newStyleElement.join('-');
  }

  private getSizeElementClass(): string {
    return this.sizeElement ? `btn-${this.sizeElement}` : '';
  }
}
