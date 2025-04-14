import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  constructor(private router: Router) {}

  onSubmit() {
    if (this.role === 'jobSeeker') {
      this.router.navigate(['/signup/job-seeker']);
    } else if (this.role === 'employer') {
      this.router.navigate(['/signup/employer']);
    }
  }
}
