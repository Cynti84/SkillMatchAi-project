import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-security',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss'],
})
export class securityComponent {
  securityEvents = [
    {
      icon: '🔐',
      description: 'Admin login successful',
      timestamp: 'April 13, 2025 - 10:32 AM',
      user: 'admin@skillmatch.ai',
      ip: '192.168.1.10',
    },
    {
      icon: '⚠️',
      description: 'Failed login attempt',
      timestamp: 'April 13, 2025 - 9:10 AM',
      user: 'unknown',
      ip: '192.168.1.22',
    },
    {
      icon: '✅',
      description: 'Password changed',
      timestamp: 'April 12, 2025 - 6:45 PM',
      user: 'cynthia@startup.com',
      ip: '192.168.1.15',
    },
  ];

  settings = {
    enable2FA: true,
    emailAlerts: false,
    sessionTimeout: 30,
  };

  timeoutOptions = [15, 30, 45, 60];
}
