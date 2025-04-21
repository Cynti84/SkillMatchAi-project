import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-posting',
  imports: [CommonModule, FormsModule],
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.scss'],
})
export class JobPostingComponent {
  job = {
    title: '',
    description: '',
    company: '',
    location: '',
    skills: [] as string[],
  };

  newSkill: string = '';

  constructor(private router: Router, private jobService: JobService) {}

  addSkill(event: Event) {
    const keyboardEvent = event as KeyboardEvent;

    if (keyboardEvent.key === 'Enter' && this.newSkill.trim()) {
      if (!this.job.skills.includes(this.newSkill.trim())) {
        this.job.skills.push(this.newSkill.trim());
      }
      this.newSkill = '';
      keyboardEvent.preventDefault();
    }
  }

  removeSkill(index: number) {
    this.job.skills.splice(index, 1);
  }

  postJob(): void {
    
    this.jobService.postJob(this.job).subscribe({
      next: (res) => {
        console.log('Job posted successfully:', res);
        alert('Job posted successfully!');
        this.router.navigate(['/employer-dashboard']);
      },
      error: (err) => {
        console.error('Failed to post job:', err);
        alert('Failed to post job.');
      },
    });
  }

  cancel() {
    this.router.navigate(['/employer-dashboard/home']);
  }
}
