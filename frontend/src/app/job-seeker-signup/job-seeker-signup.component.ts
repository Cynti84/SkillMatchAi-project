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
    if (!this.cvFile) {
      alert('Please upload your CV to extract skills.');
      return;
    }

    // First, upload CV and extract skills
    this.profileService.uploadCV(this.cvFile).subscribe({
      next: (cvRes) => {
        console.log('CV uploaded and skills extracted:', cvRes.skills);

        // Proceed to create profile after CV upload
        const formData = new FormData();
        formData.append('phone', this.phone);
        formData.append('location', this.location);
        formData.append('desired_roles', this.jobRole);
        formData.append('skills', this.skills); // optional - still keep it
        if (this.cvFile) formData.append('cv', this.cvFile.name);
        if (this.profilePhoto)
          formData.append('profile_photo_url', this.profilePhoto.name);

        this.profileService.createJobSeekerProfile(formData).subscribe({
          next: () => {
            alert('Profile created and skills extracted successfully!');
            this.router.navigate(['/job-seeker-dashboard']);
          },
          error: (err) => {
            console.error('Profile creation failed:', err);
            alert('Failed to submit profile.');
          },
        });
      },
      error: (err) => {
        console.error('CV upload failed:', err);
        alert('CV upload failed. Please try again.');
      },
    });
  }
}
