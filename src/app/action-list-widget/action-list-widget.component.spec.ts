import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionListWidgetComponent } from './action-list-widget.component';

describe('ActionListWidgetComponent', () => {
  let component: ActionListWidgetComponent;
  let fixture: ComponentFixture<ActionListWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionListWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionListWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
