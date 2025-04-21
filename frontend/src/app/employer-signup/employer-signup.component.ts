import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-employer-signup',
  imports: [FormsModule, CommonModule],
  standalone: true,
  templateUrl: './employer-signup.component.html',
  styleUrl: './employer-signup.component.scss',
})
export class EmployerSignupComponent {
  companyName = '';
  website = '';
  selectedIndustry: string = ''; // ✅ changed from string[] to string
  description = '';
  workEmail = '';
  phoneNumber = '';
  logo: File | null = null;

  industryOptions = [
    'Technology',
    'Finance',
    'Healthcare',
    'Education',
    'Retail',
    'Manufacturing',
    'Real Estate',
    'Transportation',
  ];

  constructor(private router: Router, private profileService: ProfileService) {}

  onLogoSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] || null;
    this.logo = file;
  }

  onSubmit(): void {
    
    const formData = new FormData();
    formData.append('company_name', this.companyName);
    formData.append('website', this.website);
    formData.append('industry', this.selectedIndustry);
    formData.append('description', this.description);
    formData.append('work_email', this.workEmail);
    formData.append('phone_number', this.phoneNumber);
    if (this.logo) {
      formData.append('logo', this.logo);
    }
    console.log('Using token:', this.profileService['auth'].getToken());
    

    this.profileService.createEmployerProfile(formData).subscribe({
      next: (res) => {
        alert('Profile created!');
        this.router.navigate(['/employer-dashboard']);
      },
      error: (err) => {
        console.error('Failed to create employer profile:', err);
        alert('Failed to submit profile.');
      },
    });
  }
}
