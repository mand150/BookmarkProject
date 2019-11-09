import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmissionResultPageComponent } from './submission-result-page.component';

describe('SubmissionResultPageComponent', () => {
  let component: SubmissionResultPageComponent;
  let fixture: ComponentFixture<SubmissionResultPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmissionResultPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmissionResultPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
