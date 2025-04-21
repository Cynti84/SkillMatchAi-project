import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-settings',
    imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  emailNotifications = true;
  profileVisibility = 'public';
  darkMode = false;

  onSaveSettings() {
    console.log('Settings saved!');
  }

  onDeleteAccount() {
    console.log('Account deletion initiated');
  }
}
