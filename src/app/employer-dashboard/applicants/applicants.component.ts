import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-applicants',
  imports: [CommonModule, FormsModule],
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent {
  applicants = [
    {
      initials: 'JD',
      name: 'John Doe',
      role: 'Senior Frontend Developer',
      location: 'Lagos, Nigeria',
      experience: '5 years',
      matchScore: 94,
      resumeAvailable: true,
    },
    {
      initials: 'AS',
      name: 'Ada Smith',
      role: 'Frontend Engineer',
      location: 'Nairobi, Kenya',
      experience: '3 years',
      matchScore: 89,
      resumeAvailable: false,
    },
    {
      initials: 'RJ',
      name: 'Raj Joshi',
      role: 'React Developer',
      location: 'Mumbai, India',
      experience: '4 years',
      matchScore: 82,
      resumeAvailable: true,
    },
  ];

  showModal = false;
  selectedApplicant: any = null;
  interviewType = 'Video Call';
  interviewDate: string = '2025-03-20';
  interviewTime: string = '10:30';
  interviewDuration: string = '30 minutes';
  interviewNotes: string = '';

  openInterviewModal(applicant: any) {
    this.selectedApplicant = applicant;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedApplicant = null;
  }

  setType(type: string) {
    this.interviewType = type;
  }

  sendInvitation() {
    // Logic to send invitation goes here
    console.log(`Interview scheduled with ${this.selectedApplicant?.name}`);
    this.closeModal();
  }
}
