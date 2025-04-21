import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  ApplicationService,
  JobApplication,
} from '../../services/application.service';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent {
  userName = '';
  matchScore = 0;
  profilePhoto = '';
  activeTab = 'All';
  searchTerm = '';
  sortBy = 'Recent';
  applications: JobApplication[] = [];

  recommendedJobs = [
    { title: 'Frontend Developer', company: 'TechNova', match: 92 },
    { title: 'UI/UX Designer', company: 'PixelCraft', match: 87 },
    { title: 'Backend Engineer', company: 'CodeWave', match: 80 },
  ];

  constructor(
    private router: Router,
    private appService: ApplicationService,
    private auth: AuthService,
    private http: HttpClient,
    private profileService: ProfileService
  ) {}

  ngOnInit() {
    this.loadApplications();
    this.loadUserProfile();
  }

  loadApplications() {
    this.applications = this.appService.getApplications();
  }

  loadUserProfile() {
    this.profileService.getJobSeekerProfile().subscribe({
      next: (res) => {
        const profile = res.profile;
        this.userName = this.auth.getUser()?.full_name || 'Guest';
        this.profilePhoto = profile.profile_photo_url || 'user (1).png';
        this.matchScore = this.calculateMatchScore(
          profile.skills,
          profile.desired_roles
        );
      },
      error: (err) => {
        console.error('Failed to fetch profile:', err);
      },
    });
  }

  calculateMatchScore(skills: string[], desiredRoles: string): number {
    if (!skills?.length) return 0;
    const baseScore = Math.min(skills.length * 10, 100);
    return desiredRoles ? baseScore + 5 : baseScore;
  }

  navigateToProfile() {
    this.router.navigate(['/job-seeker-dashboard/profile']);
  }

  goToJobDetails(job: any) {
    this.router.navigate(['/job-seeker-dashboard/job-details', job.title], {
      state: { job },
    });
  }
}
