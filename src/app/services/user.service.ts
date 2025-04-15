import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface UserProfile {
  fullName: string;
  email: string;
  location: string;
  skills: string[];
  resume: string; // filename
  cvFile: File | null; // actual file object (optional, not restorable from localStorage)
  avatar: string;
  appliedJobs: { title: string; company: string; status: string }[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // Step 1: Try to get resume from localStorage
  private getResumeFromStorage(): { resume: string; cvFile: File | null } {
    const savedCV = localStorage.getItem('userCV');
    if (savedCV) {
      try {
        const parsed = JSON.parse(savedCV);
        return {
          resume: parsed.name || 'No Resume Uploaded',
          cvFile: null, // File can't be restored from localStorage
        };
      } catch (e) {
        console.error('Failed to parse stored CV:', e);
      }
    }
    return {
      resume: 'No Resume Uploaded',
      cvFile: null,
    };
  }

  // Step 2: Use resume from localStorage in default profile
  private readonly resumeData = this.getResumeFromStorage();

  private userSubject = new BehaviorSubject<UserProfile>({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    location: 'Nairobi, Kenya',
    skills: ['JavaScript', 'React', 'Node.js'],
    resume: this.resumeData.resume,
    cvFile: this.resumeData.cvFile,
    avatar: 'hero.webp',
    appliedJobs: [
      { title: 'Project Manager', company: 'Safaricom Ltd', status: 'Pending' },
      {
        title: 'Web Designer',
        company: 'Platinum Services',
        status: 'Rejected',
      },
    ],
  });

  user$ = this.userSubject.asObservable();

  get user(): UserProfile {
    return this.userSubject.getValue();
  }

  updateUser(data: Partial<UserProfile>) {
    this.userSubject.next({ ...this.user, ...data });
  }

  constructor() {}
}
