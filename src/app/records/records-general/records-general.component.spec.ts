import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordsGeneralComponent } from './records-general.component';

describe('RecordsGeneralComponent', () => {
  let component: RecordsGeneralComponent;
  let fixture: ComponentFixture<RecordsGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordsGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordsGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
