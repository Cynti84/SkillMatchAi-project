import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { JobService } from '../../services/job.service';


@Component({
  selector: 'app-job-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  job: any;

  constructor(
    private router: Router,
    private location: Location,
    private jobService: JobService
  ) {
    const nav = this.router.getCurrentNavigation();
    this.job = nav?.extras?.state?.['job'];
  }

  applyForJob() {
    this.jobService.setSelectedJob(this.job); // ✅ Save selected job
    this.router.navigate(['/job-seeker-dashboard/job-application']); // ✅ Then navigate
  }

  cancel() {
    this.location.back();
  }
}
