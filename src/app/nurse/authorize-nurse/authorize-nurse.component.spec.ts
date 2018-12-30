import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeNurseComponent } from './authorize-nurse.component';

describe('AuthorizeNurseComponent', () => {
  let component: AuthorizeNurseComponent;
  let fixture: ComponentFixture<AuthorizeNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
