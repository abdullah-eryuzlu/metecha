import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelativeSuccessMessageComponent } from './relative-success-message.component';

describe('RelativeSuccessMessageComponent', () => {
  let component: RelativeSuccessMessageComponent;
  let fixture: ComponentFixture<RelativeSuccessMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelativeSuccessMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelativeSuccessMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
