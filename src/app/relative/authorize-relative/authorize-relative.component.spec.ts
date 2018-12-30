import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorizeRelativeComponent } from './authorize-relative.component';

describe('AuthorizeRelativeComponent', () => {
  let component: AuthorizeRelativeComponent;
  let fixture: ComponentFixture<AuthorizeRelativeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthorizeRelativeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthorizeRelativeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
