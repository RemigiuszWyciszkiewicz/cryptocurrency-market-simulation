import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTransactionModalComponent } from './coin-transaction-modal.component';

describe('CoinTransactionModalComponent', () => {
  let component: CoinTransactionModalComponent;
  let fixture: ComponentFixture<CoinTransactionModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinTransactionModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinTransactionModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
