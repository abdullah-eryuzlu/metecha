import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPatientSuccessMessageComponent } from './add-patient-success-message.component';

describe('AddPatientSuccessMessageComponent', () => {
  let component: AddPatientSuccessMessageComponent;
  let fixture: ComponentFixture<AddPatientSuccessMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPatientSuccessMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPatientSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
