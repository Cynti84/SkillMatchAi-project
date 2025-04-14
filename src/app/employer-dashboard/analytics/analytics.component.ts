import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts'; // ✅ this is the new way in v5+


@Component({
  selector: 'app-analytics',
  imports: [CommonModule, FormsModule, BaseChartDirective],
  standalone: true,
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})  
export class AnalyticsComponent {
  // Sample metrics
  metrics = [
    { icon: '📄', count: 132, label: 'Applications Received' },
    { icon: '📌', count: 14, label: 'Jobs Posted' },
    { icon: '🎙️', count: 12, label: 'Interviews Scheduled' },
    { icon: '📑', count: 3, label: 'Offers Made' },
  ];

  // Filters
  dateRange = 'Last 7 Days';
  selectedJob = 'All Jobs';

  // Placeholder for real charts/data
  insights = [
    'Your job post for Frontend Developer received 60% more applications than average.',
    'Most applications come in on Tuesdays.',
    'Top applicant locations: Nairobi, Mombasa, Kisumu.',
  ];

  jobList = [
    'All Jobs',
    'Frontend Developer',
    'Backend Developer',
    'UI/UX Designer',
  ];

  //chart: applications over time
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [12, 19, 3, 17, 28, 24, 7],
        label: 'Applications',
        fill: true,
        tension: 0.4,
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#3b82f6',
      },
    ],
  };

  lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
      legend: { display: false }
      
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  lineChartType: 'line' = 'line'

  //Chart: Top Job Performers
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Frontend Dev', 'Backend Dev', 'UI/UX Designer', 'Data Analyst'],
    datasets: [
      {
        data: [120, 85, 70, 60],
        label: 'Application',
        backgroundColor: '#3b82f6'
      }
    ]
  }

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      tooltip: { enabled: true },
      legend: {display: false}
    },
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }

  barChartType: 'bar' = 'bar'

  exportReport() {
    // Replace with CSV/PDF export logic
    console.log('Exporting report...');
  }
}
