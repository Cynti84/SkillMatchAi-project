import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-job-seeker-signup',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './job-seeker-signup.component.html',
  styleUrl: './job-seeker-signup.component.scss',
})
export class JobSeekerSignupComponent {
  phone: string = '';
  location: string = '';
  jobRole: string = '';
  skills: string = '';
  cvFile: File | null = null;
  profilePhoto: File | null = null;

  constructor(private router: Router) {}

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.cvFile = target.files[0];
    }
  }

  onPhotoSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      this.profilePhoto = target.files[0];
    }
  }

  onSubmit(): void {
    //simulate form processing
    const jobSeekerData = {
      phone: this.phone,
      location: this.location,
      jobRole: this.jobRole,
      skills: this.skills,
      cvFile: this.cvFile,
      profilePhoto: this.profilePhoto,
    };
    console.log('Employer Data:', jobSeekerData);

    //redirect to dashboard
    this.router.navigate(['/job-seeker-dashboard']);
  }
}
