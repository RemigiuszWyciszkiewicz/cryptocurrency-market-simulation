import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyDetailsNewsComponent } from './cryptocurrency-details-news.component';

describe('CryptocurrencyDetailsNewsComponent', () => {
  let component: CryptocurrencyDetailsNewsComponent;
  let fixture: ComponentFixture<CryptocurrencyDetailsNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CryptocurrencyDetailsNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyDetailsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
