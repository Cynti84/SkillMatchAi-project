import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-jobs',
  imports: [CommonModule, FormsModule],
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

  jobs = [
    {
      title: 'Frontend Developer',
      company: 'TechCorp',
      description: 'Build and maintain modern UI components.',
      icon: 'fas fa-laptop-code',
      iconColor: '#D1E8FF',
      timestamp: '7 days ago',
    },
    {
      title: 'Accountant',
      company: 'FinServe',
      description: 'Manage company accounts and transactions.',
      icon: 'fas fa-coins',
      iconColor: '#FFF0D1',
      timestamp: '3 days ago',
    },
    // Add more mock jobs here
  ];

  get filteredJobs() {
    return this.jobs.filter(
      (job) =>
        (this.searchQuery === '' ||
          job.title.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
        (this.selectedLocation === '' ||
          job.company.includes(this.selectedLocation)) &&
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
}
