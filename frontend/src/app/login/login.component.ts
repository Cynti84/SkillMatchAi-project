import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private auth: AuthService) {}

  onSubmit() {
    this.auth.login({ email: this.email, password: this.password }).subscribe({
      next: (res: any) => {
        this.auth.saveAuth(res);
        const role = res.user.role;

        if (role === 'job_seeker') {
          this.router.navigate(['/job-seeker-dashboard']);
        } else if (role === 'employer') {
          this.router.navigate(['/employer-dashboard']);
        } else {
          console.log("working on admin login")
          this.router.navigate(['/admin-dashboard']);
        }
      },
      error: (err) => {
        const errorMessage =
          err.error?.error ||
          err.error?.message ||
          'Login failed. Check credentials.';

        // 🔒 If the user hasn't completed profile
        if (
          err.status === 403 &&
          errorMessage.includes('Profile not completed')
        ) {
          alert("Sorry. You have not set up your profile.")
        } else {
          console.error('Login failed:', err);
          alert(errorMessage);
        }
      },
    });
  }
}
