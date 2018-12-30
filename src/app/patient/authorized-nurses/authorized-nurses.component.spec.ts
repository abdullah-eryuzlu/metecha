import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizedNursesComponent } from './authorized-nurses.component';

describe('AuthorizedNursesComponent', () => {
  let component: AuthorizedNursesComponent;
  let fixture: ComponentFixture<AuthorizedNursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizedNursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizedNursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
