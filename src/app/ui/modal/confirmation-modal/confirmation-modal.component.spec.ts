import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NbCardModule, NbDialogRef } from '@nebular/theme';

import { ActionBtnConfig, ConfirmationModalComponent } from './confirmation-modal.component';

const defaultInputs = {
  title: 'modalTitle',
  content: 'modalContent',
  action: {
    buttonType: 'danger',
    buttonText: 'remove',
    preventAction: true,
  },
};

const projectedValues = {
  title: 'projectedModalTitle',
  content: 'projectedModalContent',
  action: {
    buttonType: 'danger',
    buttonText: 'projectedActionBtnText',
    preventAction: true,
  },
};

@Component({
  selector: 'aums-digital-host',
  template: `
    <aums-digital-confirmation-modal [title]="title" [content]="content" [action]="action">
      <ng-container *ngIf="hasProjectedTitle" [aumsDigitalConfirmationModalTitle]="projectedValues.title"></ng-container>
      <ng-container *ngIf="hasProjectedContent" [aumsDigitalConfirmationModalContent]="projectedValues.content"></ng-container>
      <ng-container
        *ngIf="hasProjectedActionBtn"
        aumsDigitalConfirmationModalActionBtn
        [buttonText]="projectedValues.action.buttonText"
        [buttonType]="projectedValues.action.buttonType"
        [preventAction]="projectedValues.action.preventAction"
      ></ng-container>
    </aums-digital-confirmation-modal>
  `,
})
class HostComponent {
  @Input() title = defaultInputs.title;
  @Input() content = defaultInputs.content;
  @Input() action: ActionBtnConfig = defaultInputs.action;
  @Input() contextRef: NbDialogRef<ConfirmationModalComponent>;
  @Input() hasProjectedTitle = false;
  @Input() hasProjectedContent = false;
  @Input() hasProjectedActionBtn = false;

  projectedValues = projectedValues;
}

describe('ConfirmationModalComponent', () => {
  const cancelBtnSelector = 'nb-card-footer button:nth-child(1)';
  const actionBtnSelector = 'nb-card-footer button:nth-child(2)';
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;
  let nbDialogRefSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HostComponent, ConfirmationModalComponent],
      imports: [NbCardModule],
      providers: [
        {
          provide: NbDialogRef,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    nbDialogRefSpy = TestBed.get(NbDialogRef);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });
});
