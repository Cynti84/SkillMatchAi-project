import { Injectable } from '@angular/core';

export interface JobApplication {
  title: string;
  company: string;
  location: string;
  date: string;
  type: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private applicationsKey = 'jobApplications';

  getApplications(): JobApplication[] {
    const stored = localStorage.getItem(this.applicationsKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveApplication(app: JobApplication) {
    const apps = this.getApplications();
    apps.push(app);
    localStorage.setItem(this.applicationsKey, JSON.stringify(apps));
  }

  deleteApplication(index: number) {
    const apps = this.getApplications();
    apps.splice(index, 1); // remove by index
    localStorage.setItem(this.applicationsKey, JSON.stringify(apps));
  }
}
