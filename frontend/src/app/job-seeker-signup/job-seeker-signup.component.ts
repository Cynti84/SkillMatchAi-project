import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
@Component({
  selector: 'app-job-seeker-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './job-seeker-signup.component.html',
  styleUrl: './job-seeker-signup.component.scss',
})
export class JobSeekerSignupComponent {
  phone = '';
  location = '';
  jobRole = '';
  skills = '';
  cvFile: File | null = null;
  profilePhoto: File | null = null;

  constructor(private router: Router, private profileService: ProfileService) {}

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.cvFile = file;
  }

  onPhotoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.profilePhoto = file;
  }

  onSubmit(): void {
    const formData = new FormData();
    formData.append('phone', this.phone);
    formData.append('location', this.location);
    formData.append('desired_roles', this.jobRole);
    formData.append('skills', this.skills);
    if (this.cvFile) formData.append('resume_url', this.cvFile);
    if (this.profilePhoto)
      formData.append('profile_photo_url', this.profilePhoto);

    console.log('Using token:', this.profileService['auth'].getToken());

    this.profileService.createJobSeekerProfile(formData).subscribe({
      next: (res) => {
        alert('Profile created!');
        this.router.navigate(['/job-seeker-dashboard']);
      },
      error: (err) => {
        console.error(err);
        alert('Failed to submit profile.');
      },
    });
  }
}
