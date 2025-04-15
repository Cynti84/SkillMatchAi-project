import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-job-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './job-details.component.html',
  styleUrl: './job-details.component.scss',
})
export class JobDetailsComponent {
  job: any;

  constructor(private router: Router, private location: Location) {
    const nav = this.router.getCurrentNavigation();
    this.job = nav?.extras?.state?.['job'];
  }

  applyForJob() {
    alert(`You've applied to ${this.job?.title} at ${this.job?.company}`);
    // Later: add to application history
    this.location.back();
  }

  cancel() {
    this.location.back();
  }
}
