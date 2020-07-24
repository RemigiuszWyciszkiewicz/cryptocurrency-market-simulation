import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyDetailsCurrentDataComponent } from './cryptocurrency-details-current-data.component';

describe('CryptocurrencyDetailsCurrentDataComponent', () => {
  let component: CryptocurrencyDetailsCurrentDataComponent;
  let fixture: ComponentFixture<CryptocurrencyDetailsCurrentDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencyDetailsCurrentDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyDetailsCurrentDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
