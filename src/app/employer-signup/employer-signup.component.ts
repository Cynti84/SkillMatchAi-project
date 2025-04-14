import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employer-signup',
  imports: [FormsModule],
  standalone: true,
  templateUrl: './employer-signup.component.html',
  styleUrl: './employer-signup.component.scss',
})
export class EmployerSignupComponent {
  companyName = '';
  website = '';
  selectedIndustry: string[] = [];
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

  constructor(private router: Router) {}

  onLogoSelected(event: any): void {
    this.logo = event.target.files[0];
  }

  onSubmit(): void {
    const employerData = {
      companyName: this.companyName,
      website: this.website,
      industry: this.selectedIndustry,
      description: this.description,
      logo: this.logo,
      workEmail: this.workEmail,
      phoneNumber: this.phoneNumber,
    };

    console.log('Employer Data:', employerData);
    this.router.navigate(['/employer-dashboard']); // Use actual route later
  }
}
