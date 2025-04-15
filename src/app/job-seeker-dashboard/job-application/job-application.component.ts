import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import { ApplicationService, JobApplication } from '../../services/application.service';
import { JobService, Job } from '../../services/job.service';



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
    private jobService: JobService
  ) {
    this.generatePortfolioPDF();
    this.loadSelectedJob(); // 👈 grab job on init
  }

  loadSelectedJob() {
    this.jobDetails = this.jobService.getSelectedJob(); // ✅ Fetch from JobService
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

    // Save application to localStorage via ApplicationService
    const newApp: JobApplication = {
      fullName: this.fullName,
      email: this.email,
      skills: ['JavaScript', 'React', 'Node.js'],
      resumeFileName: this.resumeFile?.name || '',
      portfolioExists: !!this.portfolioPDF,
      matchScore: 92,
      location: 'Nairobi, Kenya',
      experience: '3 years',
      jobTitle: this.jobDetails?.title || 'N/A',
      company: this.jobDetails?.company || 'N/A',
      status: 'Pending',

      // ✅ Newly added optional fields
      initials: this.fullName
        .split(' ')
        .map((n) => n[0])
        .join(''),
      date: new Date().toLocaleDateString(),
      type: 'Full-time', 
    };

    this.appService.saveApplication(newApp); // ✅ Save it!

    // Log the form submission details (optional)
    console.log('Application submitted with:', {
      name: this.fullName,
      email: this.email,
      coverLetter: this.coverLetter,
      resume: this.resumeFile?.name,
      portfolio: this.portfolioPDF ? 'portfolio.pdf' : 'none',
    });

    alert('Application submitted successfully!');
    this.router.navigate(['/job-seeker-dashboard/applications']);
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
