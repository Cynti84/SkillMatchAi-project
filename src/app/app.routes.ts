import { Routes } from '@angular/router';
//authentication components
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { JobSeekerSignupComponent } from './job-seeker-signup/job-seeker-signup.component';
import { EmployerSignupComponent } from './employer-signup/employer-signup.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { SignupStartComponent } from './signup-start/signup-start.component';
//job seeker components
import { JobSeekerDashboardComponent } from './job-seeker-dashboard/job-seeker-dashboard.component';
import { OverviewComponent } from './job-seeker-dashboard/overview/overview.component';
import { JobsComponent } from './job-seeker-dashboard/jobs/jobs.component';
import { ApplicationsComponent } from './job-seeker-dashboard/applications/applications.component';
import { ProfileComponent } from './job-seeker-dashboard/profile/profile.component';
import { NotificationsComponent } from './job-seeker-dashboard/notifications/notifications.component';
import { SettingsComponent } from './job-seeker-dashboard/settings/settings.component';
//employer components
import { EmployerDashboardComponent } from './employer-dashboard/employer-dashboard.component';
import { HomeComponent } from './employer-dashboard/home/home.component';
import { JobListingsComponent } from './employer-dashboard/job-listings/job-listings.component';
import { Ai_assistantComponent } from './employer-dashboard/ai-assistant/ai-assistant.component';
import { InterviewsComponent } from './employer-dashboard/interviews/interviews.component';
import { AnalyticsComponent } from './employer-dashboard/analytics/analytics.component';
import { ApplicantsComponent } from './employer-dashboard/applicants/applicants.component';
import { EmployerSettingsComponent } from './employer-dashboard/employer-settings/employer-settings.component';
//admin components
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserManagementComponent } from './admin-dashboard/user-management/user-management.component';
import { securityComponent } from './admin-dashboard/security/security.component';
import { AdminSettingsComponent } from './admin-dashboard/admin-settings/admin-settings.component';
import { AdminOverviewComponent } from './admin-dashboard/admin-overview/admin-overview.component';
import { AiAccuracyComponent } from './admin-dashboard/ai-accuracy/ai-accuracy.component';
import { SystemPerformanceComponent } from './admin-dashboard/system-performace/system-performance.component';
import { ReportsAndLogsComponent } from './admin-dashboard/reports-and-logs/reports-and-logs.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
    children: [
      { path: '', component: SignupStartComponent }, // <-- common signup
      { path: 'job-seeker', component: JobSeekerSignupComponent },
      { path: 'employer', component: EmployerSignupComponent },
    ],
  },
  {
    path: 'job-seeker-dashboard',
    component: JobSeekerDashboardComponent,
    children: [
      { path: '', redirectTo: 'overview', pathMatch: 'full' },
      { path: 'overview', component: OverviewComponent },
      { path: 'jobs', component: JobsComponent },
      { path: 'applications', component: ApplicationsComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'notifications', component: NotificationsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  {
    path: 'employer-dashboard',
    component: EmployerDashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'job-listings', component: JobListingsComponent },
      { path: 'applicants', component: ApplicantsComponent },
      { path: 'ai-assistant', component: Ai_assistantComponent },
      { path: 'interviews', component: InterviewsComponent },
      { path: 'analytics', component: AnalyticsComponent },
      { path: 'settings', component: SettingsComponent },
    ],
  },
  {
    path: 'admin-dashboard',
    component: AdminDashboardComponent,
    children: [
      { path: '', redirectTo: 'admin-overview', pathMatch: 'full' },
      { path: 'admin-overview', component: AdminOverviewComponent },
      { path: 'user-management', component: UserManagementComponent },
      { path: 'security', component: securityComponent },
      { path: 'admin-settings', component: AdminSettingsComponent },
      { path: 'ai-accuracy', component: AiAccuracyComponent },
      { path: 'system-performance', component: SystemPerformanceComponent },
      { path: 'reports-and-logs', component: ReportsAndLogsComponent },
    ],
  },
  {
    path: 'job-seeker-dashboard/job-details/:id',
    loadComponent: () =>
      import('./job-seeker-dashboard/job-details/job-details.component').then(
        (m) => m.JobDetailsComponent
      ),
  },
]; 
