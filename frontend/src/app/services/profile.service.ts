import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private baseUrl = '/api';

  constructor(private http: HttpClient, private auth: AuthService) {}

  private authHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    console.log('📡 Sending token in header:', token);
    return new HttpHeaders({
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    });
  }

  // 🔵 Job Seeker Profile
  createJobSeekerProfile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/job-seeker/create`, formData, {
      headers: this.authHeaders(),
      // Angular automatically sets the right headers for FormData, so:
      reportProgress: true,
    });
  }

  // 🟢 Employer Profile
  createEmployerProfile(formData: FormData): Observable<any> {
    return this.http.post(`${this.baseUrl}/employer/create`, formData, {
      headers: this.authHeaders(),
      reportProgress: true,
    });
  }

  getJobSeekerProfile(): Observable<any> {
    const userId = this.auth.getUser()?.id;
    return this.http.get(`${this.baseUrl}/job-seeker/${userId}`, {
      headers: this.authHeaders(),
    });
  }
}


