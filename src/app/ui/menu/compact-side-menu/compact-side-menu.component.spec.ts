import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompactSideMenuComponent } from './compact-side-menu.component';

describe('CompactSideMenuComponent', () => {
  let component: CompactSideMenuComponent;
  let fixture: ComponentFixture<CompactSideMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompactSideMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompactSideMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
