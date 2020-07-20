import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCardFooterComponent } from './modal-card-footer.component';

describe('ModalCardFooterComponent', () => {
  let component: ModalCardFooterComponent;
  let fixture: ComponentFixture<ModalCardFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCardFooterComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCardFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
