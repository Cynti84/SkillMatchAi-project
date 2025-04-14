import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-profile',
    imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    skills: ['JavaScript', 'React', 'Node.js'],
    resume: 'resume_john_doe.pdf',
    profilePhoto: 'hero.webp', // Replace with actual photo logic
    appliedJobs: [
      { title: 'Project Manager', company: 'Safaricom Ltd', status: 'Pending' },
      {
        title: 'Web Designer',
        company: 'Platinum Services',
        status: 'Rejected',
      },
    ],
  };
}
