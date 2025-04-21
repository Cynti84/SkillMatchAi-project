import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-listings',
  imports: [CommonModule],
  templateUrl: './job-listings.component.html',
  styleUrls: ['./job-listings.component.scss'],
})
export class JobListingsComponent {
  jobs = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp Inc.',
      type: 'Full-time',
      setting: 'Remote',
      applicants: 42,
      views: 156,
      posted: 'Apr 2, 2025',
      expires: 'May 2, 2025',
      status: 'Active'
    },
    {
      title: 'UI/UX Designer',
      company: 'Designify',
      type: 'Part-time',
      setting: 'Hybrid',
      applicants: 12,
      views: 74,
      posted: 'Apr 5, 2025',
      expires: 'May 5, 2025',
      status: 'Closed'
    },
    {
      title: 'Backend Engineer',
      company: 'DataSystems',
      type: 'Contract',
      setting: 'On-site',
      applicants: 31,
      views: 120,
      posted: 'Apr 8, 2025',
      expires: 'May 8, 2025',
      status: 'Active'
    },
    {
      title: 'Product Manager',
      company: 'Innovatech',
      type: 'Full-time',
      setting: 'Remote',
      applicants: 19,
      views: 93,
      posted: 'Apr 10, 2025',
      expires: 'May 10, 2025',
      status: 'Active'
    }
  ];

  constructor(private router: Router){}
  navigateToJobPosting() {
    this.router.navigate(['/employer-dashboard/job-posting']);
  }
}
