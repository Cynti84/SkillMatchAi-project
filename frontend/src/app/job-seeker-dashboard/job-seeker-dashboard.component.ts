import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-job-seeker-dashboard',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './job-seeker-dashboard.component.html',
  styleUrl: './job-seeker-dashboard.component.scss',
})
export class JobSeekerDashboardComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
} 
