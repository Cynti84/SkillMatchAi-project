import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApplicationService,
  JobApplication,
} from '../../services/application.service';

@Component({
  selector: 'app-overview',
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  userName = 'John Doe';
  matchScore = 85;
  activeTab = 'All';
  searchTerm = '';
  sortBy = 'Recent';
  applications: JobApplication[] = [];
  
  recommendedJobs = [
    { title: 'Frontend Developer', company: 'TechNova', match: 92 },
    { title: 'UI/UX Designer', company: 'PixelCraft', match: 87 },
    { title: 'Backend Engineer', company: 'CodeWave', match: 80 },
  ];

  constructor(private router: Router, private appService: ApplicationService) {
    this.loadApplications();
  }

  navigateToProfile() {
    this.router.navigate(['/job-seeker-dashboard/profile']);
  }
  loadApplications() {
    this.applications = this.appService.getApplications();
  }

  goToJobDetails(job: any) {
    // You can pass job as navigation extras state
    this.router.navigate(['/job-seeker-dashboard/job-details', job.title], {
      state: { job },
    });
  }
}
