import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup-start',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './signup-start.component.html',
  styleUrl: './signup-start.component.scss',
})
export class SignupStartComponent {
  role: string = '';
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit() {
    const userData = {
      full_name: this.name,
      email: this.email,
      password: this.password,
      role: this.role === 'jobSeeker' ? 'job_seeker' : 'employer',
    };

    // Step 1: Register the user and get token + user back
    this.auth.signup(userData).subscribe({
      next: (res: any) => {
        this.auth.saveAuth(res); // Save token and user

        // Step 2: Redirect to the profile setup
        const userRole = res.user.role;
        if (userRole === 'job_seeker') {
          this.router.navigate(['/signup/job-seeker']);
        } else {
          this.router.navigate(['/signup/employer']);
        }
      },
      error: (err) => {
        console.error('Signup failed:', err);
        alert('Signup failed. Please try again.');
      },
    });
  }
}
