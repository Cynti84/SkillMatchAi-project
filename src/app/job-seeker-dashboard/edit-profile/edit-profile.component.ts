import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent {
  fullName = '';
  email = '';
  location = '';
  skills = '';
  avatar = '';

  constructor(private userService: UserService, private router: Router) {
    const user = this.userService.user;
    this.fullName = user.fullName;
    this.email = user.email;
    this.location = user.location;
    this.skills = user.skills.join(', ');
    this.avatar = user.avatar;
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.avatar = URL.createObjectURL(file); // for now (visual only)
    }
  }

  save() {
    this.userService.updateUser({
      fullName: this.fullName,
      email: this.email,
      location: this.location,
      skills: this.skills.split(',').map((skill) => skill.trim()),
      avatar: this.avatar,
    });
    this.router.navigate(['/job-seeker-dashboard/profile']);
  }

  cancel() {
    this.router.navigate(['/job-seeker-dashboard/profile']);
  }
}
