import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
})
export class PortfolioComponent {
  showModal = false;
  isEditing = false;
  editIndex: number | null = null;

  portfolioEntries: any[] = [];

  newEntry = {
    title: '',
    type: 'Project',
    role: '',
    company: '',
    startDate: '',
    endDate: '',
    ongoing: false,
    description: '',
    techStack: '',
  };

  constructor(private router: Router, private location: Location) {
    this.loadFromStorage(); // ✅ Load entries when component is created
  }

  openModal(index?: number) {
    if (index !== undefined) {
      this.newEntry = { ...this.portfolioEntries[index] };
      this.isEditing = true;
      this.editIndex = index;
    } else {
      this.resetForm();
    }
    this.showModal = true;
  }

  saveEntry() {
    if (this.isEditing && this.editIndex !== null) {
      this.portfolioEntries[this.editIndex] = { ...this.newEntry };
    } else {
      this.portfolioEntries.push({ ...this.newEntry });
    }

    this.saveToStorage(); // ✅ Save changes
    this.resetForm();
    this.showModal = false;
  }

  deleteEntry(index: number) {
    this.portfolioEntries.splice(index, 1);
    this.saveToStorage(); // ✅ Save after delete
  }

  resetForm() {
    this.newEntry = {
      title: '',
      type: 'Project',
      role: '',
      company: '',
      startDate: '',
      endDate: '',
      ongoing: false,
      description: '',
      techStack: '',
    };
    this.isEditing = false;
    this.editIndex = null;
  }

  cancel() {
    this.resetForm();
    this.showModal = false;
  }

  // ✅ Save to localStorage
  saveToStorage() {
    localStorage.setItem(
      'portfolioEntries',
      JSON.stringify(this.portfolioEntries)
    );
  }

  // ✅ Load from localStorage
  loadFromStorage() {
    const stored = localStorage.getItem('portfolioEntries');
    if (stored) {
      this.portfolioEntries = JSON.parse(stored);
    }
  }

  back() {
    this.location.back();
  }
}
