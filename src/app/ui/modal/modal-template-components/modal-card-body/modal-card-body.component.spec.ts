import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCardBodyComponent } from './modal-card-body.component';

describe('ModalCardBodyComponent', () => {
  let component: ModalCardBodyComponent;
  let fixture: ComponentFixture<ModalCardBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCardBodyComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
