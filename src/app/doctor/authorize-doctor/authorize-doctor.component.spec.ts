import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeDoctorComponent } from './authorize-doctor.component';

describe('AuthorizeDoctorComponent', () => {
  let component: AuthorizeDoctorComponent;
  let fixture: ComponentFixture<AuthorizeDoctorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeDoctorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
