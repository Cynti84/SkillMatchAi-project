import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employer-dashboard',
  imports: [RouterModule, CommonModule],
  standalone: true,
  templateUrl: './employer-dashboard.component.html',
  styleUrl: './employer-dashboard.component.scss',
})
export class EmployerDashboardComponent {
  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}
