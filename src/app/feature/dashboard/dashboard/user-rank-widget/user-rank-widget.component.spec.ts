import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRankWidgetComponent } from './user-rank-widget.component';

describe('UserRankWidgetComponent', () => {
  let component: UserRankWidgetComponent;
  let fixture: ComponentFixture<UserRankWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRankWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRankWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
