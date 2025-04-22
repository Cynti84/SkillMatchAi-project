import { Injectable } from '@angular/core';

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private selectedJob: Job | null = null;

  setSelectedJob(job: Job) {
    this.selectedJob = job;
  }

  getSelectedJob(): Job | null {
    return this.selectedJob;
  }

  clearSelectedJob() {
    this.selectedJob = null;
  }
}
