import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reports-and-logs',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './reports-and-logs.component.html',
  styleUrls: ['./reports-and-logs.component.scss'],
})
export class ReportsAndLogsComponent {
  startDate = '';
  endDate = '';
  selectedType = '';
  searchKeyword = '';

  logs = [
    {
      timestamp: '2025-04-10 14:32',
      user: 'admin@example.com',
      action: 'Suspended a user',
      status: 'Success',
      ip: '192.168.0.5',
      details: 'User ID 452 was suspended due to suspicious activity.',
      showDetails: false,
    },
    {
      timestamp: '2025-04-09 09:20',
      user: 'system',
      action: 'Server error: 500',
      status: 'Failed',
      ip: '127.0.0.1',
      details: 'Database connection timeout during job match.',
      showDetails: false,
    },
    {
      timestamp: '2025-04-08 16:10',
      user: 'moderator@example.com',
      action: 'Reset password for user',
      status: 'Success',
      ip: '192.168.0.12',
      details: 'Reset password for user ID 142.',
      showDetails: false,
    },
  ];

  get filteredLogs() {
    return this.logs.filter((log) => {
      const matchesType =
        !this.selectedType ||
        (this.selectedType === 'user' && log.user !== 'system') ||
        (this.selectedType === 'system' && log.user === 'system') ||
        (this.selectedType === 'login' &&
          log.action.toLowerCase().includes('login'));

      const matchesKeyword = this.searchKeyword
        ? Object.values(log).some((value) =>
            String(value)
              .toLowerCase()
              .includes(this.searchKeyword.toLowerCase())
          )
        : true;

      return matchesType && matchesKeyword;
    });
  }

  toggleDetails(log: any) {
    log.showDetails = !log.showDetails;
  }

  applyFilters() {
    // this is handled reactively in getter
  }

  exportLogs() {
    alert('📁 Logs exported as CSV!');
  }
}
