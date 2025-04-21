import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService, UserProfile } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user!: UserProfile;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.user = this.userService.user;
  }

  navigateToEditProfile() {
    this.router.navigate(['/job-seeker-dashboard/edit-profile']);
  }

  navigateToBuildPortfolio() {
    this.router.navigate(['/job-seeker-dashboard/portfolio']);
  }

  showResumeModal = false;
  selectedFileName: string = '';

  openResumeEditor() {
    this.selectedFileName = this.user.resume;
    this.showResumeModal = true;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;

        // Save to localStorage
        localStorage.setItem(
          'userCV',
          JSON.stringify({
            name: file.name,
            content: base64,
          })
        );

        // Update in service
        this.userService.updateUser({
          resume: file.name,
          cvFile: file,
        });

        this.selectedFileName = file.name;
        this.showResumeModal = false;
      };
      reader.readAsDataURL(file); // converts to base64
    }
  }

  deleteResume() {
    // Clear from localStorage
    localStorage.removeItem('userCV');

    // Clear from UserService
    this.userService.updateUser({
      resume: 'No Resume Uploaded',
      cvFile: null,
    });
  }

  cancelResumeUpdate() {
    this.showResumeModal = false;
  }
}
