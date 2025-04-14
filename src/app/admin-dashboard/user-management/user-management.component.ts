import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-management',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent {
  searchTerm: string = '';
  selectedRole: string = 'All';

  users = [
    {
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'Job Seeker',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=1',
      dateJoined: 'Mar 20, 2025',
    },
    {
      name: 'John Smith',
      email: 'john@example.com',
      role: 'Employer',
      status: 'Suspended',
      photo: 'https://i.pravatar.cc/150?img=2',
      dateJoined: 'Feb 10, 2025',
    },
    {
      name: 'Alice Admin',
      email: 'admin@example.com',
      role: 'Admin',
      status: 'Active',
      photo: 'https://i.pravatar.cc/150?img=3',
      dateJoined: 'Jan 5, 2025',
    }
  ];

  filteredUsers() {
    return this.users.filter(user =>
      (this.selectedRole === 'All' || user.role === this.selectedRole) &&
      (user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
       user.email.toLowerCase().includes(this.searchTerm.toLowerCase()))
    );
  }

  toggleStatus(user: any) {
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
  }

  promoteToAdmin(user: any) {
    user.role = 'Admin';
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u !== user);
  }

  addAdmin() {
    alert('Redirect to add admin form or open modal.');
  }

}
