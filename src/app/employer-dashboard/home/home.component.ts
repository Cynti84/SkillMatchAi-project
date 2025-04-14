import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-home',
    imports: [CommonModule],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent { 
    companyName = 'Cynthia Tech';

  stats = [
    { label: 'Active Listings', value: 5 },
    { label: 'Applicants', value: 132 },
    { label: 'Interviews Scheduled', value: 12 },
    { label: 'Hires Made', value: 3 },
  ];

  recentActivities = [
    { message: 'New application for “Frontend Developer”', time: '5 mins ago' },
    { message: 'Interview scheduled for “UI/UX Designer”', time: '1 hour ago' },
    { message: 'Job listing “Data Analyst” closed', time: 'Yesterday' },
  ];
}
