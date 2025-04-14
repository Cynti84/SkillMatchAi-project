import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-applications',
    imports: [CommonModule, FormsModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  activeTab = 'All';
  searchTerm = '';
  sortBy = 'Recent';

  applications = [
    {
      title: 'Frontend Developer',
      company: 'Google',
      location: 'California, USA',
      date: 'March 25, 2025',
      type: 'Full-time',
      status: 'Pending',
    },
    {
      title: 'Backend Developer',
      company: 'Microsoft',
      location: 'Remote',
      date: 'March 20, 2025',
      type: 'Part-time',
      status: 'Interview',
    },
    {
      title: 'UI/UX Designer',
      company: 'Apple',
      location: 'Cupertino, CA',
      date: 'March 18, 2025',
      type: 'Internship',
      status: 'Accepted',
    },
    {
      title: 'DevOps Engineer',
      company: 'Netflix',
      location: 'Los Angeles, CA',
      date: 'March 15, 2025',
      type: 'Contract',
      status: 'Rejected',
    },
  ];
}
