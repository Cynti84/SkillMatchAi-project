import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupStartComponent } from './signup-start.component';

describe('SignupStartComponent', () => {
  let component: SignupStartComponent;
  let fixture: ComponentFixture<SignupStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignupStartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
