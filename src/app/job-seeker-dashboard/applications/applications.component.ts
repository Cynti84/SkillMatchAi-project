import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ApplicationService,
  JobApplication,
} from '../../services/application.service';

@Component({
  selector: 'app-applications',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.scss'],
})
export class ApplicationsComponent {
  activeTab = 'All';
  searchTerm = '';
  sortBy = 'Recent';
  applications: JobApplication[] = [];

  constructor(private appService: ApplicationService) {
    this.loadApplications();
  }

  loadApplications() {
    this.applications = this.appService.getApplications();
  }

  withdraw(index: number) {
    if (confirm('Are you sure you want to withdraw this application?')) {
      this.appService.deleteApplication(index);
      this.loadApplications(); // refresh list after delete
    }
  }
}
