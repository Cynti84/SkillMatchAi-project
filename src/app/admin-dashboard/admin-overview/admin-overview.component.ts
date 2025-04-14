import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-overview',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './admin-overview.component.html',
  styleUrls: ['./admin-overview.component.scss'],
})
export class AdminOverviewComponent {
  totalUsers = 4523;
  jobPostings = 1789;
  activeEmployers = 342;
  flaggedAccounts = 3;

  recentActivities = [
    {
      activity: 'New employer registered: FutureTech Ltd',
      time: '5 minutes ago',
    },
    {
      activity: 'User "janedoe" flagged for suspicious behaviour',
      time: '15 minutes ago',
    },
    {
      activity: 'Job listing updated by GreenWorks Inc.',
      time: '30 minutes ago',
    },
    { activity: 'User "marksmith" deleted their account', time: '1 hour ago' },
  ];
}
