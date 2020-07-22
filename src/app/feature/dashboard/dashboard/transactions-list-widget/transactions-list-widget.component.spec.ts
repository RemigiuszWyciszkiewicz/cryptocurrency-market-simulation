import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsListWidgetComponent } from './transactions-list-widget.component';

describe('TransactionsListWidgetComponent', () => {
  let component: TransactionsListWidgetComponent;
  let fixture: ComponentFixture<TransactionsListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TransactionsListWidgetComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionsListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
