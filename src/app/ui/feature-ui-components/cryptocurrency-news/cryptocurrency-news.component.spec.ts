import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CryptocurrencyNewsComponent } from './cryptocurrency-news.component';

describe('CryptocurrencyNewsComponent', () => {
  let component: CryptocurrencyNewsComponent;
  let fixture: ComponentFixture<CryptocurrencyNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CryptocurrencyNewsComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CryptocurrencyNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
