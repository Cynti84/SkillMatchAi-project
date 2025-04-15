import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApplicationService, JobApplication } from '../../services/application.service';


@Component({
  selector: 'app-applicants',
  imports: [CommonModule, FormsModule],
  templateUrl: './applicants.component.html',
  styleUrls: ['./applicants.component.scss'],
})
export class ApplicantsComponent {
  applicants: JobApplication[] = [];

  constructor(private appService: ApplicationService) {
    const allApps = this.appService.getApplications();
    this.applicants = allApps.filter((app) => app.fullName && app.jobTitle);
  }

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
    console.log(`Interview scheduled with ${this.selectedApplicant?.fullName}`);
    this.closeModal();
  }
}
