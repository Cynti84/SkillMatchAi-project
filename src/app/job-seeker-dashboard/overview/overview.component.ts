import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  userName = 'John Doe';
  matchScore = 85;
  recommendedJobs = [
    { title: 'Frontend Developer', company: 'TechNova', match: 92 },
    { title: 'UI/UX Designer', company: 'PixelCraft', match: 87 },
    { title: 'Backend Engineer', company: 'CodeWave', match: 80 },
  ];
  applications = [
    {
      title: 'Data Analyst',
      company: 'InsightCorp',
      date: '2025-04-05',
      status: 'Pending',
    },
    {
      title: 'Software Engineer',
      company: 'DevSoft',
      date: '2025-04-01',
      status: 'Interview Scheduled',
    },
    {
      title: 'QA Tester',
      company: 'BugHunt',
      date: '2025-03-30',
      status: 'Rejected',
    },
  ];
  constructor(private router: Router) {}

  navigateToProfile() {
    this.router.navigate(['/job-seeker-dashboard/profile']);
  }

  goToJobDetails(job: any) {
    // You can pass job as navigation extras state
    this.router.navigate(['/job-seeker-dashboard/job-details', job.title], {
      state: { job },
    });
  }
}
