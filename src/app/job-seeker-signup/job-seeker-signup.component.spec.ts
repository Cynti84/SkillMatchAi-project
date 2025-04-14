import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobSeekerSignupComponent } from './job-seeker-signup.component';

describe('JobSeekerSignupComponent', () => {
  let component: JobSeekerSignupComponent;
  let fixture: ComponentFixture<JobSeekerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobSeekerSignupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobSeekerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
