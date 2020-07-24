import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyDetailsChartComponent } from './cryptocurrency-details-chart.component';

describe('CryptocurrencyDetailsChartComponent', () => {
  let component: CryptocurrencyDetailsChartComponent;
  let fixture: ComponentFixture<CryptocurrencyDetailsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencyDetailsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyDetailsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
