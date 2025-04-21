import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
    private jobService: JobService,
    private route: ActivatedRoute
  ) {
    const nav = this.router.getCurrentNavigation();
    this.job = nav?.extras?.state?.['job'];
  }

  ngOnInit() {
    const jobId = this.route.snapshot.paramMap.get('id');
    if (jobId) {
      this.jobService.getJobById(+jobId).subscribe({
        next: (job) => (this.job = job),
        error: (err) => console.error('Failed to fetch job details:', err),
      });
    }
  }

  applyForJob() {
    this.router.navigate(['/job-seeker-dashboard/job-application'], {
      state: { job: this.job },
    });
  }

  cancel() {
    this.location.back();
  }
}
