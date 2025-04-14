import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-seeker-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.scss',
})
export class NotificationsComponent {
  notifications = [
    {
      type: 'invitation',
      iconColor: 'lightgreen',
      icon: '🏢',
      heading: 'Interview Invitation: Frontend Developer at TechCorp',
      description:
        'Your interview is scheduled for April 15, 2025 at 10:00 AM PT via Zoom. The link will be shared closer to the date.',
      actions: ['Accept', 'Reschedule', 'Decline'],
      timestamp: '10 minutes ago',
    },
    {
      type: 'confirmed',
      iconColor: '#cce5ff',
      icon: '✅',
      heading: 'Interview Confirmed: UX Designer at DesignHub',
      description:
        'Your interview is confirmed for April 17, 2025 at 2:30 PM PT on Microsoft Teams. Please prepare your portfolio.',
      actions: ['Add to Calendar', 'View Details'],
      timestamp: '2 hours ago',
    },
    {
      type: 'rescheduled',
      iconColor: '#ffe4b3',
      icon: '🔁',
      heading: 'Interview Rescheduled: Backend Developer at DataSystems',
      description:
        'New interview date is April 19, 2025 at 11:00 AM PT (on-site). The previous time was April 18.',
      actions: ['Confirm Change', 'Request Another Time'],
      timestamp: 'Yesterday',
    },
  ];
}
