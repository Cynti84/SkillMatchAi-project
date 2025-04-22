import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import {
  ApplicationService,
  JobApplication,
} from '../../services/application.service';
import { JobService, Job } from '../../services/job.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-job-application',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.scss'],
})
export class JobApplicationComponent {
  fullName = 'John Doe';
  email = 'john@example.com';
  coverLetter = '';
  resumeFile: File | null = null;
  portfolioPDF: Blob | null = null;

  jobDetails: Job | null = null; // ✅ New property to store job info

  constructor(
    private router: Router,
    private appService: ApplicationService,
    private jobService: JobService,
    private http: HttpClient,
    private auth: AuthService
  ) {
    this.generatePortfolioPDF();
    this.loadSelectedJob(); // 👈 grab job on init
  }

  loadSelectedJob() {
    const nav = this.router.getCurrentNavigation();
    this.jobDetails = nav?.extras?.state?.['job'];

    if (!this.jobDetails || !this.jobDetails.id) {
      alert('Missing job info. Try again😑.');
      this.router.navigate(['/job-seeker-dashboard/overview']);
    }
  }

  onResumeUpload(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.resumeFile = file;
    }
  }

  async generatePortfolioPDF() {
    const entries = localStorage.getItem('portfolioEntries');
    if (!entries) return;

    const parsed = JSON.parse(entries);
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Portfolio Entries', 10, 20);

    let y = 30;
    for (const entry of parsed) {
      doc.setFontSize(12);
      doc.text(`Title: ${entry.title}`, 10, y);
      y += 7;
      doc.text(`Type: ${entry.type}`, 10, y);
      y += 7;
      doc.text(`Role: ${entry.role} at ${entry.company}`, 10, y);
      y += 7;
      doc.text(
        `Duration: ${entry.startDate} - ${
          entry.ongoing ? 'Present' : entry.endDate
        }`,
        10,
        y
      );
      y += 7;
      doc.text(`Description: ${entry.description}`, 10, y);
      y += 7;
      doc.text(`Tech Stack: ${entry.techStack}`, 10, y);
      y += 12;

      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    }

    this.portfolioPDF = doc.output('blob');
  }

  submitApplication() {
    if (!this.resumeFile) {
      alert('Please upload your resume.');
      return;
    }

    if (!this.jobDetails?.id) {
      alert('Missing job info. Try again.');
      return;
    }

    const formData = new FormData();
    formData.append('job_id', this.jobDetails.id.toString());
    formData.append('cover_letter', this.coverLetter);
    formData.append('resume', this.resumeFile);
    if (this.portfolioPDF) {
      formData.append('portfolio', this.portfolioPDF, 'portfolio.pdf');
    }

    const token = this.auth.getToken();
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    this.http
      .post('/api/applications/apply', formData, {
        headers,
      })
      .subscribe({
        next: () => {
          alert('Application submitted successfully!');
          this.router.navigate(['/job-seeker-dashboard/applications']);
        },
        error: (err) => {
          console.error('Application failed:', err);
          alert('Application failed. Please try again.');
        },
      });
  }

  downloadPortfolio() {
    if (this.portfolioPDF) {
      const url = URL.createObjectURL(this.portfolioPDF);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'portfolio.pdf';
      link.click();
      URL.revokeObjectURL(url);
    }
  }

  previewPortfolio() {
    if (this.portfolioPDF) {
      const url = URL.createObjectURL(this.portfolioPDF);
      window.open(url, '_blank');
    }
  }

  cancel() {
    this.router.navigate(['/job-seeker-dashboard/overview']);
  }
}
