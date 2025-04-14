import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-settings',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss'],
})
export class AdminSettingsComponent {
  admin = {
    name: 'Cynthia Njoki',
    email: 'cynti@example.com',
  };

  notifications = {
    email: true,
    system: false,
    reports: true,
  };

  platform = {
    language: 'English',
    maintenanceMode: false,
  };

  deactivateAccount() {
    alert('Account deactived!.');
  }

  resetPlatform() {
    const confirmReset = confirm(
      'Are you sure you want to reset the entire platform? This action cannot be undone.'
    );
    if (confirmReset) {
      alert('Platform has been reset!.');
    }
  }
}
