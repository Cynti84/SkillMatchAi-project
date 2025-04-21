import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = '/api/users';
  private tokenKey = 'skillmatch_token';
  private userKey = 'skillmatch_user';

  constructor(private http: HttpClient, private router: Router) {}

  // 🔐 Signup API call
  signup(data: {
    full_name: string;
    email: string;
    password: string;
    role: string;
  }) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  // 🔐 Login API call
  login(data: { email: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  // ✅ Save token & user after login
  saveAuth(response: any) {
    const { token, user } = response;
    localStorage.setItem(this.tokenKey, token);
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  // ❌ Logout user
  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
    this.router.navigate(['/login']);
  }

  // 🧠 Retrieve token
  getToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    console.log('📦 Retrieved token from storage:', token);
    return token;
  }

  // 🧠 Retrieve user info
  getUser(): any {
    const user = localStorage.getItem(this.userKey);
    try {
      return user ? JSON.parse(user) : null;
    } catch {
      this.logout(); // auto-logout on parse error
      return null;
    }
  }

  // 🔒 Check auth status
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
