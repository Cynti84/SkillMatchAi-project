import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-system-performance',
  imports: [CommonModule, BaseChartDirective],
  standalone: true,
  templateUrl: './system-performance.component.html',
  styleUrls: ['./system-performance.component.scss'],
})
export class SystemPerformanceComponent {
  // Summary metrics (dummy)
  activeUsers = 412;
  apiSuccessRate = 98.6;
  avgResponseTime = '320ms';
  memoryUsage = '1.2 GB';

  // Line Chart (API Response Time)
  responseChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [350, 300, 320, 310, 290, 280, 305],
        label: 'Response Time (ms)',
        fill: true,
        tension: 0.3,
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
      },
    ],
  };

  responseChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: true },
    },
  };

  // Bar Chart (Daily Users)
  userChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [150, 180, 200, 170, 210, 190, 220],
        label: 'Active Users',
        backgroundColor: '#007bff',
      },
    ],
  };

  userChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };
}
