import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

export interface Job {
  id: number;
  title: string;
  description: string;
  company_name: string;
  location: string;
  created_at: string;
  skills?: string[]; // optional for now
  icon?: string
  iconColor?: string;
}

@Injectable({ providedIn: 'root' })
export class JobService {
  private baseUrl = '/api/jobs';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders({
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  // 🔹 POST a new job
  postJob(jobData: any): Observable<any> {
    return this.http.post(this.baseUrl + '/create', jobData, {
      headers: this.authHeaders(),
    });
  }

  // 🔍 Optional: GET jobs by employer
  getMyJobs(): Observable<any> {
    return this.http.get(this.baseUrl + '/my-jobs', {
      headers: this.authHeaders(),
    });
  }

  // 📦 Optional: GET all jobs (for job seekers)
  getAllJobs(): Observable<Job[]> {
    return this.http.get<Job[]>(this.baseUrl);
  }

  getJobById(id: number): Observable<Job> {
    return this.http.get<Job>(`${this.baseUrl}/${id}`);
  }

  private selectedJob: any = null;

  setSelectedJob(job: any) {
    this.selectedJob = job;
  }

  getSelectedJob(): any {
    return this.selectedJob;
  }

  clearSelectedJob() {
    this.selectedJob = null;
  }
}
