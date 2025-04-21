import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Job, JobService } from '../../services/job.service';


@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent {
  searchQuery = '';
  selectedLocation = '';
  selectedJobType = '';
  selectedIndustry = '';

  locationOptions = ['Nairobi', 'Mombasa', 'Kisumu'];
  jobTypeOptions = ['Full-Time', 'Part-Time', 'Remote'];
  industryOptions = ['Technology', 'Finance', 'Healthcare'];

  constructor(private router: Router, private jobService: JobService) {}

  jobs: Job[] = [];

  ngOnInit() {
    this.jobService.getAllJobs().subscribe({
      next: (data) => (this.jobs = data),
      error: (err) => console.error('Failed to load jobs', err),
    });
  }

  get filteredJobs() {
    return this.jobs.filter(
      (job) =>
        (this.searchQuery === '' ||
          job.title.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.selectedLocation === '' ||
          job.company_name.includes(this.selectedLocation)) &&
        (this.selectedJobType === '' ||
          job.title.includes(this.selectedJobType)) &&
        (this.selectedIndustry === '' ||
          job.description.includes(this.selectedIndustry))
    );
  }

  applyFilters() {
    // Filtering logic handled in getter
    console.log('Filters applied');
  }

  goToJobDetails(job: any) {
    // You can pass job as navigation extras state
    this.router.navigate(['/job-seeker-dashboard/job-details', job.title], {
      state: { job },
    });
  }
}
