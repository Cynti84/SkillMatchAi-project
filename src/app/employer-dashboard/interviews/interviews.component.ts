import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-interviews',
  imports: [CommonModule, FormsModule],
  templateUrl: './interviews.component.html',
  styleUrls: ['./interviews.component.scss'],
})
export class InterviewsComponent {
  activeTab: 'upcoming' | 'past' = 'upcoming';

  interviews = [
    {
      candidate: 'John Doe',
      initials: 'JD',
      role: 'Frontend Developer',
      date: '2025-04-20',
      time: '10:30 AM',
      type: 'Video Call',
      status: 'Scheduled',
    },
    {
      candidate: 'Ada Smith',
      initials: 'AS',
      role: 'UI/UX Designer',
      date: '2025-04-18',
      time: '02:00 PM',
      type: 'In person',
      status: 'Completed',
    },
    {
      candidate: 'Raj Joshi',
      initials: 'RJ',
      role: 'Backend Engineer',
      date: '2025-04-15',
      time: '11:00 AM',
      type: 'Phone Call',
      status: 'Cancelled',
    },
  ];

  selectedInterview: any = null;
  showRescheduleModal = false;
  rescheduleDate: string = '';
  rescheduleTime: string = '';
  rescheduleType: string = 'Video Call';
  rescheduleNotes: string = '';

  openRescheduleModal(interview: any) {
    this.selectedInterview = interview;
    this.rescheduleDate = interview.date;
    this.rescheduleTime = this.convertTo24hr(interview.time); // if you use AM/PM format
    this.rescheduleType = interview.type;
    this.rescheduleNotes = '';
    this.showRescheduleModal = true;
  }

  closeRescheduleModal() {
    this.showRescheduleModal = false;
    this.selectedInterview = null;
  }

  saveReschedule() {
    // You can update the actual interview in-memory or send to backend here
    this.selectedInterview.date = this.rescheduleDate;
    this.selectedInterview.time = this.convertTo12hr(this.rescheduleTime);
    this.selectedInterview.type = this.rescheduleType;
    this.closeRescheduleModal();
  }

  // Optional helper
  convertTo24hr(time12h: string): string {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  }

  convertTo12hr(time24h: string): string {
    let [hours, minutes] = time24h.split(':').map(Number);
    const modifier = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    return `${hours}:${minutes.toString().padStart(2, '0')} ${modifier}`;
  }

  switchTab(tab: 'upcoming' | 'past') {
    this.activeTab = tab;
  }
}
